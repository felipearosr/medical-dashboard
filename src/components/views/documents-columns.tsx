'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Document } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Document>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'document_id',
    header: 'Document ID',
  },
  {
    accessorKey: 'nombre_paciente',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Patient
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'nombre_medico',
    header: 'Doctor',
  },
  {
    accessorKey: 'tipo_documento',
    header: 'Type',
  },
  {
    accessorKey: 'error',
    header: 'Status',
    cell: ({ row }) => {
      const isError = row.getValue('error');
      return (
        <Badge variant={isError ? 'destructive' : 'default'}>
          {isError ? 'Error' : 'Success'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'inference_time',
    header: 'Inference Time (ms)',
  },
]; 