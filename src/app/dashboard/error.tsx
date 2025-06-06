'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Alert className="max-w-md">
        <AlertTitle>Error al cargar datos</AlertTitle>
        <AlertDescription className="mt-2">
          {error.message}
        </AlertDescription>
        <Button 
          onClick={() => reset()} 
          className="mt-4"
          variant="outline"
        >
          Reintentar
        </Button>
      </Alert>
    </div>
  );
} 