// components/dashboard/MetricCards.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { MonthlyStats } from '@/lib/types';

interface MetricCardsProps {
  stats: MonthlyStats;
}

export function MetricCards({ stats }: MetricCardsProps) {
  // These change values should ideally come from the stats object
  const changeValues = {
    total: '+12.5%',
    successful: '+15.2%',
    error: '-8.3%'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Documentos Procesados"
        value={stats.total_documents.toLocaleString()}
        change={changeValues.total}
        changeType="positive"
        Icon={FileText}
      />
      
      <MetricCard
        title="Documentos Exitosos"
        value={stats.successful_documents.toLocaleString()}
        change={changeValues.successful}
        changeType="positive"
        Icon={CheckCircle2}
      />
      
      <MetricCard
        title="Documentos con Errores"
        value={stats.error_documents.toString()}
        change={changeValues.error}
        changeType="negative"
        Icon={AlertCircle}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  Icon: React.ElementType;
}

function MetricCard({ title, value, change, changeType, Icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center gap-1 text-xs ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {changeType === 'positive' ? (
            <ArrowUpIcon className="w-3 h-3" />
          ) : (
            <ArrowDownIcon className="w-3 h-3" />
          )}
          <span>{change} vs mes anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}