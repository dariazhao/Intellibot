'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type PricingModel = 'seat_based' | 'usage_based' | 'hybrid' | 'flat_rate';

export interface QuickStartParams {
  accountId: string;
  seats: number;
  contractTermYears: 1 | 3 | 5;
  pricingModel: PricingModel;
  competitorIds: string[];
}

interface TcoQuickStartProps {
  onParsed: (params: QuickStartParams) => void;
  onManual: () => void;
}

const EXAMPLE_PROMPTS = [
  'Meridian Financial, 300 seats, 3-year deal vs Synthetica AI and DataVault',
  'Apex Healthcare, usage-based pricing, competing with Lakehouse',
  'TitanForge Manufacturing, flat-rate, 5-year deal, all high-threat competitors',
];

export function TcoQuickStart({ onParsed, onManual }: TcoQuickStartProps) {
  const [input, setInput] = useState('');
  const [streamText, setStreamText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [parsedParams, setParsedParams] = useState<QuickStartParams | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((isStreaming || streamText) && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [streamText, isStreaming]);

  const handleSubmit = async () => {
    if (!input.trim() || isStreaming) return;
    setStreamText('');
    setIsDone(false);
    setParsedParams(null);
    setIsStreaming(true);

    try {
      const res = await fetch('/api/tco-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!res.body) throw new Error('No body');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        // Strip sentinel from display
        const displayText = accumulated.replace(/%%PARAMS%%[\s\S]*?%%END%%/, '');
        setStreamText(displayText);

        // Extract params when sentinel arrives
        const match = accumulated.match(/%%PARAMS%%([\s\S]*?)%%END%%/);
        if (match) {
          try {
            setParsedParams(JSON.parse(match[1]) as QuickStartParams);
          } catch {}
        }
      }

      setIsDone(true);
    } catch (err) {
      console.error('TCO chat error:', err);
      setIsDone(true);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      {/* Input card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-base">Describe your deal</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Tell me the account, seat count, contract length, and competitors. I&apos;ll configure the full TCO analysis and jump straight to results.
            </p>
          </div>
        </div>

        {/* Example chips */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Text input */}
        <div className="relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder="e.g. Apex Healthcare, 500 seats, 3-year deal, competing with Synthetica AI and DataVault Enterprise..."
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 pb-12 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 disabled:opacity-50 transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isStreaming}
            className="absolute right-3 bottom-3 flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            {isStreaming ? (
              <>
                <svg className="animate-spin" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                Parsing...
              </>
            ) : (
              <>
                Configure TCO
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground/70">Press Enter to submit</p>
          <button
            onClick={onManual}
            className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors"
          >
            Configure manually instead
          </button>
        </div>
      </div>

      {/* Streaming output */}
      <AnimatePresence>
        {(isStreaming || streamText) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {/* Status bar */}
            <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border bg-secondary/30">
              <span className={`w-2 h-2 rounded-full shrink-0 ${isStreaming ? 'bg-primary animate-pulse' : 'bg-green-500'}`} />
              <span className="text-xs font-medium text-muted-foreground">
                {isStreaming ? 'Analyzing deal parameters...' : 'Parameters configured'}
              </span>
            </div>

            {/* Output text */}
            <div
              ref={outputRef}
              className="p-5 font-mono text-sm text-foreground/90 whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed"
            >
              {streamText}
              {isStreaming && (
                <span className="inline-block w-[7px] h-[1.1em] bg-primary/70 animate-pulse ml-0.5 translate-y-[2px]" />
              )}
            </div>

            {/* Action bar after completion */}
            {isDone && parsedParams && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="px-5 py-3.5 border-t border-border bg-green-500/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Ready to run
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onManual}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Adjust manually
                  </button>
                  <button
                    onClick={() => onParsed(parsedParams)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    View TCO Results
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
