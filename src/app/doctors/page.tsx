'use client';

import { Doctors } from '@/components/views/Doctors';
import { useData } from '@/hooks/useData';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function DoctorsPage() {
  const { 
    documents, 
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
          <p className="text-lg text-gray-600">Cargando médicos...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
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
    <Doctors documents={documents} />
  );
} 