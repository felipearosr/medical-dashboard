import { Analytics } from '@/components/views/Analytics';
import { loadData } from '@/lib/data';

export default async function AnalyticsPage() {
  const { documents, stats } = await loadData();

  return <Analytics documents={documents} stats={stats} />;
} 