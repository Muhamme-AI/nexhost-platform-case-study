import { PROFILE, PROJECTS } from "@/lib/knowledge";
import { ArrowUpRightIcon, GitHubIcon } from "./icons";

export function Projects() {
  return (
    <section id="projects" className="relative z-10 py-16">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-ink">
          Projects
        </h2>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition hover:text-accent"
        >
          <GitHubIcon className="h-3.5 w-3.5" />
          all repos
          <ArrowUpRightIcon className="h-3 w-3" />
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col overflow-hidden rounded-xl border bg-panel/70 p-6 transition hover:bg-panel ${
              p.featured
                ? "border-accent/30"
                : "border-white/10 hover:border-accent/30"
            }`}
          >
            {p.featured && (
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> featured
              </span>
            )}

            <div className="flex items-start justify-between gap-4">
              <h3 className="font-mono text-sm font-semibold text-ink transition group-hover:text-accent">
                {p.title}
              </h3>
              <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-ink-faint transition group-hover:text-accent" />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.blurb}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
