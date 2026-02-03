
"use client"
import { onAuthStateChanged } from "firebase/auth"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/AuthGuard"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  ShoppingCart
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 13 },
  { name: 'Wed', revenue: 2000, orders: 98 },
  { name: 'Thu', revenue: 2780, orders: 39 },
  { name: 'Fri', revenue: 1890, orders: 48 },
  { name: 'Sat', revenue: 2390, orders: 38 },
  { name: 'Sun', revenue: 3490, orders: 43 },
];




const categoryData = [
  { name: 'Electronics', value: 4500, fill: 'hsl(var(--primary))' },
  { name: 'Clothing', value: 3200, fill: 'hsl(var(--accent))' },
  { name: 'Home', value: 2100, fill: 'hsl(var(--chart-3))' },
  { name: 'Beauty', value: 1800, fill: 'hsl(var(--chart-4))' },
];

export default function DashboardPage() {
  const router = useRouter()

  const [isMounted, setIsMounted] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)

    const unsub = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email ?? null)
    })

    return () => unsub()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }


  if (!isMounted) {
    return (
      <div className="space-y-8 p-8">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your store performance and sales metrics in real-time.</p>
        <p className="text-sm text-muted-foreground">
            Logged in as <span className="font-medium">{userEmail}</span>
        </p>
      </div>
        <button onClick={handleLogout}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Logout
        </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value="$128,430" 
          change="+12.5%" 
          positive={true} 
          icon={<DollarSign className="text-primary" size={20} />} 
        />
        <StatsCard 
          title="Active Users" 
          value="2,450" 
          change="+18%" 
          positive={true} 
          icon={<Users className="text-primary" size={20} />} 
        />
        <StatsCard 
          title="Total Orders" 
          value="1,204" 
          change="-4.2%" 
          positive={false} 
          icon={<ShoppingCart className="text-primary" size={20} />} 
        />
        <StatsCard 
          title="Conversion Rate" 
          value="3.2%" 
          change="+2.4%" 
          positive={true} 
          icon={<TrendingUp className="text-primary" size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border-none ring-1 ring-border">
          <CardHeader>
            <CardTitle>Revenue Performance</CardTitle>
            <CardDescription>Daily revenue trends for the current week</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none ring-1 ring-border">
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Revenue distribution by product type</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--muted))" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} width={80} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
    </AuthGuard>
  );
}

function StatsCard({ title, value, change, positive, icon }: { 
  title: string, value: string, change: string, positive: boolean, icon: React.ReactNode 
}) {
  return (
    <Card className="shadow-sm border-none ring-1 ring-border hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
            {icon}
          </div>
          <div className={cn(
            "flex items-center text-xs font-semibold px-2.5 py-1 rounded-full",
            positive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          )}>
            {positive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
            {change}
          </div>
        </div>
        <div className="space-y-1">

          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
