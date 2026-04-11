'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InfoTip, TCO_TIPS } from './info-tip';
import { TcoResults } from './tco-results';
import { TcoNarrative } from './tco-narrative';
import { TcoQuickStart, type QuickStartParams } from './tco-quick-start';
import type { TcoCostProfile } from '@/lib/schemas';
import type { Account, Competitor } from '@/lib/schemas';

// ── Types ────────────────────────────────────────────────────────────────────

type PricingModel = 'seat_based' | 'usage_based' | 'hybrid' | 'flat_rate';

interface DealParams {
  accountId: string;
  pricingModel: PricingModel;
  contractTermYears: 1 | 3 | 5;
  seats: number;
  annualGrowthPct: number;
  costPerHourDowntime: number;
  avgFteCostAnnual: number;
}

export interface VendorCostOverrides {
  // Seat-based
  pricePerSeatMonth: number;
  platformFeeAnnual: number;
  // Usage-based
  usagePricePerUnit: number;
  usageUnitLabel: string;
  estimatedMonthlyUnits: number;
  // Hybrid
  hybridBaseFeeMonthly: number;
  hybridPricePerUnit: number;
  hybridUnitLabel: string;
  hybridEstimatedMonthlyUnits: number;
  // Flat-rate
  flatRateAnnual: number;
  // One-time
  implementationCost: number;
  dataMigrationCost: number;
  trainingCost: number;
  // Ongoing
  supportCostAnnual: number;
  adminFtePct: number;
  integrationCostPerConnector: number;
  connectorsNeeded: number;
  customizationCostAnnual: number;
  // Hidden / Risk
  avgDowntimeHoursPerYear: number;
  vendorLockInCost: number;
  supplementalToolingAnnual: number;
}

export interface TcoYearBreakdown {
  year: number;
  licensing: number;
  platformFee: number;
  support: number;
  admin: number;
  integrations: number;
  customization: number;
  downtime: number;
  supplementalTooling: number;
  implementation: number;
  dataMigration: number;
  training: number;
}

export interface VendorTcoResult {
  vendorId: string;
  vendorName: string;
  vendorType: 'us' | 'competitor';
  yearBreakdowns: TcoYearBreakdown[];
  totalTco: number;
  totalRecurring: number;
  totalOneTime: number;
}

// ── Constants ────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 'setup', label: 'Deal Setup', icon: '1' },
  { id: 'costs', label: 'Cost Inputs', icon: '2' },
  { id: 'hidden', label: 'Hidden Costs', icon: '3' },
  { id: 'results', label: 'Results', icon: '4' },
  { id: 'narrative', label: 'Narrative', icon: '5' },
] as const;

const PRICING_MODELS: { value: PricingModel; label: string; desc: string; icon: string }[] = [
  {
    value: 'seat_based',
    label: 'Per-Seat',
    desc: 'Fixed price per user per month — predictable, scales with headcount',
    icon: '👤',
  },
  {
    value: 'usage_based',
    label: 'Consumption',
    desc: 'Pay-per-use based on compute, API calls, or tokens — scales with workload',
    icon: '📊',
  },
  {
    value: 'hybrid',
    label: 'Hybrid',
    desc: 'Base platform fee plus variable usage charges — balances predictability and flexibility',
    icon: '🔀',
  },
  {
    value: 'flat_rate',
    label: 'Flat-Rate',
    desc: 'Single annual fee regardless of users or usage — simplest to budget',
    icon: '📋',
  },
];

const DEFAULT_DEAL: DealParams = {
  accountId: '',
  pricingModel: 'seat_based',
  contractTermYears: 3,
  seats: 100,
  annualGrowthPct: 10,
  costPerHourDowntime: 15000,
  avgFteCostAnnual: 145000,
};

