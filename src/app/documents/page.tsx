'use client';

import React, { useState, useMemo } from 'react';
import { useData } from '@/hooks/useData';
import { Document } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Search, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DocumentsPage() {
  const { 
    documents, 
    loading, 
    error, 
    refetch,
  } = useData();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [onlyErrors, setOnlyErrors] = useState(false);

  // Get unique types and classifications
  const documentTypes = useMemo(() => {
    if (!documents) return [];
    const types = new Set(documents.map(d => d.tipo_documento));
    return Array.from(types);
  }, [documents]);

  const classifications = useMemo(() => {
    if (!documents) return [];
    const classes = new Set(documents.map(d => d.clasificacion));
    return Array.from(classes);
  }, [documents]);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    if (!documents) return [];
    return documents.filter(doc => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !doc.document_id.toLowerCase().includes(searchLower) &&
          !doc.nombre_paciente.toLowerCase().includes(searchLower) &&
          !doc.nombre_medico.toLowerCase().includes(searchLower) &&
          !doc.RUT_paciente.toLowerCase().includes(searchLower) &&
          !doc.RUT_medico.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Type filter
      if (typeFilter !== 'all' && doc.tipo_documento !== typeFilter) {
        return false;
      }

      // Classification filter
      if (classFilter !== 'all' && doc.clasificacion !== classFilter) {
        return false;
      }

      // Error filter
      if (onlyErrors && !doc.error) {
        return false;
      }

      return true;
    });
  }, [documents, search, typeFilter, classFilter, onlyErrors]);

  const handleExport = () => {
    // Create CSV content
    const headers = ['ID Documento', 'Fecha Examen', 'Paciente', 'Médico', 'Tipo', 'Clasificación', 'Estado', 'Tiempo'];
    const rows = filteredDocuments.map(doc => [
      doc.document_id,
      doc.fecha_examen,
      doc.nombre_paciente,
      doc.nombre_medico,
      doc.tipo_documento,
      doc.clasificacion,
      doc.error ? 'Error' : 'OK',
      `${doc.inference_time}ms`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `documentos_filtrados_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#667eea] mb-4" />
          <p className="text-lg text-gray-600">Cargando documentos...</p>
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
      <div>
        <h2 className="text-2xl font-semibold mb-6">📄 Búsqueda de Documentos</h2>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">
                <Search className="inline w-4 h-4 mr-1" />
                Buscar
              </Label>
              <Input
                id="search"
                placeholder="ID, Paciente, Médico..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="type">📋 Tipo</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="classification">📂 Clasificación</Label>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger id="classification">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {classifications.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="errors"
                  checked={onlyErrors}
                  onCheckedChange={(checked) => setOnlyErrors(checked as boolean)}
                />
                <Label htmlFor="errors" className="cursor-pointer">
                  ⚠️ Solo errores
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-blue-700">
            📊 Se encontraron {filteredDocuments.length} documentos
          </p>
        </div>

        {/* Results table */}
        {filteredDocuments.length > 0 && (
          <>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Documento</TableHead>
                    <TableHead>Fecha Examen</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Clasificación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Tiempo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.slice(0, 50).map((doc) => (
                    <TableRow key={doc.document_id}>
                      <TableCell className="font-mono text-sm">{doc.document_id}</TableCell>
                      <TableCell>{doc.fecha_examen}</TableCell>
                      <TableCell>{doc.nombre_paciente}</TableCell>
                      <TableCell>{doc.nombre_medico}</TableCell>
                      <TableCell>{doc.tipo_documento}</TableCell>
                      <TableCell>{doc.clasificacion}</TableCell>
                      <TableCell>
                        {doc.error ? (
                          <Badge variant="destructive">⚠️ Error</Badge>
                        ) : (
                          <Badge variant="default" className="bg-green-100 text-green-800">✅ OK</Badge>
                        )}
                      </TableCell>
                      <TableCell>{doc.inference_time} ms</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredDocuments.length > 50 && (
              <p className="text-sm text-gray-600 mt-2">
                Mostrando 50 de {filteredDocuments.length} resultados
              </p>
            )}

            <div className="mt-4">
              <Button onClick={handleExport} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                📥 Exportar resultados
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 