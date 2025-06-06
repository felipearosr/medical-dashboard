import { Prestaciones } from '@/components/views/Prestaciones';
import { loadData } from '@/lib/data';

export default async function PrestacionesPage() {
  const { documents } = await loadData();

  return <Prestaciones documents={documents} />;
} 