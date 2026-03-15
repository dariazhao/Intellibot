'use client';

import { useState } from 'react';
import { CompetitorCard } from './competitor-card';
import { CompetitorDetailSheet } from './competitor-detail-sheet';
import type { Competitor } from '@/lib/schemas';

interface CompetitorGridProps {
  competitors: Competitor[];
}

export function CompetitorGrid({ competitors }: CompetitorGridProps) {
  const [selected, setSelected] = useState<Competitor | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitors.map((comp, i) => (
          <CompetitorCard
            key={comp.id}
            competitor={comp}
            index={i}
            onClick={() => setSelected(comp)}
          />
        ))}
      </div>
      <CompetitorDetailSheet
        competitor={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
