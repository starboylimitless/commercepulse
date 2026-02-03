"use client"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommercePulseLogo } from "@/components/logo";
import { ArrowRight, BarChart3, Brain, Zap, ShieldCheck, TrendingUp, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', orders: 400 },
  { name: 'Feb', orders: 300 },
  { name: 'Mar', orders: 550 },
  { name: 'Apr', orders: 900 },
  { name: 'May', orders: 1400 },
  { name: 'Jun', orders: 1200 },
  { name: 'Jul', orders: 1850 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <CommercePulseLogo />
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-medium">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold text-primary bg-primary/10 mb-4"
              >
                <Zap size={16} className="mr-2" />
                <span>New: AI-Powered Predictive Analytics</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
              >
                Supercharge Your <br />
                <span className="text-primary">E-Commerce Growth</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                CommercePulse brings enterprise-grade analytics, inventory forecasts, and customer behavior insights to modern brands.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-12 px-8 text-lg rounded-full">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full h-12 px-8 text-lg rounded-full">
                    View Live Demo
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need to scale</h2>
              <p className="text-muted-foreground">Stop guessing. Start growing. Our platform gives you the visibility you need to make data-driven decisions.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={BarChart3}
                title="Real-time Analytics"
                description="Live dashboards showing sales, traffic, and conversion rates across all your channels."
              />
              <FeatureCard
                icon={Brain}
                title="AI Predictions"
                description="Machine learning models that forecast demand trends to optimize your inventory levels."
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Secure & Reliable"
                description="Enterprise-grade security ensuring your business data and customer information stays protected."
              />
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl border bg-card p-4 shadow-2xl max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8 px-4 pt-2">
                <div>
                  <h3 className="text-2xl font-bold">Total Orders</h3>
                  <p className="text-muted-foreground">Monthly order revenue overview</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-500 font-medium bg-green-500/10 px-3 py-1 rounded-full">
                  <TrendingUp size={16} />
                  <span>+18.2% vs last month</span>
                </div>
              </div>

              <div className="h-[400px] w-full bg-secondary/20 rounded-xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderRadius: '12px',
                        border: '1px solid hsl(var(--border))',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                      cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="hsl(var(--primary))"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorOrders)"
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <CommercePulseLogo size={24} />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CommercePulse Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary">Privacy</Link>
              <Link href="#" className="hover:text-primary">Terms</Link>
              <Link href="#" className="hover:text-primary">Twitter</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
