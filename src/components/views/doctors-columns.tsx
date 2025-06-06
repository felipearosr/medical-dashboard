'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DoctorStats } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<DoctorStats>[] = [
  {
    accessorKey: 'nombre',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'rut',
    header: 'RUT',
  },
  {
    accessorKey: 'documentos',
    header: 'Documents',
  },
  {
    accessorKey: 'pacientes',
    header: 'Patients',
  },
  {
    accessorKey: 'tasaExito',
    header: 'Success Rate',
    cell: ({ row }) => {
      const rate = parseFloat(row.getValue('tasaExito'));
      const formatted = `${rate.toFixed(1)}%`;
      return (
        <Badge
          variant={
            rate > 95 ? 'default' : rate > 85 ? 'secondary' : 'destructive'
          }
        >
          {formatted}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'tiempoPromedio',
    header: 'Avg. Time (ms)',
  },
]; 