import type { NextRequest } from 'next/server';
import { createMockStreamResponse } from '@/lib/ai/mock-provider';
import type { Account, Competitor } from '@/lib/schemas';

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (/\bprep\b|call prep|meeting|preparing|prepare for/.test(lower)) return 'prep';
  if (/risk|threat|competi|worried|pressure/.test(lower)) return 'risk';
  if (/battlecard|slide|talking points for|generate/.test(lower)) return 'battlecard';
  if (/objection|pushback|rebut|handling|counter/.test(lower)) return 'objection';
  if (/\btco\b|pricing|cost|budget|\bprice\b/.test(lower)) return 'tco';
  if (/renewal|renew|expand|expansion|upsell|grow/.test(lower)) return 'renewal';
  if (/health|status|overview|how is|summary/.test(lower)) return 'health';
  return 'general';
}

function fmt(arr: number): string {
  return arr >= 1_000_000 ? `$${(arr / 1_000_000).toFixed(1)}M` : `$${(arr / 1_000).toFixed(0)}K`;
}

function renewalStr(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function generateResponse(intent: string, account: Account, competitors: Competitor[]): string {
  const high = competitors.filter(c => c.threatLevel === 'high');
  const allNames = competitors.map(c => c.name).join(', ');
  const renewal = renewalStr(account.renewalDate);
  const healthLabel = account.healthScore >= 80 ? 'healthy' : account.healthScore >= 60 ? 'at moderate risk' : 'at high risk';
  const topComp = high[0] ?? competitors[0];
  const daysToRenewal = Math.ceil((new Date(account.renewalDate).getTime() - Date.now()) / 86_400_000);

  switch (intent) {
    case 'prep':
      return `Here's your pre-call brief for **${account.name}**:

**Account Context**
${account.logo} ${account.name} · ${account.industry} · ${fmt(account.arr)} ARR · ${account.stage} · Renewal ${renewal}
Health score ${account.healthScore}/100 (${healthLabel}). AE: ${account.assignedAE}.

**Active Competitive Signals**
${competitors.length > 0
  ? `${competitors.length} competitor${competitors.length > 1 ? 's' : ''} in play: ${allNames}.${high.length > 0 ? `\n**${high.map(c => c.name).join(' and ')}** ${high.length > 1 ? 'are' : 'is'} your highest-priority threat — come prepared to differentiate on ${high[0]?.weaknesses[0] ?? 'hidden costs and implementation risk'}.` : ''}`
  : 'No active competitive signals detected in recent calls.'}

**AI Maturity Profile**
Data Infrastructure ${account.aiMaturity.dataInfrastructure}/100 · ML Ops ${account.aiMaturity.mlOps}/100 · GenAI ${account.aiMaturity.genaiAdoption}/100 · Governance ${account.aiMaturity.aiGovernance}/100
${account.aiMaturity.genaiAdoption < 50
  ? 'GenAI adoption is nascent — significant expansion opportunity. Position use-case workshops early in the call.'
  : 'GenAI adoption is established. Shift the conversation from "should we?" to "how do we scale it safely?".'}

**Recommended Talk Track**
Lead with ${account.industry} benchmarks and peer outcomes. Anchor on the governance story — their AI Governance score (${account.aiMaturity.aiGovernance}/100) signals they care about auditability, not just speed.${topComp ? `\nWhen ${topComp.name} comes up: their biggest weakness is "${topComp.weaknesses[0]}" — use that as your pivot.` : ''}

**3 Discovery Questions to Ask**
1. "What would a successful deployment look like for your team 12 months from now?"
2. "How are you thinking about AI governance and audit trail requirements going forward?"
3. "What would need to be true for you to expand usage beyond the current team?"`;

    case 'risk':
      return `**Competitive Risk Assessment — ${account.name}**

${high.length > 0
  ? `**High-Threat Competitors Active in This Deal**\n${high.map(c =>
      `**${c.name}** (${c.positioning})\n  Strengths: ${c.strengths.slice(0, 2).join(', ')}\n  Your counter: "${c.weaknesses[0]}" — most-cited weakness in G2 reviews`
    ).join('\n\n')}`
  : 'No high-threat competitors currently flagged in this account.'}

**Account Vulnerability Factors**
${account.healthScore < 70
  ? `⚠️ Health score ${account.healthScore}/100 — below threshold. Engagement risk is elevated.`
  : `✓ Health score ${account.healthScore}/100 — account is relatively stable.`}
${account.aiMaturity.genaiAdoption < 40
  ? `⚠️ Low GenAI adoption (${account.aiMaturity.genaiAdoption}/100) — they may still be exploring alternatives before committing.`
  : `✓ Established GenAI adoption (${account.aiMaturity.genaiAdoption}/100) creates meaningful switching costs in your favor.`}
${account.stage === 'prospect'
  ? `⚠️ Prospect stage — no installed base advantage. Every competitive touchpoint matters.`
  : `✓ Existing ${account.stage} — relationship and usage history are assets. Use them.`}
${daysToRenewal < 90
  ? `⚠️ Renewal is ${daysToRenewal} days away — competitors will use this window to initiate conversations.`
  : `✓ ${daysToRenewal} days to renewal — enough runway to build executive alignment before the window opens.`}

**Recommended Mitigation**
1. Run a formal TCO analysis now — before a competitor does it for them
2. Surface ${account.industry} reference customers to build trust and reduce evaluation risk
3. Get multi-threaded at ${account.name} — single-threaded deals are the most vulnerable`;

    case 'battlecard':
      return `**Battlecard Strategy for ${account.name}**

**Recommended Competitors to Target**
${competitors.slice(0, 3).map((c, i) =>
  `${i + 1}. **${c.name}** (${c.threatLevel} threat) — ${c.positioning}`
).join('\n')}

**Best Tone for This Account**
${account.aiMaturity.dataInfrastructure > 70
  ? '**Technical** — strong data infrastructure maturity signals technical evaluators. Lead with depth, architecture, and integration specs.'
  : account.arr > 2_000_000
  ? '**Executive** — high ARR means exec buy-in is critical. Lead with business outcomes and 3-year ROI.'
  : '**Procurement** — focus on TCO, risk reduction, and contract flexibility.'}

**Key Modules to Include**
• Feature Comparison — direct contrast against ${topComp?.name ?? 'top competitor'}
• Pricing — TCO advantage over the full competitive field
• Customer Stories — ${account.industry} reference accounts specifically

**Go-To Differentiators for This Account**
1. AI governance and compliance (${account.aiMaturity.aiGovernance}/100 score — they prioritize this)
2. Enterprise security posture and data lineage
3. Total cost of ownership${topComp ? ` — especially ${topComp.name}'s hidden implementation and admin costs` : ''}

Use the Generate Battlecard panel to configure and run this now.`;

    case 'objection':
      return `**Objection Handling Guide — ${account.name}**

**"Your competitor has more AI features"**
Response: Feature breadth without governance creates compliance debt, especially in ${account.industry}. We prioritize auditable, production-ready AI over experimental capabilities.${topComp ? ` Ask them: has ${topComp.name} walked through their data lineage and audit trail story with you?` : ''}

**"The price is higher than alternatives"**
Response: Sticker price and TCO tell different stories. Factor in implementation time, admin overhead, and ${topComp ? `${topComp.name}'s` : 'competitor'} hidden compute costs — our 3-year TCO is typically 25–40% lower. Want me to run the numbers for this deal specifically?

**"We need more time to evaluate"**
Response: Understood — but what's the cost of delaying? For ${account.industry} teams, every quarter without optimized AI ops is a competitive gap. Let's co-define the evaluation criteria so you can move with confidence.

**"We have an existing relationship with ${topComp?.name ?? 'another vendor'}"**
Response: Relationships matter, but renewal is exactly the right moment to re-evaluate fit. Your needs have evolved since that initial selection. Let's map their current roadmap against your ${account.aiMaturity.genaiAdoption < 50 ? 'emerging GenAI requirements' : 'expanding AI program'}.

**"Our team needs to vet this more thoroughly"**
Response: Absolutely. Let's accelerate that with a technical deep-dive, a reference call with ${account.industry} customers, and a POC scoped to your top 3 use cases. Which of those would move fastest for your team?`;

    case 'tco':
      return `**TCO Talking Points — ${account.name}**

**The Headline**
For a ${account.industry} account at ${fmt(account.arr)} ARR, our platform typically delivers a **30–45% TCO advantage** over ${topComp?.name ?? 'leading competitors'} over 3 years when you include hidden costs.

**Where the Hidden Costs Live**
${topComp
  ? `**${topComp.name}** specifically:\n• Implementation: ~$${topComp.name === 'DataVault Enterprise' ? '120K' : '45–80K'} vs. our $25K\n• Admin overhead: ${topComp.name === 'DataVault Enterprise' ? '40%' : '25%'}+ FTE allocation vs. our 15%\n• Support: Premium tier required for SLA guarantees\n• Weakness: "${topComp.weaknesses[0]}" — translates directly to unplanned ops cost`
  : 'Hidden costs typically include: implementation complexity, admin FTE, support tiers, and downtime exposure.'}

**How to Frame This in the Deal**
1. Get their current annual platform spend early — anchor the conversation in their reality
2. Offer to run a joint TCO exercise — positions you as a trusted advisor, not just a vendor
3. Use the 3-year view, not annual — switching costs and compounding growth favor our model at scale

**Discovery Questions to Surface TCO**
• "How much time does your team spend on platform administration today?"
• "What was the actual implementation cost of your last enterprise deployment?"
• "Do you have full visibility into compute costs across your AI stack?"

→ Run the full TCO Calculator to generate a shareable analysis for ${account.name}.`;

    case 'renewal':
      return `**Renewal & Expansion Strategy — ${account.name}**

**Renewal Timeline**
${renewal} renewal — ${daysToRenewal < 90
  ? `⚠️ **${daysToRenewal} days away. Escalate urgency now.** Get executive alignment before the formal process starts.`
  : `${daysToRenewal} days out. Enough runway to build expansion momentum before the window opens.`}

**Expansion Opportunities**
${account.aiMaturity.genaiAdoption < 60 ? `• GenAI adoption at ${account.aiMaturity.genaiAdoption}/100 — significant whitespace for new use cases and team expansion` : '• Core platform is well-adopted — look for adjacent teams or divisions'}
${account.aiMaturity.mlOps < 70 ? `• MLOps maturity at ${account.aiMaturity.mlOps}/100 — upsell opportunity on ML monitoring and deployment tooling` : ''}
${account.aiMaturity.aiGovernance < 70 ? `• AI Governance at ${account.aiMaturity.aiGovernance}/100 — expand into compliance, audit, and policy modules` : ''}

**Renewal Risk Factors**
${account.healthScore < 70
  ? `⚠️ Health score ${account.healthScore}/100 — prioritize an executive business review before any commercial conversation.`
  : `✓ Health score ${account.healthScore}/100 — focus the renewal conversation on growth, not retention.`}
${competitors.length > 0
  ? `Competitive pressure from ${allNames}. They will use renewal as an entry point — get to your champion before the RFP opens.`
  : ''}

**Recommended Next Steps**
1. Schedule a QBR with ${account.assignedAE} and exec sponsor at ${account.name}
2. Build a value realization summary showing ROI since deployment
3. Bring 2–3 expansion use cases tied to their AI maturity gaps
4. Run a TCO comparison proactively — don't let a competitor define the cost story`;

    case 'health':
      return `**Account Health Overview — ${account.name}**

**Health Score: ${account.healthScore}/100** ${account.healthScore >= 80 ? '✓ Healthy' : account.healthScore >= 60 ? '⚠️ Moderate Risk' : '🔴 High Risk'}

**Snapshot**
${account.logo} ${account.name} · ${account.industry} · ${fmt(account.arr)} ARR · ${account.stage} · Renewal ${renewal}
AE: ${account.assignedAE} · ${daysToRenewal} days to renewal

**AI Maturity**
• Data Infrastructure: ${account.aiMaturity.dataInfrastructure}/100 ${account.aiMaturity.dataInfrastructure > 70 ? '✓' : '⚠️'}
• ML Ops: ${account.aiMaturity.mlOps}/100 ${account.aiMaturity.mlOps > 70 ? '✓' : '⚠️'}
• GenAI Adoption: ${account.aiMaturity.genaiAdoption}/100 ${account.aiMaturity.genaiAdoption > 50 ? '✓' : '⚠️'}
• AI Governance: ${account.aiMaturity.aiGovernance}/100 ${account.aiMaturity.aiGovernance > 70 ? '✓' : '⚠️'}
• Talent: ${account.aiMaturity.talent}/100 ${account.aiMaturity.talent > 60 ? '✓' : '⚠️'}

**Competitive Exposure**
${competitors.length > 0
  ? `${competitors.length} competitor${competitors.length > 1 ? 's' : ''} active: ${allNames}${high.length > 0 ? `\n**${high.map(c => c.name).join(', ')}** require active defense.` : '.'}`
  : 'No active competitive signals.'}

**Priority Actions**
${account.healthScore < 70
  ? '1. Schedule executive check-in immediately\n2. Review recent Gong calls for churn signals\n3. Prepare competitive defense materials and TCO analysis'
  : '1. Identify expansion opportunities tied to AI maturity gaps\n2. Build case study / reference request\n3. Plan renewal strategy — get ahead of the window'}`;

    default:
      return `I have full context on **${account.name}** — here's what I can help you with right now:

**Quick Actions**
• **Prep me for this call** — full brief with account context, competitive signals, and discovery questions
• **What's the competitive risk?** — threat assessment across ${competitors.length} active competitor${competitors.length !== 1 ? 's' : ''}
• **Help me handle objections** — ready-to-use responses for ${account.industry} accounts at this deal size
• **Build TCO talking points** — cost comparison framework for pricing conversations
• **What's my renewal strategy?** — expansion and retention playbook (renewal: ${renewal})

**Account Snapshot**
${account.logo} ${account.name} · ${fmt(account.arr)} ARR · ${account.stage} · Health ${account.healthScore}/100
${account.healthScore < 60 ? 'Showing risk signals — I\'d start with a health check or call prep.' : account.healthScore < 80 ? 'Moderate engagement — competitive risk and renewal strategy are good starting points.' : 'Healthy account — focus on expansion and renewal positioning.'}

What do you need most right now?`;
  }
}

export async function POST(req: NextRequest) {
  const { messages, account, competitors } = await req.json() as {
    messages: { role: string; content: string }[];
    account: Account;
    competitors: Competitor[];
  };

  const lastMessage = messages[messages.length - 1];
  const intent = detectIntent(lastMessage?.content ?? '');
  const response = generateResponse(intent, account, competitors);

  return createMockStreamResponse(response, 10);
}
