'use client';

import { motion } from 'motion/react';
import { HealthScoreRing } from '@/components/shared/health-score-ring';
import { Badge } from '@/components/ui/badge';
import type { Account } from '@/lib/schemas';

interface AccountHeaderProps {
  account: Account;
}

export function AccountHeader({ account }: AccountHeaderProps) {
  const stageBadgeColor = {
    prospect: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    customer: 'bg-green-500/10 text-green-400 border-green-500/20',
    expansion: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{account.logo}</div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{account.name}</h1>
              <Badge variant="outline" className={stageBadgeColor[account.stage]}>
                {account.stage.charAt(0).toUpperCase() + account.stage.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>{account.industry}</span>
              <span>·</span>
              <span>${(account.arr / 1_000_000).toFixed(1)}M ARR</span>
              <span>·</span>
              <span>Renews {new Date(account.renewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>AE: {account.assignedAE}</span>
            </div>
          </div>
        </div>
        <HealthScoreRing score={account.healthScore} size={80} />
      </div>
    </motion.div>
  );
}
