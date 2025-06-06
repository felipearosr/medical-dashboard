// components/dashboard/StatsGrid.tsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MonthlyStats } from '@/lib/types';

interface StatsGridProps {
  stats: MonthlyStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const bottomStats = [
    {
      label: 'Tasa de Éxito',
      value: `${stats.success_rate.toFixed(1)}%`,
      color: 'text-green-600'
    },
    {
      label: 'Tiempo Promedio',
      value: `${Math.round(stats.avg_inference_time)}ms`,
      color: 'text-[#667eea]'
    },
    {
      label: 'Documentos/Día',
      value: (stats.total_documents / 30).toFixed(1),
      color: 'text-gray-700'
    },
    {
      label: 'Médicos Únicos',
      value: stats.total_doctors.toString(),
      color: 'text-gray-700'
    },
    {
      label: 'Pacientes Únicos',
      value: stats.total_patients.toLocaleString(),
      color: 'text-gray-700'
    },
    {
      label: 'Tipos de Doc.',
      value: '5',
      color: 'text-gray-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {bottomStats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}