'use client';

import Link from 'next/link';
import type { Account } from '@/lib/schemas';

interface AccountsTableProps {
  accounts: Account[];
}

export function AccountsTable({ accounts }: AccountsTableProps) {
  const sorted = [...accounts].sort((a, b) => b.arr - a.arr);

  return (
    <div className="widget-card widget-purple">
      <div className="widget-card-header">
        <span>Account Portfolio</span>
        <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground">
          {accounts.length} accounts
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="dd-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Industry</th>
              <th className="text-right">ARR</th>
              <th className="text-right">Health</th>
              <th>Stage</th>
              <th>AE</th>
              <th>Renewal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(account => (
              <tr key={account.id} className="cursor-pointer">
                <td>
                  <Link href={`/account/${account.slug}`} className="flex items-center gap-2 hover:text-[#a78bfa] transition-colors">
                    <span>{account.logo}</span>
                    <span className="font-medium">{account.name}</span>
                  </Link>
                </td>
                <td className="text-muted-foreground">{account.industry}</td>
                <td className="text-right font-mono text-[13px]">
                  ${(account.arr / 1_000_000).toFixed(1)}M
                </td>
                <td className="text-right">
                  <HealthIndicator score={account.healthScore} />
                </td>
                <td>
                  <StagePill stage={account.stage} />
                </td>
                <td className="text-muted-foreground text-[12px]">{account.assignedAE}</td>
                <td className="text-muted-foreground text-[12px]">
                  {new Date(account.renewalDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </td>
                <td>
                  <Link
                    href={`/account/${account.slug}/battlecard`}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium bg-[#632CA6]/15 text-[#a78bfa] hover:bg-[#632CA6]/30 transition-colors whitespace-nowrap"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Battlecard
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HealthIndicator({ score }: { score: number }) {
  const color =
    score >= 75 ? '#2ca66c' :
    score >= 50 ? '#e5a00d' :
    '#da545b';

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="w-12 h-1.5 rounded-full bg-[#2a2548] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[12px] font-mono w-6 text-right" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

function StagePill({ stage }: { stage: string }) {
  const styles: Record<string, string> = {
    prospect: 'bg-[#1a8dff]/15 text-[#1a8dff]',
    customer: 'bg-[#2ca66c]/15 text-[#2ca66c]',
    expansion: 'bg-[#632CA6]/15 text-[#a78bfa]',
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${styles[stage] || ''}`}>
      {stage}
    </span>
  );
}
