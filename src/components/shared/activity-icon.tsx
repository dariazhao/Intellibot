interface ActivityIconProps {
  type: string;
  className?: string;
}

export function ActivityIcon({ type, className = '' }: ActivityIconProps) {
  const configs: Record<string, { emoji: string; bg: string }> = {
    gong_call: { emoji: '\uD83D\uDCDE', bg: 'bg-purple-500/10' },
    marketo_email: { emoji: '\uD83D\uDCE7', bg: 'bg-blue-500/10' },
    salesforce_meeting: { emoji: '\uD83D\uDCC5', bg: 'bg-green-500/10' },
    salesforce_note: { emoji: '\uD83D\uDCDD', bg: 'bg-yellow-500/10' },
    competitor_alert: { emoji: '\u26A0\uFE0F', bg: 'bg-red-500/10' },
  };

  const config = configs[type] || { emoji: '\uD83D\uDCC4', bg: 'bg-gray-500/10' };

  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.bg} ${className}`}>
      <span className="text-sm">{config.emoji}</span>
    </div>
  );
}
