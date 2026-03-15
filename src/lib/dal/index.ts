import { accounts } from "@/lib/data/accounts";
import { activities } from "@/lib/data/activities";
import { battlecardTemplates } from "@/lib/data/battlecard-templates";
import { competitorSignals } from "@/lib/data/competitor-signals";
import { competitors } from "@/lib/data/competitors";
import { g2Reviews } from "@/lib/data/g2-reviews";
import { gongTranscripts } from "@/lib/data/gong-transcripts";
import { marketoEvents } from "@/lib/data/marketo-events";
import { productReleases } from "@/lib/data/product-releases";
import { roadmapItems } from "@/lib/data/roadmap-items";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Accounts ─────────────────────────────────────────────────────────────────

export async function getAccounts() {
  await delay(300);
  return accounts;
}

export async function getAccountBySlug(slug: string) {
  await delay(250);
  return accounts.find((a) => a.slug === slug) ?? null;
}

export async function searchAccounts(query: string) {
  await delay(200);
  const lower = query.toLowerCase();
  return accounts.filter((a) => a.name.toLowerCase().includes(lower));
}

// ── Competitors ──────────────────────────────────────────────────────────────

export async function getCompetitors() {
  await delay(300);
  return competitors;
}

export async function getCompetitorById(id: string) {
  await delay(250);
  return competitors.find((c) => c.id === id) ?? null;
}

export async function getCompetitorsForAccount(accountId: string) {
  await delay(350);
  const competitorIds = [
    ...new Set(
      competitorSignals
        .filter((s) => s.accountId === accountId)
        .map((s) => s.competitorId)
    ),
  ];
  return competitors.filter((c) => competitorIds.includes(c.id));
}

// ── Activities ───────────────────────────────────────────────────────────────

export async function getActivitiesForAccount(accountId: string) {
  await delay(300);
  return activities
    .filter((a) => a.accountId === accountId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getRecentActivities(limit: number) {
  await delay(350);
  return activities
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// ── Competitor Signals ───────────────────────────────────────────────────────

export async function getSignalsForAccount(accountId: string) {
  await delay(300);
  return competitorSignals
    .filter((s) => s.accountId === accountId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── Gong Transcripts ─────────────────────────────────────────────────────────

export async function getGongTranscripts(accountId: string) {
  await delay(400);
  return gongTranscripts
    .filter((t) => t.accountId === accountId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── Marketo Events ───────────────────────────────────────────────────────────

export async function getMarketoEvents(accountId: string) {
  await delay(300);
  return marketoEvents
    .filter((e) => e.accountId === accountId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── G2 Reviews ───────────────────────────────────────────────────────────────

export async function getG2Reviews(competitorId: string) {
  await delay(350);
  return g2Reviews
    .filter((r) => r.competitorId === competitorId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── Battlecard Templates ─────────────────────────────────────────────────────

export async function getBattlecardTemplates(
  competitorId: string,
  tone?: string
) {
  await delay(400);
  return battlecardTemplates.filter(
    (t) =>
      t.competitorId === competitorId && (tone == null || t.tone === tone)
  );
}

// ── Product Releases ─────────────────────────────────────────────────────────

export async function getProductReleases() {
  await delay(250);
  return productReleases.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// ── Roadmap Items ────────────────────────────────────────────────────────────

export async function getRoadmapItems() {
  await delay(250);
  return roadmapItems;
}
