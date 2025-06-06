// components/views/Doctors.tsx

"use client"
import React from 'react';
import { Document, DoctorStats } from '@/lib/types';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './doctors-columns';

interface DoctorsProps {
  documents: Document[];
}

export function Doctors({ documents }: DoctorsProps) {
  const doctorStats = React.useMemo(() => {
    const statsMap = new Map<
      string,
      {
        nombre: string;
        documentos: number;
        pacientesSet: Set<string>;
        errores: number;
        tiempoTotal: number;
      }
    >();

    documents.forEach((doc) => {
      const key = doc.RUT_medico;
      if (!statsMap.has(key)) {
        statsMap.set(key, {
          nombre: doc.nombre_medico,
          documentos: 0,
          pacientesSet: new Set(),
          errores: 0,
          tiempoTotal: 0,
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
        tasaExito:
          stats.documentos > 0
            ? ((stats.documentos - stats.errores) / stats.documentos) * 100
            : 0,
        tiempoPromedio:
          stats.documentos > 0
            ? Math.round(stats.tiempoTotal / stats.documentos)
            : 0,
      });
    });

    return results.sort((a, b) => b.documentos - a.documentos);
  }, [documents]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={doctorStats} />
    </div>
  );
}