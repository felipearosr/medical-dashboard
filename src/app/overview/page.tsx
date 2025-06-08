'use client';

import { useData } from '@/hooks/useData';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Filters } from '@/components/dashboard/Filters';
import { MetricCards } from '@/components/dashboard/MetricCards';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { CalendarHeatmap } from '@/components/dashboard/CalendarHeatmap';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { StatsGrid } from '@/components/dashboard/StatsGrid';

export default function OverviewPage() {
  const { 
    documents, 
    stats, 
    loading, 
    error, 
    refetch,
  } = useData();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Alert className="max-w-md" variant="destructive">
          <AlertTitle>Error al cargar datos</AlertTitle>
          <AlertDescription className="mt-2">
            {error ? error.message : 'No se pudieron cargar las estadísticas.'}
          </AlertDescription>
          <Button 
            onClick={refetch} 
            className="mt-4"
            variant="outline"
          >
            Reintentar
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Filters />
      
      <MetricCards stats={stats} />
      
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
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