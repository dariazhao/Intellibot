interface ThreatBadgeProps {
  level: 'high' | 'medium' | 'low';
}

const COLORS: Record<string, { bg: string; text: string }> = {
  high: { bg: '#da545b18', text: '#da545b' },
  medium: { bg: '#e5a00d18', text: '#e5a00d' },
  low: { bg: '#2ca66c18', text: '#2ca66c' },
};

export function ThreatBadge({ level }: ThreatBadgeProps) {
  const c = COLORS[level];
  return (
    <span
      className="inline-block px-1.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {level}
    </span>
  );
}
