import { NextRequest } from 'next/server';
import { createMockStreamResponse } from '@/lib/ai/mock-provider';
import { composeBattlecardContent, formatSlideAsText } from '@/lib/ai/stream-utils';
import { battlecardTemplates } from '@/lib/data/battlecard-templates';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { competitorIds, slideCount = 3, tone = 'executive', modules = [] } = body;

  // Gather templates for all selected competitors
  const templates = battlecardTemplates.filter(t =>
    competitorIds.includes(t.competitorId)
  );

  const { slides } = composeBattlecardContent(templates, {
    competitorIds,
    slideCount,
    tone,
    modules,
  });

  // Format all slides into a single streamable text
  const fullText = slides.map((s, i) => formatSlideAsText(s, i)).join('\n\n');

  return createMockStreamResponse(fullText, 20);
}
