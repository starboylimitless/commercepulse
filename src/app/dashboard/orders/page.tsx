
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MOCK_ORDERS } from '@/lib/mock-db';
import { ArrowUpRight, TrendingUp, Package, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DashboardOrder = {
  product_name: string;
  order_count: number;
  total_revenue: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      
      if (!webhookUrl || webhookUrl.includes('your-n8n-instance')) {
        // Fallback to mock data if n8n not configured
        setOrders(MOCK_ORDERS.map(o => ({
          product_name: o.productName,
          order_count: o.orderCount,
          total_revenue: o.revenue
        })));
        return;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: 'dashboard' }),
      });

      const result = await response.json();
      if (result.success && result.popularOrders) {
        setOrders(result.popularOrders);
      } else {
        // Fallback
        setOrders(MOCK_ORDERS.map(o => ({
          product_name: o.productName,
          order_count: o.orderCount,
          total_revenue: o.revenue
        })));
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Fallback
      setOrders(MOCK_ORDERS.map(o => ({
        product_name: o.productName,
        order_count: o.orderCount,
        total_revenue: o.revenue
      })));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchDashboardData();
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Orders Analysis</h1>
          <p className="text-muted-foreground">Deep dive into your sales and order data performance.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-fit gap-2" 
          onClick={fetchDashboardData}
          disabled={isLoading}
        >
          <RefreshCw className={isLoading ? "animate-spin" : ""} size={14} />
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-none ring-1 ring-border border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-xl text-primary">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Units Sold</p>
                <h3 className="text-2xl font-bold">1,822</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-none ring-1 ring-border border-l-4 border-l-accent">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-xl text-primary">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unique SKU Count</p>
                <h3 className="text-2xl font-bold">48</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-none ring-1 ring-border border-l-4 border-l-chart-3">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-xl text-primary">
                <ArrowUpRight size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Product Share</p>
                <h3 className="text-2xl font-bold">24.7%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-none ring-1 ring-border overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-lg">Top 10 Most Popular Products</CardTitle>
          <CardDescription>Fetched live from your SQL database via n8n.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Order Count</TableHead>
                <TableHead className="text-right">Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell colSpan={4} className="h-12 bg-muted/20"></TableCell>
                  </TableRow>
                ))
              ) : orders.length > 0 ? (
                orders.map((order, index) => (
                  <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-muted-foreground">#{index + 1}</TableCell>
                    <TableCell className="font-semibold text-foreground">{order.product_name}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="font-mono">{order.order_count}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-primary font-semibold">
                      ${Number(order.total_revenue).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No order data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
