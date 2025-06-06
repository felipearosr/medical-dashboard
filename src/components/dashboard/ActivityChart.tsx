// components/dashboard/ActivityChart.tsx

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
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Documentos Procesados - Noviembre 2024</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-[#667eea] text-white hover:bg-[#667eea]/90">
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
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorDocuments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis 
                dataKey="day" 
                label={{ value: 'Día del mes', position: 'insideBottom', offset: -5 }}
                className="text-xs"
              />
              <YAxis 
                label={{ value: 'Cantidad de documentos', angle: -90, position: 'insideLeft' }}
                className="text-xs"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  padding: '8px'
                }}
                formatter={(value: number) => [`${value} documentos`, 'Procesados']}
                labelFormatter={(label) => `Día ${label}`}
              />
              <Area
                type="monotone"
                dataKey="documents"
                stroke="#667eea"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorDocuments)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}