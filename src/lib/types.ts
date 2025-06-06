// lib/types.ts

export interface Document {
  document_id: string;
  tipo_documento: string;
  clasificacion: string;
  nombre_paciente: string;
  RUT_paciente: string;
  nombre_medico: string;
  RUT_medico: string;
  fecha_examen: string;
  date_time: string;
  error: boolean;
  inference_time: number;
  message: string | null;
  prestaciones: Prestacion[];
}

export interface Prestacion {
  descripcion: string;
  codigo: string;
  score: number;
}

export interface MonthlyStats {
  total_documents: number;
  successful_documents: number;
  error_documents: number;
  error_rate: number;
  success_rate: number;
  avg_inference_time: number;
  total_patients: number;
  total_doctors: number;
  documents_by_type: Record<string, number>;
  documents_by_classification: Record<string, number>;
  daily_counts: Record<number, number>;
  errors_by_type: Record<string, number>;
}

export interface FilterState {
  periodo: string;
  fechaInicio: Date;
  fechaFin: Date;
  tipoDocumento: string;
  rutMedico: string;
  rutPaciente: string;
}

export interface Activity {
  time: string;
  title: string;
  detail: string;
  type: 'success' | 'error' | 'info';
}

export interface DoctorStats {
  rut: string;
  nombre: string;
  documentos: number;
  pacientes: number;
  tasaExito: number;
  tiempoPromedio: number;
}

export interface QuickAction {
  icon: string;
  label: string;
  action: string;
}