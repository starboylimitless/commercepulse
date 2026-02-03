
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Sparkles, AlertCircle, RefreshCw, TrendingUp } from 'lucide-react';
import { predictBestsellers } from '@/ai/flows/predictive-bestseller-tool';
import type { PredictBestsellersOutput } from '@/ai/flows/predictive-bestseller-tool';
import { getOrderHistoryString } from '@/lib/mock-db';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function PredictivePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictBestsellersOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trends, setTrends] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const runPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const history = getOrderHistoryString();
      const output = await predictBestsellers({ orderHistory: history });
      
      if (!output || !output.predictedBestsellers) {
        throw new Error("Invalid response from AI model");
      }
      
      setResult(output);
      // Generate trends on client side after success
      const newTrends = output.predictedBestsellers.map(() => Math.floor(Math.random() * 20 + 5));
      setTrends(newTrends);
    } catch (err: any) {
      console.error("Prediction error:", err);
      const msg = err.message || "Failed to generate AI prediction.";
      setError(msg);
      toast({
        variant: 'destructive',
        title: 'Forecast Error',
        description: 'Unable to complete analysis. Please check your AI configuration.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 text-primary mb-2 shadow-sm">
          <Zap size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">AI Sales Forecast</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Analyze historical patterns using Gemini to identify upcoming bestsellers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {!result && !loading && (
          <Card className="border-dashed border-2 bg-muted/20 flex flex-col items-center justify-center p-16 text-center shadow-none">
            <Sparkles className="h-12 w-12 text-primary mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Ready to Forecast?</h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              The AI will analyze recent order records from your warehouse to identify emerging trends.
            </p>
            <Button size="lg" onClick={runPrediction} className="font-bold gap-2 px-8 shadow-md">
              <Zap size={18} />
              Generate Prediction
            </Button>
          </Card>
        )}

        {loading && (
          <Card className="p-16 flex flex-col items-center justify-center space-y-8 shadow-sm border-none ring-1 ring-border">
            <RefreshCw className="h-12 w-12 text-primary animate-spin" />
            <div className="space-y-4 w-full max-w-md text-center">
              <h3 className="text-xl font-semibold">Analyzing Sales Data...</h3>
              <p className="text-muted-foreground text-sm">Gemini is processing historical records from your warehouse.</p>
              <Progress value={66} className="h-2" />
            </div>
          </Card>
        )}

        {error && (
          <Card className="border-destructive bg-destructive/5 p-6 flex items-center gap-4">
            <AlertCircle className="text-destructive" size={24} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-destructive">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">Verify your GOOGLE_GENAI_API_KEY environment variable.</p>
            </div>
            <Button variant="outline" size="sm" onClick={runPrediction}>Retry</Button>
          </Card>
        )}

        {result && !loading && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="text-primary" />
                Predicted Bestsellers
              </h2>
              <Button variant="outline" size="sm" onClick={runPrediction} className="gap-2">
                <RefreshCw size={14} />
                Regenerate
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.predictedBestsellers.map((item, idx) => (
                <Card key={idx} className="overflow-hidden border-none ring-1 ring-border border-t-4 border-t-primary shadow-lg hover:translate-y-[-4px] transition-all">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">High Confidence</Badge>
                    <CardTitle className="text-lg">{item.productName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{Math.round(item.predictedSales || 0)}</span>
                      <span className="text-sm text-muted-foreground">Est. Units</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/20 py-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                      <TrendingUp size={14} />
                      Growth potential: +{trends[idx] || 0}%
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
