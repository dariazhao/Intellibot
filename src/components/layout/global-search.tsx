'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { searchAccounts } from '@/lib/dal';
import type { Account } from '@/lib/schemas';

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Account[]>([]);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === '/' && !open && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open]);

  useEffect(() => {
    if (query.length > 0) {
      searchAccounts(query).then(setResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (slug: string) => {
    setOpen(false);
    setQuery('');
    router.push(`/account/${slug}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border hover:border-[#632CA6]/50 bg-secondary/50"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Search...
        <kbd className="ml-2 text-[10px] bg-[#2a2548] px-1 py-0.5 rounded font-mono border border-[#3a3460]">
          &#8984;K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search accounts, competitors..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Accounts">
            {results.map((account) => (
              <CommandItem
                key={account.id}
                onSelect={() => handleSelect(account.slug)}
                className="cursor-pointer"
              >
                <span className="mr-2 text-lg">{account.logo}</span>
                <div className="flex-1">
                  <div className="text-[13px] font-medium">{account.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {account.industry} &middot; ${(account.arr / 1_000_000).toFixed(1)}M ARR
                  </div>
                </div>
                <HealthBar score={account.healthScore} />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function HealthBar({ score }: { score: number }) {
  const color =
    score >= 75 ? '#2ca66c' :
    score >= 50 ? '#e5a00d' :
    '#da545b';

  return (
    <div className="flex items-center gap-1.5">
      <div className="w-8 h-1 rounded-full bg-[#2a2548] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-[11px] font-mono" style={{ color }}>{score}</span>
    </div>
  );
}