function initOverrides(profile: TcoCostProfile): VendorCostOverrides {
  return {
    pricePerSeatMonth: profile.pricePerSeatMonth,
    platformFeeAnnual: profile.platformFeeAnnual,
    usagePricePerUnit: profile.usagePricePerUnit,
    usageUnitLabel: profile.usageUnitLabel,
    estimatedMonthlyUnits: profile.estimatedMonthlyUnits,
    hybridBaseFeeMonthly: profile.hybridBaseFeeMonthly,
    hybridPricePerUnit: profile.hybridPricePerUnit,
    hybridUnitLabel: profile.hybridUnitLabel,
    hybridEstimatedMonthlyUnits: profile.hybridEstimatedMonthlyUnits,
    flatRateAnnual: profile.flatRateAnnual,
    implementationCost: profile.implementationCost,
    dataMigrationCost: profile.dataMigrationCost,
    trainingCost: profile.trainingCost,
    supportCostAnnual: profile.supportCostAnnual,
    adminFtePct: profile.adminFtePct,
    integrationCostPerConnector: profile.integrationCostPerConnector,
    connectorsNeeded: profile.avgConnectorsNeeded,
    customizationCostAnnual: profile.customizationCostAnnual,
    avgDowntimeHoursPerYear: profile.avgDowntimeHoursPerYear,
    vendorLockInCost: 0,
    supplementalToolingAnnual: 0,
  };
}

// ── Calculation Engine ───────────────────────────────────────────────────────

function calculateLicensing(
  model: PricingModel,
  overrides: VendorCostOverrides,
  seatsOrUnitsThisYear: number,
): { licensing: number; platformFee: number } {
  switch (model) {
    case 'seat_based':
      return {
        licensing: seatsOrUnitsThisYear * overrides.pricePerSeatMonth * 12,
        platformFee: overrides.platformFeeAnnual,
      };
    case 'usage_based':
      return {
        licensing: overrides.usagePricePerUnit * seatsOrUnitsThisYear * 12,
        platformFee: 0,
      };
    case 'hybrid':
      return {
        licensing: (overrides.hybridBaseFeeMonthly * 12) +
          (overrides.hybridPricePerUnit * seatsOrUnitsThisYear * 12),
        platformFee: 0,
      };
    case 'flat_rate':
      return {
        licensing: overrides.flatRateAnnual,
        platformFee: 0,
      };
  }
}

function getBaseUnits(model: PricingModel, deal: DealParams, overrides: VendorCostOverrides): number {
  switch (model) {
    case 'seat_based': return deal.seats;
    case 'usage_based': return overrides.estimatedMonthlyUnits;
    case 'hybrid': return overrides.hybridEstimatedMonthlyUnits;
    case 'flat_rate': return 0;
  }
}

function calculateTco(
  deal: DealParams,
  vendorId: string,
  vendorName: string,
  vendorType: 'us' | 'competitor',
  overrides: VendorCostOverrides,
): VendorTcoResult {
  const years: TcoYearBreakdown[] = [];
  let totalTco = 0;
  let totalOneTime = 0;
  let totalRecurring = 0;

  const baseUnits = getBaseUnits(deal.pricingModel, deal, overrides);

  for (let y = 1; y <= deal.contractTermYears; y++) {
    const growthFactor = deal.pricingModel === 'flat_rate'
      ? 1
      : Math.pow(1 + deal.annualGrowthPct / 100, y - 1);
    const unitsThisYear = Math.ceil(baseUnits * growthFactor);

    const { licensing, platformFee } = calculateLicensing(deal.pricingModel, overrides, unitsThisYear);
    const support = overrides.supportCostAnnual;
    const admin = (overrides.adminFtePct / 100) * deal.avgFteCostAnnual;
    const integrations = y === 1
      ? overrides.integrationCostPerConnector * overrides.connectorsNeeded
      : overrides.integrationCostPerConnector * overrides.connectorsNeeded * 0.15;
    const customization = overrides.customizationCostAnnual;
    const downtime = overrides.avgDowntimeHoursPerYear * deal.costPerHourDowntime;
    const supplementalTooling = overrides.supplementalToolingAnnual;

    const implementation = y === 1 ? overrides.implementationCost : 0;
    const dataMigration = y === 1 ? overrides.dataMigrationCost : 0;
    const training = y === 1 ? overrides.trainingCost : 0;

    const yearOneTime = implementation + dataMigration + training;
    const yearRecurring = licensing + platformFee + support + admin + integrations + customization + downtime + supplementalTooling;

    years.push({
      year: y, licensing, platformFee, support, admin, integrations,
      customization, downtime, supplementalTooling, implementation, dataMigration, training,
    });

    totalTco += yearOneTime + yearRecurring;
    totalOneTime += yearOneTime;
    totalRecurring += yearRecurring;
  }

  return { vendorId, vendorName, vendorType, yearBreakdowns: years, totalTco, totalRecurring, totalOneTime };
}

