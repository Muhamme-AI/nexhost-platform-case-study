import { PROFILE } from "@/lib/knowledge";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-bg">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
            aria-label="Footer"
          >
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-500 transition-colors hover:text-emerald-400"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-500 transition-colors hover:text-emerald-400"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center gap-2 rounded border border-emerald-900/50 bg-emerald-950/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400"
              aria-label="Agent status: online"
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
                aria-hidden
              />
              AI AGENT: ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
