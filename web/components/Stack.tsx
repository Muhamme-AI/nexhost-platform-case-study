import { STACK } from "@/lib/knowledge";

export function Stack() {
  return (
    <section id="stack" className="relative z-10 py-16">
      <div className="mb-10">
        <h2 className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-ink">
          The stack
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {STACK.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-panel/70 p-6 transition hover:border-accent/30 hover:bg-panel"
          >
            <h3 className="font-mono text-sm font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
