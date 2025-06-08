// hooks/useData.ts

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Document, MonthlyStats, FilterState } from '@/lib/types';
import { calculateMonthlyStats } from '@/lib/data-processing';

interface UseDataReturn {
  documents: Document[];
  stats: MonthlyStats | null;
  loading: boolean;
  error: Error | null;
  filteredDocuments: Document[];
  refetch: () => Promise<void>;
  applyFilters: (filters: Partial<FilterState>) => void;
  exportData: (documents: Document[]) => void;
}

export function useData(): UseDataReturn {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState<MonthlyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<Partial<FilterState>>({});

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/data');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      setDocuments(data.documents || []);
      setStats(data.stats || calculateMonthlyStats([]));
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err as Error);
      
      // Set default data on error
      setDocuments([]);
      setStats(calculateMonthlyStats([]));
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter documents based on current filters
  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    // Apply text search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.document_id.toLowerCase().includes(searchLower) ||
        doc.nombre_paciente.toLowerCase().includes(searchLower) ||
        doc.nombre_medico.toLowerCase().includes(searchLower) ||
        doc.RUT_paciente.toLowerCase().includes(searchLower) ||
        doc.RUT_medico.toLowerCase().includes(searchLower)
      );
    }

    // Apply date range filter
    if (filters.fechaInicio && filters.fechaFin) {
      filtered = filtered.filter(doc => {
        const docDate = new Date(doc.date_time);
        return docDate >= filters.fechaInicio! && docDate <= filters.fechaFin!;
      });
    }

    // Apply document type filter
    if (filters.tipoDocumento && filters.tipoDocumento !== 'all') {
      filtered = filtered.filter(doc => doc.tipo_documento === filters.tipoDocumento);
    }

    // Apply RUT filters
    if (filters.rutMedico) {
      filtered = filtered.filter(doc => doc.RUT_medico.includes(filters.rutMedico!));
    }

    if (filters.rutPaciente) {
      filtered = filtered.filter(doc => doc.RUT_paciente.includes(filters.rutPaciente!));
    }

    // Apply error filter
    if (filters.onlyErrors) {
      filtered = filtered.filter(doc => doc.error);
    }

    return filtered;
  }, [documents, filters]);

  // Apply filters
  const applyFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Export data function
  const exportData = useCallback((documentsToExport: Document[]) => {
    const headers = [
      'ID Documento',
      'Fecha',
      'Tipo',
      'Clasificación',
      'Paciente',
      'RUT Paciente',
      'Médico',
      'RUT Médico',
      'Estado',
      'Tiempo (ms)',
      'Prestaciones'
    ];

    const rows = documentsToExport.map(doc => [
      doc.document_id,
      doc.fecha_examen,
      doc.tipo_documento,
      doc.clasificacion,
      doc.nombre_paciente,
      doc.RUT_paciente,
      doc.nombre_medico,
      doc.RUT_medico,
      doc.error ? 'Error' : 'OK',
      doc.inference_time.toString(),
      doc.prestaciones.map(p => p.descripcion).join('; ')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `medical_documents_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    documents,
    stats,
    loading,
    error,
    filteredDocuments,
    refetch: fetchData,
    applyFilters,
    exportData
  };
}

// Hook for real-time updates (WebSocket example)
export function useRealTimeUpdates(onUpdate: (document: Document) => void) {
  useEffect(() => {
    // In a real application, you would connect to a WebSocket server
    // This is a placeholder for the real-time functionality
    
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'document_update') {
          onUpdate(data.document);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return () => {
      ws.close();
    };
  }, [onUpdate]);
}

// Hook for pagination
export function usePagination<T>(items: T[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  
  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}