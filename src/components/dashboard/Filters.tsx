// components/dashboard/Filters.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export function Filters() {
  const [dateFrom, setDateFrom] = useState<Date>(new Date(2024, 10, 1));
  const [dateTo, setDateTo] = useState<Date>(new Date(2024, 10, 30));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-1">
          <Label htmlFor="periodo" className="text-xs font-semibold text-gray-600 uppercase">
            Período
          </Label>
          <Select defaultValue="current">
            <SelectTrigger id="periodo">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Mes Actual (Noviembre 2024)</SelectItem>
              <SelectItem value="last">Último Mes</SelectItem>
              <SelectItem value="last3">Últimos 3 Meses</SelectItem>
              <SelectItem value="year">Año 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-1">
          <Label className="text-xs font-semibold text-gray-600 uppercase">
            Rango de Fechas
          </Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateFrom && "text-gray-600"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "dd/MM") : "Desde"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={(date) => date && setDateFrom(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateTo && "text-gray-600"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "dd/MM") : "Hasta"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={(date) => date && setDateTo(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label htmlFor="tipo-doc" className="text-xs font-semibold text-gray-600 uppercase">
            Tipo de Documento
          </Label>
          <Select defaultValue="all">
            <SelectTrigger id="tipo-doc">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Tipos</SelectItem>
              <SelectItem value="solicitud">Solicitud de examen</SelectItem>
              <SelectItem value="resultados">Resultados</SelectItem>
              <SelectItem value="receta">Receta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="rut-medico" className="text-xs font-semibold text-gray-600 uppercase">
            RUT Médico
          </Label>
          <Input id="rut-medico" placeholder="12345678-9" />
        </div>

        <div>
          <Label htmlFor="rut-paciente" className="text-xs font-semibold text-gray-600 uppercase">
            RUT Paciente
          </Label>
          <Input id="rut-paciente" placeholder="98765432-1" />
        </div>

        <div className="flex items-end">
          <Button className="w-full bg-[#667eea] hover:bg-[#667eea]/90">
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}