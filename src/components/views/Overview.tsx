// components/views/Overview.tsx

'use client';

import { Document, MonthlyStats } from '@/lib/types';
import { MetricCards } from '@/components/dashboard/MetricCards';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

interface OverviewProps {
  documents: Document[];
  stats: MonthlyStats;
}

export function Overview({ documents, stats }: OverviewProps) {
  return (
    <div className="space-y-4">
      <MetricCards stats={stats} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <ActivityChart stats={stats} />
        </div>
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}