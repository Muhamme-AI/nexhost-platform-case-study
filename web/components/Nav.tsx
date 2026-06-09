import { PROFILE } from "@/lib/knowledge";
import { GitHubIcon, LinkedInIcon } from "./icons";

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-bg">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-accent/30 bg-accent-soft font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
            MS
          </span>
          <span className="text-base font-normal text-ink">
            {PROFILE.name}
          </span>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-8 w-8 place-items-center rounded-md text-ink-muted transition hover:bg-white/5 hover:text-ink"
          >
            <GitHubIcon />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-8 w-8 place-items-center rounded-md text-ink-muted transition hover:bg-white/5 hover:text-ink"
          >
            <LinkedInIcon />
          </a>
          <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
          <a
            href="#console"
            className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-ink-muted transition hover:text-ink sm:block"
          >
            Console
          </a>
          <a
            href="#stack"
            className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-ink-muted transition hover:text-ink sm:block"
          >
            Stack
          </a>
          <a
            href="#projects"
            className="rounded-md border border-accent/30 bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/20"
          >
            Projects
          </a>
        </nav>
      </div>
    </header>
  );
}
