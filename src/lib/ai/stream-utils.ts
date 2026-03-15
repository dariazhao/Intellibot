import type { BattlecardTemplate } from '@/lib/schemas';

export interface BattlecardConfig {
  competitorIds: string[];
  slideCount: number;
  tone: 'executive' | 'technical' | 'procurement';
  modules: string[];
}

// Given templates and config, selects and formats slides into a single streamable text
export function composeBattlecardContent(
  templates: BattlecardTemplate[],
  config: BattlecardConfig
): {
  slides: Array<{ title: string; bullets: string[]; speakerNotes: string }>;
} {
  // Filter templates by tone preference, fall back to any if no match
  let filtered = templates.filter((t) => t.tone === config.tone);
  if (filtered.length === 0) filtered = templates;

  // Collect all slides from matching templates
  const allSlides = filtered.flatMap((t) => t.slides);

  // Shuffle and take slideCount
  const shuffled = [...allSlides].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, config.slideCount);

  return { slides: selected };
}

// Format a single slide as streamable text
export function formatSlideAsText(
  slide: { title: string; bullets: string[]; speakerNotes: string },
  index: number
): string {
  const parts = [
    `---SLIDE ${index + 1}---`,
    `# ${slide.title}`,
    '',
    ...slide.bullets.map((b) => `\u2022 ${b}`),
    '',
    `[Speaker Notes]`,
    slide.speakerNotes,
    '',
  ];
  return parts.join('\n');
}
