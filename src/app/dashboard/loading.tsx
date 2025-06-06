import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#667eea] mb-4" />
        <p className="text-lg text-gray-600">Cargando dashboard...</p>
      </div>
    </div>
  );
} 