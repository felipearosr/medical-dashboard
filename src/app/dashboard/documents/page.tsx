import { Documents } from '@/components/views/Documents';
import { loadData } from '@/lib/data';

export default async function DocumentsPage() {
  const { documents } = await loadData();

  return <Documents documents={documents} />;
} 