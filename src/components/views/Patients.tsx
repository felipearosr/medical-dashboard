// components/views/Patients.tsx
"use client"
import React from 'react';
import { Document } from '@/lib/types';
import { DataTable } from '@/components/ui/data-table';
import { columns, Patient } from './patients-columns';

interface PatientsProps {
  documents: Document[];
}

export function Patients({ documents }: PatientsProps) {
  const patientData = React.useMemo(() => {
    const patientMap = new Map<string, { rut: string; name: string; docCount: number }>();
    documents.forEach((doc) => {
      if (patientMap.has(doc.RUT_paciente)) {
        patientMap.get(doc.RUT_paciente)!.docCount++;
      } else {
        patientMap.set(doc.RUT_paciente, {
          rut: doc.RUT_paciente,
          name: doc.nombre_paciente,
          docCount: 1,
        });
      }
    });

    return Array.from(patientMap.values()).map(
      (p) => ({ ...p, documentCount: p.docCount } as Patient)
    );
  }, [documents]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={patientData} />
    </div>
  );
}