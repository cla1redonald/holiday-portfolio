'use client';

import type { PassengerDetails } from '@/types';

interface PassengerFormProps {
  index: number;
  value: PassengerDetails;
  onChange: (index: number, updated: PassengerDetails) => void;
}

export default function PassengerForm({ index, value, onChange }: PassengerFormProps) {
  const update = (field: keyof PassengerDetails, v: string) => {
    onChange(index, { ...value, [field]: v });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">
        Passenger {index + 1}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Title */}
        <div>
          <label className="text-[11px] text-secondary block mb-1">Title</label>
          <select
            value={value.title}
            onChange={(e) => update('title', e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-teal/30"
          >
            <option value="mr">Mr</option>
            <option value="mrs">Mrs</option>
            <option value="ms">Ms</option>
            <option value="miss">Miss</option>
            <option value="dr">Dr</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="text-[11px] text-secondary block mb-1">Gender</label>
          <select
            value={value.gender}
            onChange={(e) => update('gender', e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-teal/30"
          >
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* First name */}
        <div>
          <label className="text-[11px] text-secondary block mb-1">First name</label>
          <input
            type="text"
            value={value.givenName}
            onChange={(e) => update('givenName', e.target.value)}
            placeholder="As on passport"
            required
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-surface text-foreground placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
        </div>

        {/* Last name */}
        <div>
          <label className="text-[11px] text-secondary block mb-1">Last name</label>
          <input
            type="text"
            value={value.familyName}
            onChange={(e) => update('familyName', e.target.value)}
            placeholder="As on passport"
            required
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-surface text-foreground placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
        </div>
      </div>

      {/* Date of birth */}
      <div>
        <label className="text-[11px] text-secondary block mb-1">Date of birth</label>
        <input
          type="date"
          value={value.bornOn}
          onChange={(e) => update('bornOn', e.target.value)}
          required
          className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
      </div>

      {/* Contact details (only for first passenger) */}
      {index === 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-secondary block mb-1">Email</label>
            <input
              type="email"
              value={value.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@email.com"
              required
              className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-surface text-foreground placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>
          <div>
            <label className="text-[11px] text-secondary block mb-1">Phone</label>
            <input
              type="tel"
              value={value.phoneNumber}
              onChange={(e) => update('phoneNumber', e.target.value)}
              placeholder="+44 7..."
              required
              className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-surface text-foreground placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>
        </div>
      )}
    </div>
  );
}
