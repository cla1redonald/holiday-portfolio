'use client';

import { Deal } from '@/types';
import DealCard from './DealCard';

interface DealGridProps {
  deals: Deal[];
}

export default function DealGrid({ deals }: DealGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {deals.map((deal, index) => (
        <div
          key={deal.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
        >
          <DealCard deal={deal} />
        </div>
      ))}
    </div>
  );
}
