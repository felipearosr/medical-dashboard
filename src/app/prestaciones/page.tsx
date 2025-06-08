'use client';

import React, { useMemo } from 'react';
import { useData } from '@/hooks/useData';
import { Document, Prestacion } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
} from 'recharts';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function PrestacionesPage() {
  const { 
    documents, 
    loading, 
    error, 
    refetch,
  } = useData();

  // Calculate prestaciones statistics
  const stats = useMemo(() => {
    if (!documents || documents.length === 0) {
      return {
        total: 0,
        unique: 0,
        avgPerDoc: 0,
        avgScore: 0,
        top10: [],
        categories: [],
      };
    }
    
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

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#667eea] mb-4" />
          <p className="text-lg text-gray-600">Cargando prestaciones...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">💊 Análisis de Prestaciones</h2>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-t-4 border-primary">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase">Total Prestaciones</p>
            <p className="text-3xl font-bold mt-2">{stats.total.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-green-500">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase">Prestaciones Únicas</p>
            <p className="text-3xl font-bold mt-2">{stats.unique}</p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-yellow-500">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase">Promedio por Doc</p>
            <p className="text-3xl font-bold mt-2">{stats.avgPerDoc.toFixed(1)}</p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-gray-400">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase">Confianza Promedio</p>
            <p className="text-3xl font-bold mt-2">{(stats.avgScore * 100).toFixed(1)}%</p>
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
                  <BarChart data={stats.top10} layout="vertical">
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
    </div>
  );
} 