// ── Component ────────────────────────────────────────────────────────────────

interface TcoWizardProps {
  accounts: Account[];
  competitors: Competitor[];
  costProfiles: TcoCostProfile[];
  initialPricingModel?: PricingModel;
}

export function TcoWizard({ accounts, competitors, costProfiles, initialPricingModel }: TcoWizardProps) {
  const [mode, setMode] = useState<'quick' | 'manual'>('quick');
  const [step, setStep] = useState(0);
  const [deal, setDeal] = useState<DealParams>({
    ...DEFAULT_DEAL,
    ...(initialPricingModel ? { pricingModel: initialPricingModel } : {}),
  });
  const [selectedCompetitorIds, setSelectedCompetitorIds] = useState<string[]>(
    competitors.filter(c => c.threatLevel === 'high').map(c => c.id)
  );

  const [overridesMap, setOverridesMap] = useState<Record<string, VendorCostOverrides>>(() => {
    const map: Record<string, VendorCostOverrides> = {};
    for (const profile of costProfiles) {
      map[profile.vendorId] = initOverrides(profile);
    }
    return map;
  });

  const usProfile = costProfiles.find(p => p.vendorType === 'us')!;
  const selectedProfiles = costProfiles.filter(p => selectedCompetitorIds.includes(p.vendorId));

  const updateDeal = useCallback(<K extends keyof DealParams>(key: K, value: DealParams[K]) => {
    setDeal(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateOverride = useCallback((vendorId: string, key: keyof VendorCostOverrides, value: number) => {
    setOverridesMap(prev => ({
      ...prev,
      [vendorId]: { ...prev[vendorId], [key]: value },
    }));
  }, []);

  const updateOverrideStr = useCallback((vendorId: string, key: keyof VendorCostOverrides, value: string) => {
    setOverridesMap(prev => ({
      ...prev,
      [vendorId]: { ...prev[vendorId], [key]: value },
    }));
  }, []);

  const toggleCompetitor = useCallback((id: string) => {
    setSelectedCompetitorIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const handleQuickParsed = useCallback((params: QuickStartParams) => {
    setDeal(prev => ({
      ...prev,
      accountId: params.accountId,
      seats: params.seats,
      contractTermYears: params.contractTermYears,
      pricingModel: params.pricingModel,
    }));
    setSelectedCompetitorIds(params.competitorIds);
    setMode('manual');
    setStep(3);
  }, []);

  const results = useMemo<VendorTcoResult[]>(() => {
    const vendors = [usProfile, ...selectedProfiles];
    return vendors.map(profile =>
      calculateTco(deal, profile.vendorId, profile.vendorName, profile.vendorType, overridesMap[profile.vendorId])
    );
  }, [deal, usProfile, selectedProfiles, overridesMap]);

  const canProceed = step === 0
    ? selectedCompetitorIds.length > 0 && (deal.pricingModel !== 'seat_based' || deal.seats > 0)
    : true;

  const selectedAccount = accounts.find(a => a.id === deal.accountId);

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-secondary/30 w-fit">
        <button
          onClick={() => { setMode('quick'); setStep(0); }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === 'quick'
              ? 'bg-card border border-border shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          </svg>
          Quick Start
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === 'manual'
              ? 'bg-card border border-border shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Manual Setup
        </button>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-1">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 flex-1">
            <button
              onClick={() => i <= step + 1 && setStep(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all w-full ${
                i === step
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : i < step
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/15'
                  : 'bg-secondary/50 text-muted-foreground border border-border'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                i === step ? 'bg-primary text-primary-foreground' : i < step ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {i < step ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : s.icon}
              </span>
              <span className="hidden sm:inline truncate">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`w-4 h-px shrink-0 ${i < step ? 'bg-green-500' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode === 'quick' && step === 0 ? 'quick' : step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 0 && mode === 'quick' && (
            <TcoQuickStart
              onParsed={handleQuickParsed}
              onManual={() => setMode('manual')}
            />
          )}
          {step === 0 && mode === 'manual' && (
            <StepDealSetup
              deal={deal} updateDeal={updateDeal} accounts={accounts}
              competitors={competitors} selectedCompetitorIds={selectedCompetitorIds}
              toggleCompetitor={toggleCompetitor} overridesMap={overridesMap}
            />
          )}
          {step === 1 && (
            <StepCostInputs
              deal={deal} usProfile={usProfile} selectedProfiles={selectedProfiles}
              overridesMap={overridesMap} updateOverride={updateOverride}
              updateOverrideStr={updateOverrideStr}
            />
          )}
          {step === 2 && (
            <StepHiddenCosts
              deal={deal} updateDeal={updateDeal} usProfile={usProfile}
              selectedProfiles={selectedProfiles} overridesMap={overridesMap}
              updateOverride={updateOverride}
            />
          )}
          {step === 3 && (
            <TcoResults results={results} deal={deal} selectedAccount={selectedAccount} costProfiles={costProfiles} />
          )}
          {step === 4 && (
            <TcoNarrative results={results} deal={deal} selectedAccount={selectedAccount} costProfiles={costProfiles} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
            disabled={!canProceed}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            {step === 2 ? 'Calculate TCO' : step === 3 ? 'Generate Narrative' : 'Continue'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        ) : (
          <button
            onClick={() => setStep(0)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}

// ── Step 1: Deal Setup ───────────────────────────────────────────────────────

function StepDealSetup({
  deal, updateDeal, accounts, competitors, selectedCompetitorIds, toggleCompetitor, overridesMap,
}: {
  deal: DealParams;
  updateDeal: <K extends keyof DealParams>(key: K, value: DealParams[K]) => void;
  accounts: Account[];
  competitors: Competitor[];
  selectedCompetitorIds: string[];
  toggleCompetitor: (id: string) => void;
  overridesMap: Record<string, VendorCostOverrides>;
}) {
  const growthLabel = deal.pricingModel === 'seat_based' ? 'Annual Seat Growth' :
    deal.pricingModel === 'flat_rate' ? 'Annual Price Escalation' : 'Annual Usage Growth';
  const growthTip = deal.pricingModel === 'seat_based' ? TCO_TIPS.seatGrowth :
    deal.pricingModel === 'flat_rate' ? 'Expected annual price increase written into the contract. Flat-rate deals often include 3–5% annual escalators.' :
    'Expected annual increase in consumption volume. AI/ML workloads typically grow 15–30% year-over-year as adoption expands across teams.';

  const usOverrides = overridesMap['us'];

  // Summary of base units for growth preview
  const baseUnits = getBaseUnits(deal.pricingModel, deal, usOverrides);
  const endUnits = deal.pricingModel === 'flat_rate'
    ? null
    : Math.ceil(baseUnits * Math.pow(1 + deal.annualGrowthPct / 100, deal.contractTermYears - 1));

  const unitLabel = deal.pricingModel === 'seat_based' ? 'seats' :
    deal.pricingModel === 'usage_based' ? (usOverrides?.usageUnitLabel || 'units') + '/mo' :
    deal.pricingModel === 'hybrid' ? (usOverrides?.hybridUnitLabel || 'units') + '/mo' : '';

  return (
    <div className="space-y-6">
      {/* Pricing Model Selector */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg">
            <InfoTip term="Pricing Model" explanation={TCO_TIPS.pricingModel} />
          </h3>
          <p className="text-sm text-muted-foreground mt-1">How is this deal priced? This determines which cost inputs appear below.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {PRICING_MODELS.map(pm => (
            <button
              key={pm.value}
              onClick={() => updateDeal('pricingModel', pm.value)}
              className={`text-left px-3 py-3 rounded-lg border transition-all ${
                deal.pricingModel === pm.value
                  ? 'border-primary bg-primary/10 ring-1 ring-primary/30'
                  : 'border-border bg-secondary/50 hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{pm.icon}</span>
                <span className="text-sm font-semibold">{pm.label}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">{pm.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Deal parameters */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div>
            <h3 className="font-semibold text-lg">Deal Parameters</h3>
            <p className="text-sm text-muted-foreground mt-1">Define the scope of this deal for accurate TCO modeling.</p>
          </div>

          {/* Account */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Account (optional)</label>
            <select
              value={deal.accountId}
              onChange={(e) => updateDeal('accountId', e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">— No specific account —</option>
              {accounts.map(a => (
                <option key={a.id} value={a.id}>{a.logo} {a.name} — {a.industry}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">Link to an account to add context to exported reports.</p>
          </div>

          {/* Contract term */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              <InfoTip term="Contract Term" explanation={TCO_TIPS.contractTerm} />
            </label>
            <div className="flex gap-2">
              {([1, 3, 5] as const).map(n => (
                <button
                  key={n}
                  onClick={() => updateDeal('contractTermYears', n)}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    deal.contractTermYears === n
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {n} {n === 1 ? 'Year' : 'Years'}
                </button>
              ))}
            </div>
          </div>

          {/* Seats — shown for seat-based; informational for others */}
          {deal.pricingModel === 'seat_based' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                <InfoTip term="Licensed Seats" explanation={TCO_TIPS.pricePerSeat} />
              </label>
              <input
                type="number"
                min={1}
                value={deal.seats}
                onChange={(e) => updateDeal('seats', Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-mono"
              />
            </div>
          )}

          {/* Growth rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              <InfoTip term={`${growthLabel} (%)`} explanation={growthTip} />
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={deal.annualGrowthPct}
                onChange={(e) => updateDeal('annualGrowthPct', parseInt(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-mono font-medium w-12 text-right">{deal.annualGrowthPct}%</span>
            </div>
            {endUnits !== null && baseUnits > 0 && (
              <p className="text-xs text-muted-foreground">
                Year 1: {baseUnits.toLocaleString()} {unitLabel} → Year {deal.contractTermYears}: {endUnits.toLocaleString()} {unitLabel}
              </p>
            )}
          </div>
        </div>

        {/* Right: Competitor selection */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div>
            <h3 className="font-semibold text-lg">Select Competitors</h3>
            <p className="text-sm text-muted-foreground mt-1">Choose which vendors to compare against. High-threat competitors are pre-selected.</p>
          </div>
          <div className="space-y-2">
            {competitors.map(comp => (
              <button
                key={comp.id}
                onClick={() => toggleCompetitor(comp.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                  selectedCompetitorIds.includes(comp.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-secondary/50 hover:border-primary/50'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  selectedCompetitorIds.includes(comp.id) ? 'border-primary bg-primary' : 'border-muted-foreground/40'
                }`}>
                  {selectedCompetitorIds.includes(comp.id) && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{comp.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{comp.positioning}</div>
                </div>
                <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                  comp.threatLevel === 'high' ? 'bg-red-500/15 text-red-500' :
                  comp.threatLevel === 'medium' ? 'bg-amber-500/15 text-amber-500' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {comp.threatLevel.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
          {selectedCompetitorIds.length === 0 && (
            <p className="text-sm text-destructive">Select at least one competitor to continue.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Cost Inputs ──────────────────────────────────────────────────────

function StepCostInputs({
  deal, usProfile, selectedProfiles, overridesMap, updateOverride, updateOverrideStr,
}: {
  deal: DealParams;
  usProfile: TcoCostProfile;
  selectedProfiles: TcoCostProfile[];
  overridesMap: Record<string, VendorCostOverrides>;
  updateOverride: (vendorId: string, key: keyof VendorCostOverrides, value: number) => void;
  updateOverrideStr: (vendorId: string, key: keyof VendorCostOverrides, value: string) => void;
}) {
  const allVendors = [usProfile, ...selectedProfiles];
  const [activeVendor, setActiveVendor] = useState(usProfile.vendorId);

  const vendor = allVendors.find(v => v.vendorId === activeVendor) || usProfile;
  const overrides = overridesMap[vendor.vendorId];
  const profile = allVendors.find(p => p.vendorId === vendor.vendorId)!;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-5">
          <h3 className="font-semibold text-lg">Cost Inputs</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Review and adjust cost estimates for each vendor. Values are pre-populated from industry benchmarks — edit any field to match your deal.
          </p>
        </div>

        {/* Vendor tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {allVendors.map(v => (
            <button
              key={v.vendorId}
              onClick={() => setActiveVendor(v.vendorId)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeVendor === v.vendorId
                  ? v.vendorType === 'us'
                    ? 'bg-green-500/15 text-green-500 border border-green-500/30'
                    : 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-secondary/50 text-muted-foreground border border-border hover:border-primary/30'
              }`}
            >
              {v.vendorType === 'us' ? '🏠 ' : ''}{v.vendorName}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {/* ── Dynamic Licensing Section ── */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Licensing & Subscription — {PRICING_MODELS.find(p => p.value === deal.pricingModel)?.label} Model
            </h4>
          </div>

          {deal.pricingModel === 'seat_based' && (
            <>
              <CostField
                label={<InfoTip term="Price per Seat / Month" explanation={TCO_TIPS.pricePerSeat} />}
                value={overrides.pricePerSeatMonth}
                onChange={(v) => updateOverride(vendor.vendorId, 'pricePerSeatMonth', v)}
                prefix="$"
                hint={`${deal.seats} seats × $${overrides.pricePerSeatMonth} × 12 = $${(deal.seats * overrides.pricePerSeatMonth * 12).toLocaleString()}/yr`}
              />
              <CostField
                label={<InfoTip term="Platform Fee (Annual)" explanation={TCO_TIPS.platformFee} />}
                value={overrides.platformFeeAnnual}
                onChange={(v) => updateOverride(vendor.vendorId, 'platformFeeAnnual', v)}
                prefix="$"
              />
            </>
          )}

          {deal.pricingModel === 'usage_based' && (
            <>
              <CostField
                label={<InfoTip term={`Price per ${overrides.usageUnitLabel || 'Unit'}`} explanation={TCO_TIPS.usageUnit} />}
                value={overrides.usagePricePerUnit}
                onChange={(v) => updateOverride(vendor.vendorId, 'usagePricePerUnit', v)}
                prefix="$"
                step={0.01}
                hint={`Cost per individual ${overrides.usageUnitLabel || 'unit'} of consumption`}
              />
              <CostField
                label={<InfoTip term="Est. Monthly Volume" explanation={TCO_TIPS.estimatedVolume} />}
                value={overrides.estimatedMonthlyUnits}
                onChange={(v) => updateOverride(vendor.vendorId, 'estimatedMonthlyUnits', v)}
                hint={`${overrides.estimatedMonthlyUnits.toLocaleString()} ${overrides.usageUnitLabel}/mo × $${overrides.usagePricePerUnit} = $${Math.round(overrides.estimatedMonthlyUnits * overrides.usagePricePerUnit * 12).toLocaleString()}/yr`}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  <InfoTip term="Unit Type" explanation={TCO_TIPS.usageUnit} />
                </label>
                <input
                  type="text"
                  value={overrides.usageUnitLabel}
                  onChange={(e) => updateOverrideStr(vendor.vendorId, 'usageUnitLabel', e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="e.g., compute hours, API calls, tokens (M)"
                />
              </div>
            </>
          )}

          {deal.pricingModel === 'hybrid' && (
            <>
              <CostField
                label={<InfoTip term="Base Fee / Month" explanation={TCO_TIPS.hybridBase} />}
                value={overrides.hybridBaseFeeMonthly}
                onChange={(v) => updateOverride(vendor.vendorId, 'hybridBaseFeeMonthly', v)}
                prefix="$"
                hint={`Fixed: $${(overrides.hybridBaseFeeMonthly * 12).toLocaleString()}/yr`}
              />
              <CostField
                label={<InfoTip term={`Price per ${overrides.hybridUnitLabel || 'Unit'}`} explanation={TCO_TIPS.usageUnit} />}
                value={overrides.hybridPricePerUnit}
                onChange={(v) => updateOverride(vendor.vendorId, 'hybridPricePerUnit', v)}
                prefix="$"
                step={0.01}
              />
              <CostField
                label={<InfoTip term="Est. Monthly Volume" explanation={TCO_TIPS.estimatedVolume} />}
                value={overrides.hybridEstimatedMonthlyUnits}
                onChange={(v) => updateOverride(vendor.vendorId, 'hybridEstimatedMonthlyUnits', v)}
                hint={`Variable: $${Math.round(overrides.hybridEstimatedMonthlyUnits * overrides.hybridPricePerUnit * 12).toLocaleString()}/yr + base = $${Math.round((overrides.hybridBaseFeeMonthly * 12) + (overrides.hybridEstimatedMonthlyUnits * overrides.hybridPricePerUnit * 12)).toLocaleString()}/yr`}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  <InfoTip term="Unit Type" explanation={TCO_TIPS.usageUnit} />
                </label>
                <input
                  type="text"
                  value={overrides.hybridUnitLabel}
                  onChange={(e) => updateOverrideStr(vendor.vendorId, 'hybridUnitLabel', e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="e.g., compute hours, API calls"
                />
              </div>
            </>
          )}

          {deal.pricingModel === 'flat_rate' && (
            <CostField
              label={<InfoTip term="Annual License Fee" explanation={TCO_TIPS.flatRate} />}
              value={overrides.flatRateAnnual}
              onChange={(v) => updateOverride(vendor.vendorId, 'flatRateAnnual', v)}
              prefix="$"
              hint={`Fixed ${deal.contractTermYears}-year cost: $${(overrides.flatRateAnnual * deal.contractTermYears).toLocaleString()}`}
            />
          )}

          {/* ── One-time Costs ── */}
          <div className="md:col-span-2 mt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              One-Time Costs (Year 1)
            </h4>
          </div>
          <CostField label={<InfoTip term="Implementation" explanation={TCO_TIPS.implementation} />} value={overrides.implementationCost} onChange={(v) => updateOverride(vendor.vendorId, 'implementationCost', v)} prefix="$" />
          <CostField label={<InfoTip term="Data Migration" explanation={TCO_TIPS.dataMigration} />} value={overrides.dataMigrationCost} onChange={(v) => updateOverride(vendor.vendorId, 'dataMigrationCost', v)} prefix="$" />
          <CostField label={<InfoTip term="Training & Enablement" explanation={TCO_TIPS.training} />} value={overrides.trainingCost} onChange={(v) => updateOverride(vendor.vendorId, 'trainingCost', v)} prefix="$" />

          {/* ── Ongoing Costs ── */}
          <div className="md:col-span-2 mt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Ongoing Annual Costs
            </h4>
          </div>
          <CostField
            label={<InfoTip term="Support & Maintenance" explanation={TCO_TIPS.supportTier} />}
            value={overrides.supportCostAnnual}
            onChange={(v) => updateOverride(vendor.vendorId, 'supportCostAnnual', v)}
            prefix="$"
            hint={`Tier: ${profile.supportTier.replace(/_/g, ' ')}`}
          />
          <CostField
            label={<InfoTip term="Admin Effort (% of FTE)" explanation={TCO_TIPS.adminFte} />}
            value={overrides.adminFtePct}
            onChange={(v) => updateOverride(vendor.vendorId, 'adminFtePct', v)}
            suffix="%"
            hint={`= $${Math.round((overrides.adminFtePct / 100) * deal.avgFteCostAnnual).toLocaleString()}/yr at $${deal.avgFteCostAnnual.toLocaleString()} FTE cost`}
          />
          <CostField label={<InfoTip term="Cost per Integration" explanation={TCO_TIPS.integrations} />} value={overrides.integrationCostPerConnector} onChange={(v) => updateOverride(vendor.vendorId, 'integrationCostPerConnector', v)} prefix="$" />
          <CostField label="Connectors Needed" value={overrides.connectorsNeeded} onChange={(v) => updateOverride(vendor.vendorId, 'connectorsNeeded', v)} hint={`Total: $${(overrides.integrationCostPerConnector * overrides.connectorsNeeded).toLocaleString()}`} />
          <CostField label={<InfoTip term="Customization (Annual)" explanation={TCO_TIPS.customization} />} value={overrides.customizationCostAnnual} onChange={(v) => updateOverride(vendor.vendorId, 'customizationCostAnnual', v)} prefix="$" />
        </div>

        {/* Assumptions */}
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Vendor Assumptions</h4>
          <ul className="space-y-1.5">
            {profile.assumptions.map((a, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="mt-1 w-1 h-1 rounded-full bg-muted-foreground/50 shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Hidden & Risk Costs ──────────────────────────────────────────────

function StepHiddenCosts({
  deal, updateDeal, usProfile, selectedProfiles, overridesMap, updateOverride,
}: {
  deal: DealParams;
  updateDeal: <K extends keyof DealParams>(key: K, value: DealParams[K]) => void;
  usProfile: TcoCostProfile;
  selectedProfiles: TcoCostProfile[];
  overridesMap: Record<string, VendorCostOverrides>;
  updateOverride: (vendorId: string, key: keyof VendorCostOverrides, value: number) => void;
}) {
  const allVendors = [usProfile, ...selectedProfiles];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div>
          <h3 className="font-semibold text-lg">Global Assumptions</h3>
          <p className="text-sm text-muted-foreground mt-1">These values apply across all vendors and drive hidden cost calculations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          <CostField label={<InfoTip term="Cost per Hour of Downtime" explanation={TCO_TIPS.costPerHourDowntime} />} value={deal.costPerHourDowntime} onChange={(v) => updateDeal('costPerHourDowntime', v)} prefix="$" hint="Revenue + productivity loss when systems are unavailable" />
          <CostField label={<InfoTip term="Average FTE Cost (Annual)" explanation={TCO_TIPS.adminFte} />} value={deal.avgFteCostAnnual} onChange={(v) => updateDeal('avgFteCostAnnual', v)} prefix="$" hint="Fully loaded cost including salary, benefits, overhead" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div>
          <h3 className="font-semibold text-lg">Risk & Hidden Costs by Vendor</h3>
          <p className="text-sm text-muted-foreground mt-1">These costs are often overlooked in vendor quotes but significantly impact true TCO.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground w-[200px]">Cost Factor</th>
                {allVendors.map(v => (
                  <th key={v.vendorId} className={`text-center px-3 py-2.5 text-xs font-semibold uppercase tracking-wider min-w-[140px] ${v.vendorType === 'us' ? 'text-green-500' : 'text-foreground'}`}>{v.vendorName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="px-3 py-3 text-muted-foreground"><InfoTip term="Avg. Downtime (hrs/yr)" explanation={TCO_TIPS.downtime} /></td>
                {allVendors.map(v => (
                  <td key={v.vendorId} className="px-3 py-3">
                    <input type="number" min={0} value={overridesMap[v.vendorId].avgDowntimeHoursPerYear} onChange={(e) => updateOverride(v.vendorId, 'avgDowntimeHoursPerYear', Math.max(0, parseFloat(e.target.value) || 0))} className="w-full rounded border border-border bg-secondary/50 px-2 py-1.5 text-sm text-center font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
                    <div className="text-[10px] text-muted-foreground text-center mt-1">= ${(overridesMap[v.vendorId].avgDowntimeHoursPerYear * deal.costPerHourDowntime).toLocaleString()}/yr</div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border/50">
                <td className="px-3 py-3 text-muted-foreground"><InfoTip term="Vendor Lock-In Cost" explanation={TCO_TIPS.vendorLockIn} /></td>
                {allVendors.map(v => (
                  <td key={v.vendorId} className="px-3 py-3">
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                      <input type="number" min={0} value={overridesMap[v.vendorId].vendorLockInCost} onChange={(e) => updateOverride(v.vendorId, 'vendorLockInCost', Math.max(0, parseFloat(e.target.value) || 0))} className="w-full rounded border border-border bg-secondary/50 pl-6 pr-2 py-1.5 text-sm text-center font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border/50">
                <td className="px-3 py-3 text-muted-foreground"><InfoTip term="Supplemental Tooling (/yr)" explanation={TCO_TIPS.supplementalTooling} /></td>
                {allVendors.map(v => (
                  <td key={v.vendorId} className="px-3 py-3">
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                      <input type="number" min={0} value={overridesMap[v.vendorId].supplementalToolingAnnual} onChange={(e) => updateOverride(v.vendorId, 'supplementalToolingAnnual', Math.max(0, parseFloat(e.target.value) || 0))} className="w-full rounded border border-border bg-secondary/50 pl-6 pr-2 py-1.5 text-sm text-center font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="bg-secondary/30">
                <td className="px-3 py-3 text-sm font-medium">Annual Hidden Cost Total</td>
                {allVendors.map(v => {
                  const o = overridesMap[v.vendorId];
                  const annual = (o.avgDowntimeHoursPerYear * deal.costPerHourDowntime) + o.supplementalToolingAnnual;
                  return <td key={v.vendorId} className="px-3 py-3 text-center font-mono font-semibold text-sm">${annual.toLocaleString()}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Shared: Cost Field ───────────────────────────────────────────────────────

function CostField({
  label, value, onChange, prefix, suffix, hint, step,
}: {
  label: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  step?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>}
        <input
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
          className={`w-full rounded-lg border border-border bg-secondary/50 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
            prefix ? 'pl-7 pr-3' : suffix ? 'pl-3 pr-8' : 'px-3'
          }`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>}
      </div>
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}
