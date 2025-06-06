'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Prestacion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Prestacion>[] = [
  {
    accessorKey: 'descripcion',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'codigo',
    header: 'Code',
  },
  {
    accessorKey: 'score',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const score = parseFloat(row.getValue('score'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'percent',
      }).format(score);

      return (
        <Badge
          variant={
            score > 0.9 ? 'default' : score > 0.7 ? 'secondary' : 'destructive'
          }
        >
          {formatted}
        </Badge>
      );
    },
  },
]; 