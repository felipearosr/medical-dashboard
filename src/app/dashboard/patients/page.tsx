import { Patients } from '@/components/views/Patients';
import { loadData } from '@/lib/data';

export default async function PatientsPage() {
  const { documents } = await loadData();

  return <Patients documents={documents} />;
} 