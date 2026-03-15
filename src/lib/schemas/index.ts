import { z } from "zod";

// ── Account ──────────────────────────────────────────────────────────────────

export const AiMaturitySchema = z.object({
  dataInfrastructure: z.number().min(0).max(100),
  mlOps: z.number().min(0).max(100),
  genaiAdoption: z.number().min(0).max(100),
  aiGovernance: z.number().min(0).max(100),
  talent: z.number().min(0).max(100),
});

export const AccountSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  industry: z.string(),
  logo: z.string(),
  arr: z.number(),
  renewalDate: z.string(),
  healthScore: z.number().min(0).max(100),
  assignedAE: z.string(),
  stage: z.enum(["prospect", "customer", "expansion"]),
  aiMaturity: AiMaturitySchema,
});

export type AiMaturity = z.infer<typeof AiMaturitySchema>;
export type Account = z.infer<typeof AccountSchema>;

// ── Competitor ───────────────────────────────────────────────────────────────

export const CompetitorNewsSchema = z.object({
  title: z.string(),
  date: z.string(),
  sentiment: z.enum(["positive", "negative", "neutral"]),
});

export const CompetitorSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  positioning: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  threatLevel: z.enum(["high", "medium", "low"]),
  recentNews: z.array(CompetitorNewsSchema),
  trendData: z.array(z.number()),
  features: z.record(z.string(), z.enum(["full", "partial", "none"])),
});

export type CompetitorNews = z.infer<typeof CompetitorNewsSchema>;
export type Competitor = z.infer<typeof CompetitorSchema>;

// ── Activity ─────────────────────────────────────────────────────────────────

export const ActivitySchema = z.object({
  id: z.string(),
  accountId: z.string(),
  type: z.enum([
    "gong_call",
    "marketo_email",
    "salesforce_meeting",
    "salesforce_note",
    "competitor_alert",
  ]),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  metadata: z.record(z.string(), z.string()),
});

export type Activity = z.infer<typeof ActivitySchema>;

// ── Competitor Signal ────────────────────────────────────────────────────────

export const CompetitorSignalSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  competitorId: z.string(),
  signalType: z.enum([
    "mentioned_in_call",
    "seen_in_deal",
    "tech_stack_detected",
    "job_posting",
  ]),
  detail: z.string(),
  date: z.string(),
  threatLevel: z.enum(["high", "medium", "low"]),
});

export type CompetitorSignal = z.infer<typeof CompetitorSignalSchema>;

// ── Battlecard Template ──────────────────────────────────────────────────────

export const BattlecardSlideSchema = z.object({
  title: z.string(),
  bullets: z.array(z.string()),
  speakerNotes: z.string(),
});

export const BattlecardTemplateSchema = z.object({
  id: z.string(),
  competitorId: z.string(),
  tone: z.enum(["executive", "technical", "procurement"]),
  moduleType: z.enum([
    "feature_comparison",
    "pricing",
    "customer_stories",
    "roadmap",
  ]),
  slides: z.array(BattlecardSlideSchema),
});

export type BattlecardSlide = z.infer<typeof BattlecardSlideSchema>;
export type BattlecardTemplate = z.infer<typeof BattlecardTemplateSchema>;

// ── G2 Review ────────────────────────────────────────────────────────────────

export const G2ReviewSchema = z.object({
  id: z.string(),
  competitorId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string(),
  pros: z.string(),
  cons: z.string(),
  date: z.string(),
});

export type G2Review = z.infer<typeof G2ReviewSchema>;

// ── Gong Transcript ─────────────────────────────────────────────────────────

export const GongTranscriptSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  title: z.string(),
  date: z.string(),
  summary: z.string(),
  goals: z.array(z.string()),
  gaps: z.array(z.string()),
  competitorsMentioned: z.array(z.string()),
});

export type GongTranscript = z.infer<typeof GongTranscriptSchema>;

// ── Marketo Event ────────────────────────────────────────────────────────────

export const MarketoEventSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  type: z.enum([
    "email_open",
    "webinar_attended",
    "content_downloaded",
    "form_filled",
  ]),
  title: z.string(),
  date: z.string(),
  score: z.number(),
});

export type MarketoEvent = z.infer<typeof MarketoEventSchema>;

// ── Product Release ──────────────────────────────────────────────────────────

export const ProductReleaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  description: z.string(),
  category: z.string(),
});

export type ProductRelease = z.infer<typeof ProductReleaseSchema>;

// ── Roadmap Item ─────────────────────────────────────────────────────────────

export const RoadmapItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  quarter: z.string(),
  description: z.string(),
  status: z.enum(["planned", "in_progress", "completed"]),
});

export type RoadmapItem = z.infer<typeof RoadmapItemSchema>;
