// components/views/Doctors.tsx

import React, { useMemo } from 'react';
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
import { UserCheck, FileText, Clock, TrendingUp } from 'lucide-react';

interface DoctorsProps {
  documents: Document[];
}

export function Doctors({ documents }: DoctorsProps) {
  const doctorStats = useMemo(() => {
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
      results.push({
        rut,
        nombre: stats.nombre,
        documentos: stats.documentos,
        pacientes: stats.pacientesSet.size,
        tasaExito: ((stats.documentos - stats.errores) / stats.documentos) * 100,
        tiempoPromedio: Math.round(stats.tiempoTotal / stats.documentos)
      });
    });
    
    return results.sort((a, b) => b.documentos - a.documentos);
  }, [documents]);
  
  const totalDoctors = doctorStats.length;
  const avgDocsPerDoctor = doctorStats.length > 0
    ? doctorStats.reduce((sum, d) => sum + d.documentos, 0) / doctorStats.length
    : 0;
  const avgSuccessRate = doctorStats.length > 0
    ? doctorStats.reduce((sum, d) => sum + d.tasaExito, 0) / doctorStats.length
    : 0;
  const avgTime = doctorStats.length > 0
    ? doctorStats.reduce((sum, d) => sum + d.tiempoPromedio, 0) / doctorStats.length
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">👨‍⚕️ Análisis de Médicos</h2>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-t-4 border-t-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase">Médicos Activos</p>
                <p className="text-3xl font-bold mt-2">{totalDoctors}</p>
                <p className="text-sm text-green-600 mt-1">+3 este mes</p>
              </div>
              <UserCheck className="w-8 h-8 text-[#667eea] opacity-20" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase">Documentos Procesados</p>
                <p className="text-3xl font-bold mt-2">847</p>
                <p className="text-sm text-gray-500 mt-1">Promedio: {avgDocsPerDoctor.toFixed(1)}/médico</p>
              </div>
              <FileText className="w-8 h-8 text-success opacity-20" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase">Tasa de Éxito Promedio</p>
                <p className="text-3xl font-bold mt-2">{avgSuccessRate.toFixed(1)}%</p>
                <p className="text-sm text-green-600 mt-1">↑ 2.1% vs mes anterior</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning opacity-20" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-gray-400">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase">Tiempo Promedio</p>
                <p className="text-3xl font-bold mt-2">{Math.round(avgTime)}ms</p>
                <p className="text-sm text-gray-500 mt-1">Por documento</p>
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
      
      {/* Performance Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">🎯 Distribución por Tasa de Éxito</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">95-100%</span>
                <span className="text-sm font-semibold text-green-600">12 médicos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">90-95%</span>
                <span className="text-sm font-semibold text-blue-600">8 médicos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">85-90%</span>
                <span className="text-sm font-semibold text-yellow-600">3 médicos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">&lt; 85%</span>
                <span className="text-sm font-semibold text-red-600">1 médico</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">⏱️ Tiempos de Procesamiento</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">&lt; 20ms</span>
                <span className="text-sm font-semibold">8 médicos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">20-30ms</span>
                <span className="text-sm font-semibold">10 médicos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">30-40ms</span>
                <span className="text-sm font-semibold">5 médicos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">&gt; 40ms</span>
                <span className="text-sm font-semibold">1 médico</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">📊 Volumen Mensual</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">&gt; 50 docs</span>
                <span className="text-sm font-semibold">5 médicos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">30-50 docs</span>
                <span className="text-sm font-semibold">8 médicos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">10-30 docs</span>
                <span className="text-sm font-semibold">7 médicos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">&lt; 10 docs</span>
                <span className="text-sm font-semibold">4 médicos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}