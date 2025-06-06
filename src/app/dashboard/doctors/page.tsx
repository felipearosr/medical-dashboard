import { Doctors } from '@/components/views/Doctors';
import { loadData } from '@/lib/data';

export default async function DoctorsPage() {
  const { documents } = await loadData();

  return <Doctors documents={documents} />;
} 