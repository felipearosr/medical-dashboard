'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Document } from '@/lib/types';

export type Patient = {
  rut: string;
  name: string;
  documentCount: number;
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'rut',
    header: 'RUT',
  },
  {
    accessorKey: 'documentCount',
    header: 'Document Count',
  },
]; 