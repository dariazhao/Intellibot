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
      <Link href={`/account/${accountSlug}/battlecard`}>
        <div className="gradient-border p-[1px] rounded-xl">
          <div className="bg-card rounded-xl px-6 py-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
            <div>
              <div className="font-semibold">Generate Battlecard</div>
              <div className="text-sm text-muted-foreground">Create AI-powered competitive slides and talk tracks</div>
            </div>
            <div className="flex items-center gap-2 text-primary font-medium">
              Generate
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
