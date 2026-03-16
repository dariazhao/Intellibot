import Link from 'next/link';
import { getAccounts, getCompetitors } from '@/lib/dal';

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
          <Link
            key={account.slug}
            href={`/account/${account.slug}/battlecard`}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{account.logo}</span>
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">
                  {account.name}
                </div>
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
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Health: <span className="font-medium text-foreground">{account.healthScore}%</span>
              </span>
              <span className="flex items-center gap-1.5 text-primary text-xs font-medium">
                Generate Battlecard
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </span>
            </div>
          </Link>
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
    </div>
  );
}
