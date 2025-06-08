'use client';

import React, { useMemo } from 'react';
import { useData } from '@/hooks/useData';
import { Document, DoctorStats } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { UserCheck, FileText, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function DoctorsPage() {
  const { 
    documents, 
    loading, 
    error, 
    refetch,
  } = useData();

  const doctorStats = useMemo(() => {
    if (!documents) return [];
    
    const statsMap = new Map<string, {
      nombre: string;
      documentos: number;
      pacientesSet: Set<string>;
      errores: number;
      tiempoTotal: number;
    }>();
    
    documents.forEach(doc => {
      const key = doc.RUT_medico;
      if (!statsMap.has(key)) {
        statsMap.set(key, {
          nombre: doc.nombre_medico,
          documentos: 0,
          pacientesSet: new Set(),
          errores: 0,
          tiempoTotal: 0
        });
      }
      
      const stats = statsMap.get(key)!;
      stats.documentos++;
      stats.pacientesSet.add(doc.RUT_paciente);
      if (doc.error) stats.errores++;
      stats.tiempoTotal += doc.inference_time;
    });
    
    const results: DoctorStats[] = [];
    statsMap.forEach((stats, rut) => {
      if (stats.documentos > 0) {
        results.push({
          rut,
          nombre: stats.nombre,
          documentos: stats.documentos,
          pacientes: stats.pacientesSet.size,
          tasaExito: ((stats.documentos - stats.errores) / stats.documentos) * 100,
          tiempoPromedio: Math.round(stats.tiempoTotal / stats.documentos)
        });
      }
    });
    
    return results.sort((a, b) => b.documentos - a.documentos);
  }, [documents]);
  
  const totalDoctors = doctorStats.length;
  const avgDocsPerDoctor = totalDoctors > 0
    ? doctorStats.reduce((sum, d) => sum + d.documentos, 0) / totalDoctors
    : 0;
  const avgSuccessRate = totalDoctors > 0
    ? doctorStats.reduce((sum, d) => sum + d.tasaExito, 0) / totalDoctors
    : 0;
  const avgTime = totalDoctors > 0
    ? doctorStats.reduce((sum, d) => sum + d.tiempoPromedio, 0) / totalDoctors
    : 0;

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
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
      <h2 className="text-2xl font-semibold mb-6">👨‍⚕️ Análisis de Médicos</h2>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-t-4 border-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase">Médicos Activos</p>
                <p className="text-3xl font-bold mt-2">{totalDoctors}</p>
              </div>
              <UserCheck className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase">Documentos Procesados</p>
                <p className="text-3xl font-bold mt-2">{documents.length}</p>
              </div>
              <FileText className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase">Tasa de Éxito Promedio</p>
                <p className="text-3xl font-bold mt-2">{avgSuccessRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-gray-400">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase">Tiempo Promedio</p>
                <p className="text-3xl font-bold mt-2">{Math.round(avgTime)}ms</p>
              </div>
              <Clock className="w-8 h-8 text-gray-400 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Doctors Table */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Top 10 Médicos por Volumen</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RUT</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-right">Documentos</TableHead>
                <TableHead className="text-right">Pacientes</TableHead>
                <TableHead>Tasa Éxito</TableHead>
                <TableHead className="text-right">Tiempo Prom (ms)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorStats.slice(0, 10).map((doctor) => (
                <TableRow key={doctor.rut}>
                  <TableCell className="font-mono text-sm">{doctor.rut}</TableCell>
                  <TableCell className="font-medium">{doctor.nombre}</TableCell>
                  <TableCell className="text-right">{doctor.documentos}</TableCell>
                  <TableCell className="text-right">{doctor.pacientes}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={doctor.tasaExito} className="w-20" />
                      <span className="text-sm font-medium">{doctor.tasaExito.toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{doctor.tiempoPromedio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 