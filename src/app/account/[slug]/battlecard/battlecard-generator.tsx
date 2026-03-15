'use client';

import { ConfigPanel, type BattlecardConfig } from '@/components/battlecard/config-panel';
import { SlideViewer } from '@/components/battlecard/slide-viewer';
import { useStreamingText } from '@/hooks/use-streaming-text';
import type { Account, Competitor } from '@/lib/schemas';

interface BattlecardGeneratorProps {
  account: Account;
  competitors: Competitor[];
}

export function BattlecardGenerator({ account, competitors }: BattlecardGeneratorProps) {
  const { text, isStreaming, startStreaming, reset } = useStreamingText();

  const handleGenerate = (config: BattlecardConfig) => {
    reset();
    startStreaming('/api/battlecard', {
      ...config,
      accountSlug: account.slug,
    });
  };

  const handleRegenerate = () => {
    // Re-trigger with same or slightly different config
    // For demo, just reset and the user clicks generate again
    reset();
  };

  return (
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
  );
}
