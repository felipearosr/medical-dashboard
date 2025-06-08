// components/dashboard/MetricCards.tsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { MonthlyStats } from '@/lib/types';

interface MetricCardsProps {
  stats: MonthlyStats;
}

export function MetricCards({ stats }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Procesados"
        value={stats.total_documents.toLocaleString()}
        change="+12.5%"
        changeType="positive"
        icon="📄"
        borderColor="border-primary"
      />
      
      <MetricCard
        title="Exitosos"
        value={stats.successful_documents.toLocaleString()}
        change="+15.2%"
        changeType="positive"
        icon="✅"
        borderColor="border-success"
      />
      
      <MetricCard
        title="Errores"
        value={stats.error_documents.toString()}
        change="-8.3%"
        changeType="negative"
        icon="⚠️"
        borderColor="border-error"
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
  borderColor: string;
}

function MetricCard({ title, value, change, changeType, icon, borderColor }: MetricCardProps) {
  return (
    <Card className={`relative overflow-hidden border-t-4 ${borderColor} hover:shadow-lg transition-shadow`}>
      <CardContent className="p-6">
        <div className="absolute right-4 top-4 text-4xl opacity-10">
          {icon}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            {title}
          </p>
          
          <p className="text-4xl font-bold text-gray-900">
            {value}
          </p>
          
          <div className={`flex items-center gap-1 text-sm ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'positive' ? (
              <ArrowUpIcon className="w-4 h-4" />
            ) : (
              <ArrowDownIcon className="w-4 h-4" />
            )}
            <span>{change} vs mes anterior</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}