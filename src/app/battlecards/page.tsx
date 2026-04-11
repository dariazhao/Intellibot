import Link from 'next/link';
import { getAccounts, getCompetitors } from '@/lib/dal';
import { HowItWorksLink } from './how-it-works-link';

export default async function BattlecardsPage() {
  const [accounts, competitors] = await Promise.all([
    getAccounts(),
    getCompetitors(),
  ]);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Battlecards</h1>
        <p className="text-muted-foreground mt-1">
          Generate on-demand competitive battlecards for any account
        </p>
      </div>

      {/* Account cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <div
            key={account.slug}
            className="rounded-xl border border-border bg-card p-5 hover:border-border/80 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{account.logo}</span>
              <div>
                <div className="font-semibold">{account.name}</div>
                <div className="text-xs text-muted-foreground">{account.industry}</div>
              </div>
              <span
                className={`ml-auto text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  account.stage === 'customer'
                    ? 'bg-green-500/15 text-green-600'
                    : account.stage === 'expansion'
                    ? 'bg-blue-500/15 text-blue-600'
                    : 'bg-amber-500/15 text-amber-600'
                }`}
              >
                {account.stage.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-muted-foreground">
                Health: <span className="font-medium text-foreground">{account.healthScore}%</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/account/${account.slug}/battlecard?coach=1`}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-secondary/40 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-violet-400/40 hover:bg-violet-500/5 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                Deal Coach
              </Link>
              <Link
                href={`/account/${account.slug}/battlecard`}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/15 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Battlecard
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Competitors summary */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Active Competitors</h2>
        <div className="flex flex-wrap gap-2">
          {competitors.map((c) => (
            <span
              key={c.id}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
                c.threatLevel === 'high'
                  ? 'border-red-500/30 bg-red-500/10 text-red-500'
                  : c.threatLevel === 'medium'
                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-500'
                  : 'border-muted bg-secondary text-muted-foreground'
              }`}
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>

      <HowItWorksLink />
    </div>
  );
}
