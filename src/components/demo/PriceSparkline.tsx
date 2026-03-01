'use client';

import type { PricePoint } from '@/types';

interface PriceSparklineProps {
  history: PricePoint[];
  currentPrice: number;
  width?: number;
  height?: number;
}

export default function PriceSparkline({
  history,
  currentPrice,
  width = 80,
  height = 28,
}: PriceSparklineProps) {
  // Add current price as the last point
  const points = [...history, { date: 'now', price: currentPrice }];
  if (points.length < 2) return null;

  const prices = points.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const padding = 2;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  // Build SVG path
  const pathPoints = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * innerW;
    const y = padding + innerH - ((p.price - min) / range) * innerH;
    return { x, y };
  });

  const pathD = pathPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  // Gradient fill path (area under the line)
  const fillD = `${pathD} L${pathPoints[pathPoints.length - 1].x.toFixed(1)},${height} L${pathPoints[0].x.toFixed(1)},${height} Z`;

  // Current price dot (last point)
  const lastPoint = pathPoints[pathPoints.length - 1];

  // Color based on trend: green if current <= first, red if rising
  const trending = currentPrice <= points[0].price;
  const lineColor = trending ? '#10b981' : '#ef4444';
  const fillColor = trending ? '#10b98115' : '#ef444415';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="flex-shrink-0"
      aria-label={`Price trend: ${trending ? 'falling' : 'rising'}`}
    >
      {/* Area fill */}
      <path d={fillD} fill={fillColor} />
      {/* Line */}
      <path d={pathD} fill="none" stroke={lineColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Current price dot */}
      <circle cx={lastPoint.x} cy={lastPoint.y} r="2" fill={lineColor} />
    </svg>
  );
}
