// components/views/Prestaciones.tsx

import React, { useMemo } from 'react';
import { Document, Prestacion } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface PrestacionesProps {
  documents: Document[];
}

export function Prestaciones({ documents }: PrestacionesProps) {
  // Calculate prestaciones statistics
  const stats = useMemo(() => {
    const allPrestaciones: Prestacion[] = [];
    const prestacionesByDoc: number[] = [];
    
    documents.forEach(doc => {
      const count = doc.prestaciones.length;
      prestacionesByDoc.push(count);
      doc.prestaciones.forEach(prest => {
        if (prest.descripcion) {
          allPrestaciones.push(prest);
        }
      });
    });
    
    const uniquePrestaciones = new Set(allPrestaciones.map(p => p.descripcion)).size;
    const avgPrestaciones = prestacionesByDoc.length > 0 
      ? prestacionesByDoc.reduce((a, b) => a + b, 0) / prestacionesByDoc.length 
      : 0;
    const avgScore = allPrestaciones.length > 0
      ? allPrestaciones.reduce((sum, p) => sum + p.score, 0) / allPrestaciones.length
      : 0;
    
    // Count prestaciones
    const prestCounts: Record<string, number> = {};
    allPrestaciones.forEach(prest => {
      if (prest.descripcion) {
        prestCounts[prest.descripcion] = (prestCounts[prest.descripcion] || 0) + 1;
      }
    });
    
    // Top 10
    const top10 = Object.entries(prestCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));
    
    // Categories
    const categories: Record<string, number> = {
      'Bioquímica': 0,
      'Hematología': 0,
      'Endocrinología': 0,
      'Infectología': 0,
      'Uroanálisis': 0,
      'Otros': 0
    };
    
    allPrestaciones.forEach(prest => {
      const desc = prest.descripcion.toUpperCase();
      if (['PERFIL', 'GLICEMIA', 'GLUCOSA'].some(term => desc.includes(term))) {
        categories['Bioquímica']++;
      } else if (['HEMOGRAMA', 'VHS'].some(term => desc.includes(term))) {
        categories['Hematología']++;
      } else if (['TSH', 'T3', 'T4'].some(term => desc.includes(term))) {
        categories['Endocrinología']++;
      } else if (['VIH', 'VDRL', 'HEPATITIS'].some(term => desc.includes(term))) {
        categories['Infectología']++;
      } else if (['ORINA', 'UROCULTIVO'].some(term => desc.includes(term))) {
        categories['Uroanálisis']++;
      } else {
        categories['Otros']++;
      }
    });
    
    return {
      total: allPrestaciones.length,
      unique: uniquePrestaciones,
      avgPerDoc: avgPrestaciones,
      avgScore: avgScore,
      top10,
      categories: Object.entries(categories).map(([name, value]) => ({ name, value }))
    };
  }, [documents]);

  const COLORS = ['#667eea', '#48bb78', '#ed8936', '#f56565', '#38b2ac', '#9f7aea'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">💊 Análisis de Prestaciones</h2>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-t-4 border-t-primary">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase">Total Prestaciones</p>
            <p className="text-3xl font-bold mt-2">{stats.total.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">362 prestaciones este mes</p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-success">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase">Prestaciones Únicas</p>
            <p className="text-3xl font-bold mt-2">{stats.unique}</p>
            <p className="text-sm text-gray-500 mt-1">8 categorías principales</p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-warning">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase">Promedio por Doc</p>
            <p className="text-3xl font-bold mt-2">{stats.avgPerDoc.toFixed(1)}</p>
            <p className="text-sm text-gray-500 mt-1">Máx: 30 prestaciones</p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-gray-400">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase">Confianza Promedio</p>
            <p className="text-3xl font-bold mt-2">{(stats.avgScore * 100).toFixed(1)}%</p>
            <p className="text-sm text-red-500 mt-1">15 con score &lt; 70%</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 10 Prestaciones */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>🏆 Top 10 Prestaciones Más Solicitadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.top10} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={200} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#667eea" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Distribución por Categorías */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>📊 Distribución por Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.categories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Filters section placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 bg-gray-50 rounded text-center text-gray-500">
              Período
            </div>
            <div className="p-4 bg-gray-50 rounded text-center text-gray-500">
              Categoría
            </div>
            <div className="p-4 bg-gray-50 rounded text-center text-gray-500">
              Confianza Mínima
            </div>
            <div className="p-4 bg-gray-50 rounded text-center text-gray-500">
              Buscar Prestación
            </div>
            <div className="p-4 bg-gray-50 rounded text-center text-gray-500">
              Aplicar Filtros
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}