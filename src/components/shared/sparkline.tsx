'use client';

import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
  isUp?: boolean;
}

export function Sparkline({ data, color, isUp }: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }));
  const defaultColor = isUp ? '#da545b' : '#2ca66c';
  const strokeColor = color || defaultColor;
  const id = `spark-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="w-20 h-7">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              return (
                <div className="rounded bg-popover border border-border px-2 py-1 text-xs text-popover-foreground shadow-md">
                  <span className="font-mono font-medium">{payload[0].value}</span>
                </div>
              );
            }}
            cursor={false}
            allowEscapeViewBox={{ x: true, y: true }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={1.5}
            fill={`url(#${id})`}
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0, fill: strokeColor }}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
