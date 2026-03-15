'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import type { Competitor } from '@/lib/schemas';

export interface BattlecardConfig {
  competitorIds: string[];
  slideCount: number;
  tone: 'executive' | 'technical' | 'procurement';
  modules: string[];
}

const TONES = [
  { value: 'executive' as const, label: 'Executive', desc: 'Board-level talking points' },
  { value: 'technical' as const, label: 'Technical', desc: 'Architecture & capabilities' },
  { value: 'procurement' as const, label: 'Procurement', desc: 'Pricing & compliance' },
];

const MODULES = [
  { value: 'feature_comparison', label: 'Feature Comparison' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'customer_stories', label: 'Customer Stories' },
  { value: 'roadmap', label: 'Roadmap' },
];

interface ConfigPanelProps {
  competitors: Competitor[];
  onGenerate: (config: BattlecardConfig) => void;
  isGenerating: boolean;
}

export function ConfigPanel({ competitors, onGenerate, isGenerating }: ConfigPanelProps) {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(
    competitors.slice(0, 2).map(c => c.id)
  );
  const [slideCount, setSlideCount] = useState(3);
  const [tone, setTone] = useState<'executive' | 'technical' | 'procurement'>('executive');
  const [selectedModules, setSelectedModules] = useState<string[]>(['feature_comparison']);

  const toggleCompetitor = (id: string) => {
    setSelectedCompetitors(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleModule = (value: string) => {
    setSelectedModules(prev =>
      prev.includes(value) ? prev.filter(x => x !== value) : [...prev, value]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl border border-border bg-card p-6 space-y-6"
    >
      <h3 className="font-semibold text-lg">Configure Battlecard</h3>

      {/* Competitor selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">Competitors</label>
        <div className="flex flex-wrap gap-2">
          {competitors.map(comp => (
            <button
              key={comp.id}
              onClick={() => toggleCompetitor(comp.id)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                selectedCompetitors.includes(comp.id)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50'
              }`}
            >
              {comp.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Slide count */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">Slides ({slideCount})</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(n => (
            <button
              key={n}
              onClick={() => setSlideCount(n)}
              className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                slideCount === n
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Tone selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">Tone</label>
        <div className="space-y-2">
          {TONES.map(t => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                tone === t.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary/50 hover:border-primary/50'
              }`}
            >
              <div className="text-sm font-medium">{t.label}</div>
              <div className="text-xs text-muted-foreground">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">Modules</label>
        <div className="flex flex-wrap gap-2">
          {MODULES.map(m => (
            <button
              key={m.value}
              onClick={() => toggleModule(m.value)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                selectedModules.includes(m.value)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <Button
        onClick={() => onGenerate({ competitorIds: selectedCompetitors, slideCount, tone, modules: selectedModules })}
        disabled={isGenerating || selectedCompetitors.length === 0}
        className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
      >
        {isGenerating ? 'Generating...' : 'Generate Battlecard'}
      </Button>
    </motion.div>
  );
}
