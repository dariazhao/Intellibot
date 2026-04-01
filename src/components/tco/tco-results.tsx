'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import type { VendorTcoResult } from './tco-wizard';
import type { Account, TcoCostProfile } from '@/lib/schemas';

// ── Colors ───────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Licensing: '#1a8dff',
  'Platform Fee': '#6c5ce7',
  'Implementation': '#e5a00d',
  'Data Migration': '#f2762e',
  'Training': '#17b8be',
  'Support': '#da545b',
  'Admin Labor': '#2ca66c',
  'Integrations': '#8b5cf6',
  'Customization': '#ec4899',
  'Downtime Impact': '#ef4444',
  'Supplemental Tooling': '#f59e0b',
};

const VENDOR_COLORS = ['#2ca66c', '#6c5ce7', '#1a8dff', '#e5a00d', '#da545b', '#17b8be', '#f2762e'];

// ── Formatting ───────────────────────────────────────────────────────────────

function fmtDollar(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function fmtDollarFull(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

function pctDiff(us: number, them: number): string {
  if (them === 0) return '—';
  const diff = ((them - us) / them) * 100;
  return `${diff > 0 ? '+' : ''}${diff.toFixed(0)}%`;
}

// ── Component ────────────────────────────────────────────────────────────────

interface TcoResultsProps {
  results: VendorTcoResult[];
  deal: { contractTermYears: number; seats: number; annualGrowthPct: number };
  selectedAccount?: Account;
  costProfiles: TcoCostProfile[];
}

export function TcoResults({ results, deal, selectedAccount, costProfiles }: TcoResultsProps) {
  const usResult = results.find(r => r.vendorType === 'us')!;
  const competitorResults = results.filter(r => r.vendorType !== 'us');
  const lowestCompetitorTco = Math.min(...competitorResults.map(r => r.totalTco));
  const savingsVsLowest = lowestCompetitorTco - usResult.totalTco;

  // Data for total TCO bar chart
  const totalChartData = results.map((r, i) => ({
    vendor: r.vendorName.length > 14 ? r.vendorName.slice(0, 14) + '...' : r.vendorName,
    fullName: r.vendorName,
    total: Math.round(r.totalTco),
    color: VENDOR_COLORS[i % VENDOR_COLORS.length],
    isUs: r.vendorType === 'us',
  }));

  // Data for stacked category breakdown
  const categoryBreakdownData = useMemo(() => {
    return results.map(r => {
      const totals: Record<string, number> = {};
      for (const yb of r.yearBreakdowns) {
        totals['Licensing'] = (totals['Licensing'] || 0) + yb.licensing;
        totals['Platform Fee'] = (totals['Platform Fee'] || 0) + yb.platformFee;
        totals['Implementation'] = (totals['Implementation'] || 0) + yb.implementation;
        totals['Data Migration'] = (totals['Data Migration'] || 0) + yb.dataMigration;
        totals['Training'] = (totals['Training'] || 0) + yb.training;
        totals['Support'] = (totals['Support'] || 0) + yb.support;
        totals['Admin Labor'] = (totals['Admin Labor'] || 0) + yb.admin;
        totals['Integrations'] = (totals['Integrations'] || 0) + yb.integrations;
        totals['Customization'] = (totals['Customization'] || 0) + yb.customization;
        totals['Downtime Impact'] = (totals['Downtime Impact'] || 0) + yb.downtime;
        totals['Supplemental Tooling'] = (totals['Supplemental Tooling'] || 0) + yb.supplementalTooling;
      }
      return {
        vendor: r.vendorName.length > 14 ? r.vendorName.slice(0, 14) + '...' : r.vendorName,
        fullName: r.vendorName,
        ...totals,
      };
    });
  }, [results]);

  // Categories that have non-zero values
  const activeCategories = useMemo(() => {
    const cats = new Set<string>();
    for (const item of categoryBreakdownData) {
      for (const [key, val] of Object.entries(item)) {
        if (key !== 'vendor' && key !== 'fullName' && typeof val === 'number' && val > 0) {
          cats.add(key);
        }
      }
    }
    return Array.from(cats);
  }, [categoryBreakdownData]);

  // Year-over-year data
  const yoyData = useMemo(() => {
    const years = Array.from({ length: deal.contractTermYears }, (_, i) => i + 1);
    return years.map(y => {
      const entry: Record<string, string | number> = { year: `Year ${y}` };
      for (const r of results) {
        const yb = r.yearBreakdowns[y - 1];
        const yearTotal = yb.licensing + yb.platformFee + yb.support + yb.admin +
          yb.integrations + yb.customization + yb.downtime + yb.supplementalTooling +
          yb.implementation + yb.dataMigration + yb.training;
        entry[r.vendorName] = Math.round(yearTotal);
      }
      return entry;
    });
  }, [results, deal.contractTermYears]);

  return (
    <div className="space-y-6">
      {/* Savings Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border-2 border-green-500/30 bg-green-500/5 p-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-green-500 mb-1">
              {savingsVsLowest > 0 ? 'Projected Savings with Our Platform' : 'Total Cost of Ownership'}
            </div>
            {savingsVsLowest > 0 ? (
              <div className="text-3xl font-bold text-green-500">
                {fmtDollarFull(savingsVsLowest)}
                <span className="text-lg font-medium text-green-500/70 ml-2">
                  saved over {deal.contractTermYears} {deal.contractTermYears === 1 ? 'year' : 'years'}
                </span>
              </div>
            ) : (
              <div className="text-3xl font-bold text-foreground">
                {fmtDollarFull(usResult.totalTco)}
                <span className="text-lg font-medium text-muted-foreground ml-2">
                  over {deal.contractTermYears} {deal.contractTermYears === 1 ? 'year' : 'years'}
                </span>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              {deal.seats} seats with {deal.annualGrowthPct}% annual growth
              {selectedAccount && <> for <span className="font-medium text-foreground">{selectedAccount.name}</span></>}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <div className="text-sm text-muted-foreground">Our TCO: <span className="font-mono font-semibold text-foreground">{fmtDollarFull(usResult.totalTco)}</span></div>
            {competitorResults.map(cr => (
              <div key={cr.vendorId} className="text-sm text-muted-foreground">
                {cr.vendorName}: <span className="font-mono font-semibold text-foreground">{fmtDollarFull(cr.totalTco)}</span>
                {cr.totalTco > usResult.totalTco && (
                  <span className="ml-1.5 text-green-500 text-xs font-semibold">
                    ({pctDiff(usResult.totalTco, cr.totalTco)} savings)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total TCO Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Total TCO Comparison ({deal.contractTermYears}-Year)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totalChartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis
                  type="number"
                  tick={{ fontSize: 11 }}
                  stroke="var(--muted-foreground)"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => fmtDollar(v)}
                />
                <YAxis
                  type="category"
                  dataKey="vendor"
                  tick={{ fontSize: 11 }}
                  stroke="var(--muted-foreground)"
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-lg bg-popover border border-border px-3 py-2 shadow-md text-xs">
                        <div className="font-medium text-foreground mb-1">{d.fullName}</div>
                        <div className="font-mono">{fmtDollarFull(d.total)}</div>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={28}>
                  {totalChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} fillOpacity={entry.isUs ? 1 : 0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Year-over-Year */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Year-over-Year Cost
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yoyData} margin={{ left: 10, right: 20 }}>
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 11 }}
                  stroke="var(--muted-foreground)"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="var(--muted-foreground)"
                  tickLine={false}
                  axisLine={false}
                  width={50}
                  tickFormatter={(v) => fmtDollar(v)}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-lg bg-popover border border-border px-3 py-2 shadow-md text-xs">
                        <div className="font-medium text-foreground mb-1">{label}</div>
                        {payload.map((p, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color as string }} />
                            <span className="text-muted-foreground">{p.name}:</span>
                            <span className="font-mono font-medium text-foreground">{fmtDollarFull(p.value as number)}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                />
                {results.map((r, i) => (
                  <Bar
                    key={r.vendorId}
                    dataKey={r.vendorName}
                    fill={VENDOR_COLORS[i % VENDOR_COLORS.length]}
                    radius={[3, 3, 0, 0]}
                    barSize={24}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Cost Breakdown Stacked Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Cost Breakdown by Category
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryBreakdownData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis
                type="number"
                tick={{ fontSize: 11 }}
                stroke="var(--muted-foreground)"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => fmtDollar(v)}
              />
              <YAxis
                type="category"
                dataKey="vendor"
                tick={{ fontSize: 11 }}
                stroke="var(--muted-foreground)"
                tickLine={false}
                axisLine={false}
                width={110}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const nonZero = payload.filter(p => (p.value as number) > 0);
                  return (
                    <div className="rounded-lg bg-popover border border-border px-3 py-2 shadow-md text-xs max-w-xs">
                      <div className="font-medium text-foreground mb-1.5">{label}</div>
                      {nonZero.map((p, i) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color as string }} />
                            <span className="text-muted-foreground">{p.name}</span>
                          </div>
                          <span className="font-mono font-medium text-foreground">{fmtDollarFull(p.value as number)}</span>
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
              />
              {activeCategories.map(cat => (
                <Bar
                  key={cat}
                  dataKey={cat}
                  stackId="stack"
                  fill={CATEGORY_COLORS[cat] || '#888'}
                  barSize={28}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Detailed Breakdown Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Detailed Cost Breakdown
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                {results.map((r, i) => (
                  <th key={r.vendorId} className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider min-w-[130px]" style={{ color: VENDOR_COLORS[i] }}>
                    {r.vendorName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <CostRow label="Licensing" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.licensing, 0)} />
              <CostRow label="Platform Fee" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.platformFee, 0)} />
              <CostRow label="Implementation" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.implementation, 0)} isOneTime />
              <CostRow label="Data Migration" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.dataMigration, 0)} isOneTime />
              <CostRow label="Training" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.training, 0)} isOneTime />
              <CostRow label="Support" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.support, 0)} />
              <CostRow label="Admin Labor" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.admin, 0)} />
              <CostRow label="Integrations" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.integrations, 0)} />
              <CostRow label="Customization" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.customization, 0)} />
              <CostRow label="Downtime Impact" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.downtime, 0)} />
              <CostRow label="Supplemental Tooling" results={results} getValue={(r) => r.yearBreakdowns.reduce((s, y) => s + y.supplementalTooling, 0)} />
              {/* Total */}
              <tr className="border-t-2 border-border bg-secondary/50">
                <td className="px-4 py-3 font-bold">Total TCO</td>
                {results.map(r => (
                  <td key={r.vendorId} className="px-4 py-3 text-right font-mono font-bold">
                    {fmtDollarFull(r.totalTco)}
                  </td>
                ))}
              </tr>
              {/* vs Us row */}
              {competitorResults.length > 0 && (
                <tr className="bg-green-500/5">
                  <td className="px-4 py-2 text-sm text-green-600 font-medium">vs. Our Platform</td>
                  {results.map(r => (
                    <td key={r.vendorId} className="px-4 py-2 text-right text-sm font-mono">
                      {r.vendorType === 'us' ? (
                        <span className="text-muted-foreground">—</span>
                      ) : r.totalTco > usResult.totalTco ? (
                        <span className="text-green-500 font-semibold">
                          +{fmtDollarFull(r.totalTco - usResult.totalTco)} more
                        </span>
                      ) : r.totalTco < usResult.totalTco ? (
                        <span className="text-red-500 font-semibold">
                          {fmtDollarFull(usResult.totalTco - r.totalTco)} less
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Equal</span>
                      )}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Key Assumptions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Key Assumptions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((r, i) => {
            const profile = costProfiles.find(p => p.vendorId === r.vendorId);
            if (!profile) return null;
            return (
              <div key={r.vendorId} className="space-y-2">
                <h4 className="text-xs font-semibold" style={{ color: VENDOR_COLORS[i] }}>
                  {r.vendorName}
                </h4>
                <ul className="space-y-1">
                  {profile.assumptions.map((a, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: VENDOR_COLORS[i] }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Action CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6"
      >
        <h3 className="font-semibold text-lg mb-1">Next Steps</h3>
        <p className="text-sm text-muted-foreground mb-4">Use this TCO analysis to strengthen your deal motion.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Generate Battlecard with TCO */}
          {selectedAccount ? (
            <Link
              href={`/account/${selectedAccount.slug}/battlecard`}
              className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/15 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">Generate Battlecard + TCO</div>
                <div className="text-xs text-muted-foreground">Create a competitive battlecard with TCO data for {selectedAccount.name}</div>
              </div>
            </Link>
          ) : (
            <Link
              href="/battlecards"
              className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/15 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">Generate Battlecard + TCO</div>
                <div className="text-xs text-muted-foreground">Select an account and create a competitive battlecard with TCO data</div>
              </div>
            </Link>
          )}

          {/* Compare Competitors */}
          <Link
            href="/compare"
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors">
                <rect x="3" y="3" width="8" height="18" rx="1" />
                <rect x="13" y="3" width="8" height="18" rx="1" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold group-hover:text-foreground transition-colors">Head-to-Head</div>
              <div className="text-xs text-muted-foreground">Go head-to-head on features, strengths, and market momentum</div>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ── Table Row Helper ─────────────────────────────────────────────────────────

function CostRow({
  label,
  results,
  getValue,
  isOneTime,
}: {
  label: string;
  results: VendorTcoResult[];
  getValue: (r: VendorTcoResult) => number;
  isOneTime?: boolean;
}) {
  return (
    <tr className="border-b border-border/50 last:border-0">
      <td className="px-4 py-2.5 text-muted-foreground">
        {label}
        {isOneTime && <span className="ml-1.5 text-[10px] text-muted-foreground/60">(one-time)</span>}
      </td>
      {results.map(r => {
        const val = getValue(r);
        return (
          <td key={r.vendorId} className="px-4 py-2.5 text-right font-mono text-sm">
            {val > 0 ? fmtDollarFull(val) : <span className="text-muted-foreground/50">—</span>}
          </td>
        );
      })}
    </tr>
  );
}
