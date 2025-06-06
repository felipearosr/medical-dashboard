// components/dashboard/Header.tsx

import React from 'react';

export function Header() {
  return (
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
  );
}