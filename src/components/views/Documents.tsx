// components/views/Documents.tsx
"use client"

import { Document } from '@/lib/types';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './documents-columns';

interface DocumentsProps {
  documents: Document[];
}

export function Documents({ documents }: DocumentsProps) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={documents} />
    </div>
  );
}