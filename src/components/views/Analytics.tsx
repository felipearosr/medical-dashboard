// components/views/Analytics.tsx

import React from 'react';
import { Document, MonthlyStats } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  BarChart3, 
  DollarSign, 
  Target,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface AnalyticsProps {
  documents: Document[];
  stats: MonthlyStats;
}

export function Analytics({ documents, stats }: AnalyticsProps) {
  const kpis = [
    { icon: <TrendingUp className="w-8 h-8" />, label: 'Crecimiento', value: '+23.5%', detail: 'vs año anterior' },
    { icon: <Zap className="w-8 h-8" />, label: 'Reducción Tiempo', value: '-18%', detail: '28ms → 23ms' },
    { icon: <CheckCircle className="w-8 h-8" />, label: 'Tasa Éxito', value: '94.2%', detail: '↑ 2.8%' },
    { icon: <BarChart3 className="w-8 h-8" />, label: 'Utilización', value: '87%', detail: '↑ 12%' },
    { icon: <DollarSign className="w-8 h-8" />, label: 'Ahorro', value: '$2.3M', detail: 'Este año' },
    { icon: <Target className="w-8 h-8" />, label: 'Precisión IA', value: '98.5%', detail: '↑ 3.2%' }
  ];

  const projections = [
    { period: 'Próximo Mes', value: '2,150 docs', confidence: '92%' },
    { period: 'Q1 2025', value: '6,800 docs', confidence: '85%' },
    { period: 'Fin 2025', value: '28,500 docs', confidence: '78%' }
  ];

  const insights = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Oportunidad de Crecimiento',
      description: 'El análisis muestra potencial para incrementar el procesamiento matutino en 20%.',
      type: 'success'
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'Optimización de Errores',
      description: 'Las recetas manuscritas presentan 3x más errores. Se recomienda OCR especializado.',
      type: 'warning'
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Patrón de Éxito',
      description: 'Documentos con Perfil Bioquímico + Hemograma tienen 99.2% de precisión.',
      type: 'info'
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: 'ROI Proyectado',
      description: 'El sistema generará un ahorro estimado de $3.2M en 2025.',
      type: 'success'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">📈 Analytics Avanzado</h2>
      
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3 text-[#667eea]">
                {kpi.icon}
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-sm font-semibold text-gray-600 mt-1">{kpi.label}</p>
              <p className="text-xs text-gray-500 mt-1">{kpi.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Projections */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🔮</span> Proyecciones y Tendencias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projections.map((proj, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm">{proj.period}</p>
                  <p className="text-3xl font-bold text-[#667eea] mt-2">{proj.value}</p>
                  <p className="text-sm text-gray-500 mt-1">Confianza: {proj.confidence}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Insights */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          Insights y Recomendaciones
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <Alert key={index} className={`
              ${insight.type === 'success' ? 'border-green-200 bg-green-50' : ''}
              ${insight.type === 'warning' ? 'border-yellow-200 bg-yellow-50' : ''}
              ${insight.type === 'info' ? 'border-blue-200 bg-blue-50' : ''}
            `}>
              <div className={`
                ${insight.type === 'success' ? 'text-green-600' : ''}
                ${insight.type === 'warning' ? 'text-yellow-600' : ''}
                ${insight.type === 'info' ? 'text-blue-600' : ''}
              `}>
                {insight.icon}
              </div>
              <AlertTitle className="ml-2">{insight.title}</AlertTitle>
              <AlertDescription className="ml-2 mt-1">
                {insight.description}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📊 Métricas de Rendimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Disponibilidad del Sistema</span>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Precisión de Clasificación</span>
                  <span className="text-sm font-medium">98.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Satisfacción de Usuario</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>🎯 Objetivos Q4 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm">Reducir tiempo de procesamiento a 20ms</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm">Alcanzar 95% de tasa de éxito</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                <span className="text-sm">Implementar análisis predictivo</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                <span className="text-sm">Integrar con sistemas externos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}