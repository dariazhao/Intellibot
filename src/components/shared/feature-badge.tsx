import { Badge } from '@/components/ui/badge';

export function FeatureBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    full: 'bg-green-500/10 text-green-500 border-green-500/20',
    partial: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    none: 'bg-red-500/10 text-red-500 border-red-500/20',
  };
  const labels: Record<string, string> = { full: 'Full', partial: 'Partial', none: 'None' };
  return (
    <Badge variant="outline" className={`text-xs ${styles[level] || ''}`}>
      {labels[level] || level}
    </Badge>
  );
}
