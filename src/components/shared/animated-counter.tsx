'use client';

import { useAnimatedValue } from '@/hooks/use-animated-value';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function AnimatedCounter({ target, prefix = '', suffix = '', decimals = 0, duration = 1200 }: AnimatedCounterProps) {
  const value = useAnimatedValue(target, duration);
  return <span>{prefix}{value.toFixed(decimals)}{suffix}</span>;
}
