// components/dashboard/QuickActions.tsx

import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  Users, 
  Pill, 
  Download, 
  AlertTriangle, 
  BarChart3 
} from 'lucide-react';

export function QuickActions() {
  const actions = [
    { icon: <Search className="w-8 h-8" />, label: 'Buscar Documento', emoji: '🔍' },
    { icon: <Users className="w-8 h-8" />, label: 'Buscar Paciente', emoji: '👥' },
    { icon: <Pill className="w-8 h-8" />, label: 'Ver Prestaciones', emoji: '💊' },
    { icon: <Download className="w-8 h-8" />, label: 'Exportar Datos', emoji: '📥' },
    { icon: <AlertTriangle className="w-8 h-8" />, label: 'Ver Errores', emoji: '⚠️' },
    { icon: <BarChart3 className="w-8 h-8" />, label: 'Generar Reporte', emoji: '📊' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span>⚡</span> Acciones Rápidas
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="group"
          >
            <Card className="p-6 text-center hover:border-primary hover:shadow-md transition-all cursor-pointer h-full">
              <div className="flex flex-col items-center gap-3">
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {action.emoji}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}