// components/dashboard/MetricCards.tsx

'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  FileText,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { MonthlyStats } from '@/lib/types';

interface MetricCardsProps {
  stats: MonthlyStats;
}

export function MetricCards({ stats }: MetricCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Procesados"
        value={stats.total_documents.toLocaleString()}
        change="+12.5%"
        changeType="positive"
        icon={FileText}
      />

      <MetricCard
        title="Exitosos"
        value={stats.successful_documents.toLocaleString()}
        change="+15.2%"
        changeType="positive"
        icon={CheckCircle}
        iconColor="text-green-500"
      />

      <MetricCard
        title="Errores"
        value={stats.error_documents.toString()}
        change="-8.3%"
        changeType="negative"
        icon={XCircle}
        iconColor="text-red-500"
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ElementType;
  iconColor?: string;
}

function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor = 'text-primary',
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${
            changeType === 'positive' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {change} vs mes anterior
        </p>
      </CardContent>
    </Card>
  );
}