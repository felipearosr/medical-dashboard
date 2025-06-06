// components/views/Patients.tsx

import React, { useState, useMemo } from 'react';
import { Document } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, FileText, Users, Pill, AlertCircle, Calendar } from 'lucide-react';

interface PatientsProps {
  documents: Document[];
}

export function Patients({ documents }: PatientsProps) {
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  
  // Get unique patients
  const patients = useMemo(() => {
    const patientMap = new Map<string, { rut: string; name: string }>();
    documents.forEach(doc => {
      if (!patientMap.has(doc.RUT_paciente)) {
        patientMap.set(doc.RUT_paciente, {
          rut: doc.RUT_paciente,
          name: doc.nombre_paciente
        });
      }
    });
    return Array.from(patientMap.values());
  }, [documents]);
  
  // Get selected patient documents
  const patientDocs = useMemo(() => {
    if (!selectedPatient) return [];
    return documents.filter(doc => doc.RUT_paciente === selectedPatient);
  }, [documents, selectedPatient]);
  
  const patientStats = useMemo(() => {
    if (patientDocs.length === 0) return null;
    
    const uniqueDoctors = new Set(patientDocs.map(d => d.RUT_medico)).size;
    const totalPrestaciones = patientDocs.reduce((sum, doc) => sum + doc.prestaciones.length, 0);
    const errorCount = patientDocs.filter(d => d.error).length;
    
    return {
      name: patientDocs[0].nombre_paciente,
      rut: patientDocs[0].RUT_paciente,
      totalDocs: patientDocs.length,
      uniqueDoctors,
      totalPrestaciones,
      errorCount
    };
  }, [patientDocs]);
  
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length >= 2 
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : parts[0][0];
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">👥 Búsqueda de Pacientes</h2>
      
      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger>
                  <SelectValue placeholder="Buscar paciente por RUT o nombre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Seleccionar paciente...</SelectItem>
                  {patients.map(patient => (
                    <SelectItem key={patient.rut} value={patient.rut}>
                      {patient.rut} - {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button className="w-full" disabled={!selectedPatient}>
                <Search className="w-4 h-4 mr-2" />
                Buscar Paciente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Patient Profile */}
      {patientStats && (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600">
                  <AvatarFallback className="text-white text-2xl font-bold">
                    {getInitials(patientStats.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold">{patientStats.name}</h3>
                  <div className="mt-2 space-y-1 text-gray-600">
                    <p><strong>RUT:</strong> {patientStats.rut} | <strong>Edad:</strong> 45 años | <strong>Sexo:</strong> Femenino</p>
                    <p><strong>Último documento:</strong> {patientDocs[0].fecha_examen} | <strong>Total documentos:</strong> {patientStats.totalDocs}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-[#667eea]" />
                <p className="text-2xl font-bold">{patientStats.totalDocs}</p>
                <p className="text-sm text-gray-600">Documentos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{patientStats.uniqueDoctors}</p>
                <p className="text-sm text-gray-600">Médicos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Pill className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">{patientStats.totalPrestaciones}</p>
                <p className="text-sm text-gray-600">Prestaciones</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <p className="text-2xl font-bold">{patientStats.errorCount}</p>
                <p className="text-sm text-gray-600">Errores</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-gray-600">Meses de historial</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>📅 Historial de Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientDocs.slice(0, 10).map((doc, index) => {
                  const date = new Date(doc.date_time);
                  const dateStr = date.toLocaleDateString('es-ES', { 
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  
                  return (
                    <div 
                      key={doc.document_id}
                      className={`border-l-4 pl-4 ${
                        doc.error ? 'border-red-500' : 'border-primary'
                      }`}
                    >
                      <p className="text-sm text-gray-600">{dateStr}</p>
                      <p className="font-semibold">{doc.tipo_documento}</p>
                      <p className="text-sm text-gray-600">{doc.nombre_medico}</p>
                      {doc.error && (
                        <Badge variant="destructive" className="mt-1">
                          Error en procesamiento
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}