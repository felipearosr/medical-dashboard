// components/dashboard/ActivityChart.tsx
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MonthlyStats } from '@/lib/types';

interface ActivityChartProps {
  stats: MonthlyStats;
}

export function ActivityChart({ stats }: ActivityChartProps) {
  // Transform daily counts to chart data
  const chartData = Object.entries(stats.daily_counts).map(([day, count]) => ({
    day: parseInt(day),
    documents: count,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Documentos Procesados - Noviembre 2024
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="default" size="sm">
            Diario
          </Button>
          <Button variant="outline" size="sm">
            Semanal
          </Button>
          <Button variant="outline" size="sm">
            Por Tipo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorDocuments" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                className="text-xs"
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                className="text-xs"
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelClassName="text-sm"
              />
              <Area
                type="monotone"
                dataKey="documents"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorDocuments)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}