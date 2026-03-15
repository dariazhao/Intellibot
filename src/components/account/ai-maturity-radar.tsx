'use client';

import { motion } from 'motion/react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import type { AiMaturity } from '@/lib/schemas';

interface AiMaturityRadarProps {
  maturity: AiMaturity;
}

export function AiMaturityRadar({ maturity }: AiMaturityRadarProps) {
  const data = [
    { subject: 'Data Infra', value: maturity.dataInfrastructure, fullMark: 100 },
    { subject: 'ML Ops', value: maturity.mlOps, fullMark: 100 },
    { subject: 'GenAI', value: maturity.genaiAdoption, fullMark: 100 },
    { subject: 'Governance', value: maturity.aiGovernance, fullMark: 100 },
    { subject: 'Talent', value: maturity.talent, fullMark: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <h3 className="text-sm font-semibold mb-4">AI Maturity Radar</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="oklch(0.3 0.01 260)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="AI Maturity"
              dataKey="value"
              stroke="oklch(0.75 0.15 195)"
              fill="oklch(0.75 0.15 195)"
              fillOpacity={0.15}
              strokeWidth={2}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
