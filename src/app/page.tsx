export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Design system verification placeholder */}
      <div className="max-w-2xl mx-auto px-6 py-24 flex flex-col gap-8">
        <div>
          <h1
            className="text-4xl font-bold tracking-tight mb-3"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-inter)" }}
          >
            Holiday Portfolio
          </h1>
          <p
            className="text-lg"
            style={{ color: "var(--secondary)" }}
          >
            Your Year of Travel, Planned.
          </p>
        </div>

        {/* Coral accent swatch */}
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span style={{ color: "var(--secondary)", fontSize: "0.875rem" }}>
            Accent — coral/terracotta #E07A5F
          </span>
        </div>

        {/* Font check */}
        <div
          className="rounded-xl border p-6 flex flex-col gap-3"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <p style={{ fontFamily: "var(--font-inter)", color: "var(--foreground)" }}>
            Inter — body copy and headings
          </p>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              color: "var(--accent)",
            }}
          >
            JetBrains Mono — £1,249 / trip data
          </p>
        </div>

        {/* CTA placeholder */}
        <button
          className="self-start rounded-lg px-6 py-3 font-semibold"
          style={{
            background: "var(--accent)",
            color: "#FFFFFF",
            fontFamily: "var(--font-inter)",
          }}
        >
          Join the Waitlist
        </button>
      </div>
    </main>
  );
}
