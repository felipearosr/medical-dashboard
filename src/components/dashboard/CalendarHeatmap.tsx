// components/dashboard/CalendarHeatmap.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MonthlyStats } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CalendarHeatmapProps {
  stats: MonthlyStats;
}

export function CalendarHeatmap({ stats }: CalendarHeatmapProps) {
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  // Generate calendar for November 2024
  const firstDay = new Date(2024, 10, 1).getDay();
  const daysInMonth = 30;
  
  // Create calendar grid
  const calendarGrid = [];
  let currentWeek = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    
    if (currentWeek.length === 7) {
      calendarGrid.push(currentWeek);
      currentWeek = [];
    }
  }
  
  // Add empty cells for remaining days
  while (currentWeek.length > 0 && currentWeek.length < 7) {
    currentWeek.push(null);
  }
  if (currentWeek.length > 0) {
    calendarGrid.push(currentWeek);
  }
  
  const getHeatmapColor = (count: number): string => {
    if (count === 0) return 'bg-gray-100';
    if (count < 30) return 'bg-green-100';
    if (count < 60) return 'bg-green-300';
    if (count < 90) return 'bg-green-500';
    if (count < 120) return 'bg-green-600';
    return 'bg-green-700';
  };
  
  const getTextColor = (count: number): string => {
    if (count === 0) return 'text-gray-400';
    if (count < 60) return 'text-green-900';
    return 'text-white';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📅</span> Actividad del Mes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-xs font-semibold text-gray-600 text-center">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="space-y-2">
            {calendarGrid.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-2">
                {week.map((day, dayIndex) => {
                  const count = day ? (stats.daily_counts[day] || 0) : 0;
                  const isToday = day === 27;
                  
                  return (
                    <div
                      key={dayIndex}
                      className={cn(
                        "relative aspect-square rounded-md flex items-center justify-center text-sm font-medium transition-all cursor-pointer group",
                        day ? getHeatmapColor(count) : 'bg-transparent',
                        day ? getTextColor(count) : '',
                        isToday && 'ring-2 ring-primary ring-offset-2'
                      )}
                    >
                      {day && (
                        <>
                          <span>{day}</span>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {count} documentos {isToday && '(HOY)'}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-600">
            <span>Menos</span>
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <div className="w-4 h-4 bg-green-300 rounded"></div>
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <div className="w-4 h-4 bg-green-700 rounded"></div>
            <span>Más</span>
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm mb-3">📊 Resumen Rápido</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Día más activo</p>
              <p className="font-semibold">23 Nov - 189 docs</p>
            </div>
            <div>
              <p className="text-gray-600">Promedio diario</p>
              <p className="font-semibold">61.5 documentos</p>
            </div>
            <div>
              <p className="text-gray-600">Top hora del día</p>
              <p className="font-semibold">10:00 - 11:00</p>
            </div>
            <div>
              <p className="text-gray-600">Médico más activo</p>
              <p className="font-semibold">Dr. R. Sánchez</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}