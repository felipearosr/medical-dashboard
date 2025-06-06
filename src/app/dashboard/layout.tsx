import { Navigation } from '@/components/dashboard/Navigation';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-semibold flex items-center gap-3">
            <span>🏥</span>
            Medical Documents Dashboard
          </h1>
          <p className="mt-1 text-purple-100">
            Sistema de Procesamiento de Documentos Médicos
          </p>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-gray-600 border-t bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <p className="text-sm">
            Medical Documents Dashboard v1.0 | Última actualización: {new Date().toLocaleTimeString('es-ES')}
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
            >
              Exportar Datos
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              Actualizar
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
} 