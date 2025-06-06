// app/dashboard/overview/page.tsx

import { Overview } from '@/components/views/Overview';
import { loadData } from '@/lib/data';

export default async function OverviewPage() {
  const { documents, stats } = await loadData();

  return <Overview documents={documents} stats={stats} />;
}