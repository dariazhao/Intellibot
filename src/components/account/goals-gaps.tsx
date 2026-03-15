'use client';

import { motion } from 'motion/react';
import type { GongTranscript } from '@/lib/schemas';

interface GoalsGapsProps {
  transcripts: GongTranscript[];
}

export function GoalsGaps({ transcripts }: GoalsGapsProps) {
  const allGoals = transcripts.flatMap(t => t.goals);
  const allGaps = transcripts.flatMap(t => t.gaps);
  // Deduplicate
  const goals = [...new Set(allGoals)];
  const gaps = [...new Set(allGaps)];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Customer Goals
        </h4>
        {goals.map((goal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="text-sm text-muted-foreground pl-4 border-l-2 border-green-500/30 py-1"
          >
            {goal}
          </motion.div>
        ))}
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Identified Gaps
        </h4>
        {gaps.map((gap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="text-sm text-muted-foreground pl-4 border-l-2 border-red-500/30 py-1"
          >
            {gap}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
