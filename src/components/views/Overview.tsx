// components/views/Overview.tsx

import React from 'react';
import { Document, MonthlyStats } from '@/lib/types';
import { Filters } from '@/components/dashboard/Filters';
import { MetricCards } from '@/components/dashboard/MetricCards';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { CalendarHeatmap } from '@/components/dashboard/CalendarHeatmap';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { StatsGrid } from '@/components/dashboard/StatsGrid';

interface OverviewProps {
  documents: Document[];
  stats: MonthlyStats;
}

export function Overview({ documents, stats }: OverviewProps) {
  return (
    <div className="space-y-8">
      <Filters />
      
      <MetricCards stats={stats} />
      
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityChart stats={stats} />
          <RecentActivity />
        </div>
        
        <div>
          <CalendarHeatmap stats={stats} />
        </div>
      </div>
      
      <StatsGrid stats={stats} />
    </div>
  );
}