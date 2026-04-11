'use client';

import { useState } from 'react';
import { ConfigPanel, type BattlecardConfig } from '@/components/battlecard/config-panel';
import { SlideViewer } from '@/components/battlecard/slide-viewer';
import { DealCoachPanel } from '@/components/deal-coach/deal-coach-panel';
import { useStreamingText } from '@/hooks/use-streaming-text';
import type { Account, Competitor } from '@/lib/schemas';

interface BattlecardGeneratorProps {
  account: Account;
  competitors: Competitor[];
  initialCoachOpen?: boolean;
}

export function BattlecardGenerator({ account, competitors, initialCoachOpen = false }: BattlecardGeneratorProps) {
  const { text, isStreaming, startStreaming, reset } = useStreamingText();
  const [isDealCoachOpen, setIsDealCoachOpen] = useState(initialCoachOpen);

  const handleGenerate = (config: BattlecardConfig) => {
    reset();
    startStreaming('/api/battlecard', {
      ...config,
      accountSlug: account.slug,
    });
  };

  const handleRegenerate = () => {
    reset();
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <ConfigPanel
            competitors={competitors}
            onGenerate={handleGenerate}
            isGenerating={isStreaming}
          />
        </div>
        <div className="lg:col-span-8">
          <SlideViewer
            streamedText={text}
            isStreaming={isStreaming}
            onRegenerate={handleRegenerate}
            slideCount={3}
          />
          {!text && !isStreaming && (
            <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border text-muted-foreground">
              Configure and click Generate to create your battlecard
            </div>
          )}
        </div>
      </div>

      {/* Deal Coach floating button */}
      <button
        onClick={() => setIsDealCoachOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all text-sm font-semibold"
        style={{ display: isDealCoachOpen ? 'none' : 'flex' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
        </svg>
        Deal Coach
      </button>

      {/* Deal Coach panel */}
      <DealCoachPanel
        account={account}
        competitors={competitors}
        isOpen={isDealCoachOpen}
        onClose={() => setIsDealCoachOpen(false)}
      />
    </>
  );
}
