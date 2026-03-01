'use client';

interface PaymentSectionProps {
  totalAmount: number;
  onConfirm: () => void;
  loading: boolean;
}

export default function PaymentSection({ totalAmount, onConfirm, loading }: PaymentSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Payment</h3>

      <div className="bg-muted rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-secondary">Total to pay</span>
          <span className="font-mono font-bold text-foreground">£{totalAmount}</span>
        </div>
        <p className="text-[11px] text-secondary/50">
          Test mode — no real payment will be charged.
          Card payment integration coming soon.
        </p>
      </div>

      <button
        onClick={onConfirm}
        disabled={loading}
        className="w-full bg-accent hover:bg-accent/90 disabled:bg-secondary/30 disabled:cursor-not-allowed text-white font-display font-semibold py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer"
      >
        {loading ? 'Confirming...' : 'Confirm Booking'}
      </button>
    </div>
  );
}
