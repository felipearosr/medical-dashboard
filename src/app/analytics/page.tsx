'use client';

import { Analytics } from '@/components/views/Analytics';
import { useData } from '@/hooks/useData';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#667eea] mb-4" />
          <p className="text-lg text-gray-600">Cargando analíticas...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Alert className="max-w-md">
          <AlertTitle>Error al cargar datos</AlertTitle>
          <AlertDescription className="mt-2">
            {error.message}
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
    <>
      {/* Error banner if exists but data loaded */}
      {error && stats && (
        <Alert className="mb-6" variant="destructive">
          <AlertTitle>Advertencia</AlertTitle>
          <AlertDescription>
            Algunos datos pueden no estar actualizados. {error.message}
          </AlertDescription>
        </Alert>
      )}

      <Analytics documents={documents} stats={stats!} />
    </>
  );
} 