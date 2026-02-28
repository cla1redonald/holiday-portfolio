import Wordmark from '@/components/brand/Wordmark';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-secondary text-sm">
        <Wordmark size="sm" className="text-foreground" />
        <span>&copy; 2026 Roami</span>
        <span>Your world, better explored.</span>
      </div>
    </footer>
  );
}
