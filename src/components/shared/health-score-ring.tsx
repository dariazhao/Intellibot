'use client';

import { useAnimatedValue } from '@/hooks/use-animated-value';

interface HealthScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function HealthScoreRing({ score, size = 80, strokeWidth = 6 }: HealthScoreRingProps) {
  const animatedScore = useAnimatedValue(score, 1500);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const offset = circumference - progress;

  const getColor = (s: number) => {
    if (s >= 75) return '#2ca66c';
    if (s >= 50) return '#e5a00d';
    if (s >= 25) return '#f2762e';
    return '#da545b';
  };

  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.1s ease-out',
            filter: `drop-shadow(0 0 6px ${color}40)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold" style={{ color }}>
          {Math.round(animatedScore)}
        </span>
      </div>
    </div>
  );
}
