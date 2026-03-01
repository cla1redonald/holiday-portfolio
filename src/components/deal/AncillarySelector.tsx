'use client';

import type { DealAncillary } from '@/types';

interface AncillarySelectorProps {
  ancillaries: DealAncillary[];
  selected: Set<string>;
  onToggle: (serviceId: string) => void;
}

export default function AncillarySelector({ ancillaries, selected, onToggle }: AncillarySelectorProps) {
  if (ancillaries.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-[11px] font-medium text-secondary uppercase tracking-wider">Add extras</h4>
      {ancillaries.map((a) => (
        <label
          key={a.serviceId}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={selected.has(a.serviceId)}
            onChange={() => onToggle(a.serviceId)}
            className="w-4 h-4 rounded border-border text-teal focus:ring-teal/30 cursor-pointer"
          />
          <span className="text-sm text-foreground group-hover:text-teal transition-colors">
            {a.category === 'bags' ? 'Checked bag' : 'Flexible cancellation'}
          </span>
          <span className="text-sm font-mono text-secondary ml-auto">£{a.customerPrice}</span>
        </label>
      ))}
    </div>
  );
}
