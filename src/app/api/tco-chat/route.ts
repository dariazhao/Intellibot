import type { NextRequest } from 'next/server';
import { createMockStreamResponse } from '@/lib/ai/mock-provider';
import { accounts } from '@/lib/data/accounts';
import { competitors } from '@/lib/data/competitors';

type PricingModel = 'seat_based' | 'usage_based' | 'hybrid' | 'flat_rate';

interface ParsedParams {
  accountId: string;
  accountName: string;
  seats: number;
  contractTermYears: 1 | 3 | 5;
  pricingModel: PricingModel;
  competitorIds: string[];
  competitorNames: string[];
  confidence: Record<string, 'found' | 'defaulted'>;
}

function parseMessage(message: string): ParsedParams {
  const lower = message.toLowerCase();
  const confidence: Record<string, 'found' | 'defaulted'> = {};

  // Account matching — split name into tokens, match any meaningful token
  let accountId = '';
  let accountName = '';
  for (const acct of accounts) {
    const tokens = acct.name.toLowerCase().split(/\s+/).filter(t => t.length > 3);
    if (tokens.some(token => lower.includes(token))) {
      accountId = acct.id;
      accountName = acct.name;
      confidence.account = 'found';
      break;
    }
  }
  if (!accountId) confidence.account = 'defaulted';

  // Seat count — look for N seats/users/licenses/people
  let seats = 250;
  const seatMatch = lower.match(/(\d{2,4})\s*(seats?|users?|licenses?|reps?|people)/);
  if (seatMatch) {
    seats = parseInt(seatMatch[1]);
    confidence.seats = 'found';
  } else {
    confidence.seats = 'defaulted';
  }

  // Contract term — N year(s) or Nyr
  let contractTermYears: 1 | 3 | 5 = 3;
  const termMatch = lower.match(/(\d)\s*-?\s*years?|(\d)\s*yr/);
  if (termMatch) {
    const n = parseInt(termMatch[1] ?? termMatch[2]);
    contractTermYears = n === 1 ? 1 : n >= 5 ? 5 : 3;
    confidence.contractTerm = 'found';
  } else {
    confidence.contractTerm = 'defaulted';
  }

  // Pricing model — keyword detection
  let pricingModel: PricingModel = 'seat_based';
  if (/usage|consumption|pay.as.you|compute.hour/.test(lower)) {
    pricingModel = 'usage_based';
    confidence.pricingModel = 'found';
  } else if (/hybrid|base.plus|base fee/.test(lower)) {
    pricingModel = 'hybrid';
    confidence.pricingModel = 'found';
  } else if (/flat.?rate|all.?inclusive|enterprise flat/.test(lower)) {
    pricingModel = 'flat_rate';
    confidence.pricingModel = 'found';
  } else if (/per.?seat|seat.?based|per.?user/.test(lower)) {
    pricingModel = 'seat_based';
    confidence.pricingModel = 'found';
  } else {
    confidence.pricingModel = 'defaulted';
  }

  // Competitor matching
  const keywordMap: Record<string, string[]> = {
    'comp-a': ['synthetica'],
    'comp-b': ['datavault', 'data vault'],
    'comp-c': ['openml', 'open ml'],
    'comp-d': ['lakehouse'],
    'comp-e': ['neuraledge', 'neural edge'],
    'comp-f': ['clearview', 'clear view'],
  };

  let competitorIds: string[] = [];
  if (/all competitors|everyone|all of them/.test(lower)) {
    competitorIds = competitors.map(c => c.id);
    confidence.competitors = 'found';
  } else if (/high.?threat|top threats|biggest threats/.test(lower)) {
    competitorIds = competitors.filter(c => c.threatLevel === 'high').map(c => c.id);
    confidence.competitors = 'found';
  } else {
    for (const [id, kws] of Object.entries(keywordMap)) {
      if (kws.some(kw => lower.includes(kw))) competitorIds.push(id);
    }
    if (competitorIds.length > 0) {
      confidence.competitors = 'found';
    } else {
      competitorIds = competitors.filter(c => c.threatLevel === 'high').map(c => c.id);
      confidence.competitors = 'defaulted';
    }
  }

  const competitorNames = competitorIds
    .map(id => competitors.find(c => c.id === id)?.name ?? id);

  return {
    accountId, accountName, seats, contractTermYears,
    pricingModel, competitorIds, competitorNames, confidence,
  };
}

function formatPricingModel(m: PricingModel): string {
  return { seat_based: 'Per-seat', usage_based: 'Usage-based', hybrid: 'Hybrid', flat_rate: 'Flat-rate' }[m];
}

function buildCommentary(parsed: ParsedParams): string {
  const { accountId, accountName, seats, contractTermYears, pricingModel, competitorNames, confidence } = parsed;
  const acct = accounts.find(a => a.id === accountId);

  const accountLine = confidence.account === 'found' && acct
    ? `  Account .............. ${acct.name} ($${(acct.arr / 1_000_000).toFixed(1)}M ARR · ${acct.industry})`
    : `  Account .............. Not detected — no account pre-selected`;

  const seatsLine = confidence.seats === 'found'
    ? `  Seats ................ ${seats.toLocaleString()}`
    : `  Seats ................ ${seats.toLocaleString()} (defaulted)`;

  const termLine = confidence.contractTerm === 'found'
    ? `  Contract term ........ ${contractTermYears} year${contractTermYears > 1 ? 's' : ''}`
    : `  Contract term ........ ${contractTermYears} years (defaulted)`;

  const modelLine = confidence.pricingModel === 'found'
    ? `  Pricing model ........ ${formatPricingModel(pricingModel)}`
    : `  Pricing model ........ ${formatPricingModel(pricingModel)} (defaulted)`;

  const compLine = confidence.competitors === 'found'
    ? `  Competitors .......... ${competitorNames.join(', ')}`
    : `  Competitors .......... ${competitorNames.join(', ')} (defaulted to high-threat)`;

  return [
    'Parsing your deal parameters...\n',
    accountLine,
    seatsLine,
    termLine,
    modelLine,
    compLine,
    '\nAll parameters configured. Jumping to results...',
  ].join('\n');
}

export async function POST(req: NextRequest) {
  const { message } = await req.json() as { message: string };
  const parsed = parseMessage(message);
  const commentary = buildCommentary(parsed);

  const { accountId, seats, contractTermYears, pricingModel, competitorIds } = parsed;
  const params = { accountId, seats, contractTermYears, pricingModel, competitorIds };

  const fullText = commentary + '\n%%PARAMS%%' + JSON.stringify(params) + '%%END%%';

  return createMockStreamResponse(fullText, 15);
}
