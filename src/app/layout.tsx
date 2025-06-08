// app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/dashboard/Navigation'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Medical Documents Dashboard',
  description: 'Sistema de Procesamiento de Documentos Médicos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

          {/* Footer */}
          <footer className="mt-16 py-8 text-center text-gray-600 border-t bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-sm">
                Medical Documents Dashboard v1.0 | Última actualización:{' '}
                {new Date().toLocaleTimeString('es-ES')}
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <Button variant="outline" size="sm">
                  Exportar Datos
                </Button>
                <Button variant="outline" size="sm">
                  Actualizar
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}