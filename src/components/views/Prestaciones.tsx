// components/views/Prestaciones.tsx
"use client"
import React from 'react';
import { Document } from '@/lib/types';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './prestaciones-columns';

interface PrestacionesProps {
  documents: Document[];
}

export function Prestaciones({ documents }: PrestacionesProps) {
  const allPrestaciones = React.useMemo(() => {
    return documents.flatMap((doc) => doc.prestaciones);
  }, [documents]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={allPrestaciones} />
    </div>
  );
}