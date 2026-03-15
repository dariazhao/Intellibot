'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { StreamingText } from '@/components/shared/streaming-text';
import { SlideShimmer } from '@/components/shared/loading-shimmer';

interface SlideViewerProps {
  streamedText: string;
  isStreaming: boolean;
  onRegenerate: () => void;
  slideCount: number;
}

interface ParsedSlide {
  title: string;
  bullets: string[];
  speakerNotes: string;
  raw: string;
}

function parseSlides(text: string): ParsedSlide[] {
  const slideBlocks = text.split(/---SLIDE \d+---/).filter(Boolean);
  return slideBlocks.map(block => {
    const lines = block.trim().split('\n').filter(Boolean);
    const title = (lines.find(l => l.startsWith('# ')) || '').replace(/^# /, '');
    const notesStart = lines.findIndex(l => l.includes('[Speaker Notes]'));
    const bullets = lines
      .filter((l, i) => l.startsWith('\u2022') && (notesStart === -1 || i < notesStart))
      .map(l => l.replace(/^\u2022 /, ''));
    const speakerNotes = notesStart >= 0
      ? lines.slice(notesStart + 1).join(' ').trim()
      : '';
    return { title, bullets, speakerNotes, raw: block };
  });
}

export function SlideViewer({ streamedText, isStreaming, onRegenerate, slideCount }: SlideViewerProps) {
  const slides = useMemo(() => parseSlides(streamedText), [streamedText]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(streamedText);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopySlide = async (index: number, slide: ParsedSlide) => {
    const text = `${slide.title}\n\n${slide.bullets.map(b => `\u2022 ${b}`).join('\n')}\n\nSpeaker Notes: ${slide.speakerNotes}`;
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!streamedText && !isStreaming) {
    return null;
  }

  // Show shimmer placeholders for slides not yet received
  if (isStreaming && slides.length === 0) {
    return (
      <div className="space-y-6">
        <GenerationProgress />
        {Array.from({ length: slideCount }).map((_, i) => (
          <SlideShimmer key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Generation progress (only during streaming) */}
      {isStreaming && <GenerationProgress />}

      {/* Export toolbar */}
      {slides.length > 0 && !isStreaming && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Button variant="outline" size="sm" onClick={handleCopyAll}>
            {copiedIndex === -1 ? 'Copied' : 'Copy All'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => alert('PDF download would trigger here')}>
            Download PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => alert('Share link copied!')}>
            Share Link
          </Button>
          <Button variant="outline" size="sm" onClick={() => alert('Opening in Slides...')}>
            Open in Slides
          </Button>
        </motion.div>
      )}

      {/* Slides */}
      <AnimatePresence mode="popLayout">
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <div className="slide-16-9 rounded-xl border border-border bg-gradient-to-br from-card to-card/80 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <h2 className="text-xl md:text-2xl font-bold">
                  <StreamingText text={slide.title} isStreaming={isStreaming && i === slides.length - 1} />
                </h2>
                <ul className="space-y-3">
                  {slide.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Slide number */}
              <div className="absolute bottom-4 right-6 text-xs text-muted-foreground/50">
                Slide {i + 1}
              </div>
            </div>

            {/* Speaker notes + actions */}
            <div className="flex items-start gap-3">
              <div className="flex-1">
                {slide.speakerNotes && (
                  <Accordion>
                    <AccordionItem value="notes" className="border-border">
                      <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground py-2">
                        Speaker Notes
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {slide.speakerNotes}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => handleCopySlide(i, slide)}>
                  {copiedIndex === i ? 'Copied' : 'Copy'}
                </Button>
                <Button variant="ghost" size="sm" onClick={onRegenerate}>
                  Regenerate
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Shimmer for remaining slides during streaming */}
      {isStreaming && slides.length < slideCount && (
        <>
          {Array.from({ length: slideCount - slides.length }).map((_, i) => (
            <SlideShimmer key={`shimmer-${i}`} />
          ))}
        </>
      )}
    </div>
  );
}

function GenerationProgress() {
  const steps = [
    'Analyzing account data...',
    'Scanning competitive landscape...',
    'Crafting talk track...',
    'Generating slides...',
  ];

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.8 }}
          className="flex items-center gap-2 text-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.8 + 0.3 }}
            className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
          </motion.div>
          <span className="text-muted-foreground">{step}</span>
        </motion.div>
      ))}
    </div>
  );
}
