'use client';

import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ThreatBadge } from '@/components/shared/threat-badge';
import { Sparkline } from '@/components/shared/sparkline';
import { getG2Reviews } from '@/lib/dal';
import type { Competitor, G2Review } from '@/lib/schemas';

interface CompetitorDetailSheetProps {
  competitor: Competitor | null;
  open: boolean;
  onClose: () => void;
}

export function CompetitorDetailSheet({ competitor, open, onClose }: CompetitorDetailSheetProps) {
  const [reviews, setReviews] = useState<G2Review[]>([]);

  useEffect(() => {
    if (competitor) {
      getG2Reviews(competitor.id).then(setReviews);
    }
  }, [competitor]);

  if (!competitor) return null;

  const featureEntries = Object.entries(competitor.features);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-card border-border">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-3">
            <span>{competitor.name}</span>
            <ThreatBadge level={competitor.threatLevel} />
          </SheetTitle>
          <p className="text-sm text-muted-foreground">{competitor.positioning}</p>
        </SheetHeader>

        <div className="space-y-6 pt-2">
          {/* Trend */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <span className="text-sm font-medium">Market Trend</span>
            <Sparkline data={competitor.trendData} isUp={competitor.trendData[11] > competitor.trendData[0]} />
          </div>

          {/* Strengths */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-green-400">Strengths</h4>
            <ul className="space-y-1.5">
              {competitor.strengths.map((s, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-red-400">Weaknesses</h4>
            <ul className="space-y-1.5">
              {competitor.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Feature Matrix */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Feature Matrix</h4>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {featureEntries.map(([feature, level]) => (
                    <tr key={feature} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 text-muted-foreground">{feature}</td>
                      <td className="px-3 py-2 text-right">
                        <FeatureBadge level={level} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent News */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Recent News</h4>
            <div className="space-y-2">
              {competitor.recentNews.map((news, i) => (
                <div key={i} className="p-3 rounded-lg bg-secondary/30 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm">{news.title}</span>
                    <SentimentDot sentiment={news.sentiment} />
                  </div>
                  <time className="text-xs text-muted-foreground">{news.date}</time>
                </div>
              ))}
            </div>
          </div>

          {/* G2 Review Summary */}
          {reviews.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                G2 Reviews
                <Badge variant="outline" className="text-xs">{avgRating} avg</Badge>
              </h4>
              <div className="space-y-3">
                {reviews.slice(0, 3).map(review => (
                  <div key={review.id} className="p-3 rounded-lg bg-secondary/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{review.title}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-xs ${i < review.rating ? 'text-yellow-400' : 'text-muted-foreground/30'}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-400">Pros:</span> {review.pros.substring(0, 100)}...
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-red-400">Cons:</span> {review.cons.substring(0, 100)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function FeatureBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    full: 'bg-green-500/10 text-green-400 border-green-500/20',
    partial: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    none: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  const labels: Record<string, string> = { full: 'Full', partial: 'Partial', none: 'None' };
  return (
    <Badge variant="outline" className={`text-xs ${styles[level] || ''}`}>
      {labels[level] || level}
    </Badge>
  );
}

function SentimentDot({ sentiment }: { sentiment: string }) {
  const colors: Record<string, string> = {
    positive: 'bg-green-500',
    negative: 'bg-red-500',
    neutral: 'bg-yellow-500',
  };
  return <div className={`w-2 h-2 rounded-full shrink-0 ${colors[sentiment] || 'bg-gray-500'}`} />;
}
