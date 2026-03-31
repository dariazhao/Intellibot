'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type TimeRange = '24h' | '7d' | '30d' | '90d';

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  '24h': 'Past 24h',
  '7d': 'Past 7 days',
  '30d': 'Past 30 days',
  '90d': 'Past 90 days',
};

interface TimeRangeContextValue {
  range: TimeRange;
  setRange: (range: TimeRange) => void;
}

const TimeRangeContext = createContext<TimeRangeContextValue>({
  range: '24h',
  setRange: () => {},
});

export function TimeRangeProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<TimeRange>('24h');
  return (
    <TimeRangeContext.Provider value={{ range, setRange }}>
      {children}
    </TimeRangeContext.Provider>
  );
}

export function useTimeRange() {
  return useContext(TimeRangeContext);
}
