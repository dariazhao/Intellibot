'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

interface GenerateCtaProps {
  accountSlug: string;
}

export function GenerateCta({ accountSlug }: GenerateCtaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="sticky bottom-6 z-40"
    >
      <div className="gradient-border p-[1px] rounded-xl">
        <div className="bg-card rounded-xl px-5 py-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">Ready to win this deal?</div>
            <div className="text-xs text-muted-foreground mt-0.5">Generate slides or get AI coaching for this account</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/account/${accountSlug}/battlecard?coach=1`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
              Deal Coach
            </Link>
            <Link
              href={`/account/${accountSlug}/battlecard`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Battlecard
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
