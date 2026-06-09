"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/knowledge";

const PHRASES = [
  "$ initializing systems-minded engineering…",
  "$ building production AI: agents · RAG · MCP",
  "$ resilient. observable. cost-aware. safe.",
];

function useTypewriter(phrases: string[], speed = 45, pause = 1600) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
          );
        },
        deleting ? speed / 2 : speed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, phrases, speed, pause]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(PHRASES);

  return (
    <section className="relative z-10 pb-10 pt-12 sm:pt-20">
      <p className="mb-5 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.1em] text-ink-muted">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-dim" />
        {PROFILE.title}
      </p>

      <h1 className="max-w-3xl font-mono text-[48px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
        BRIDGING DATA <span className="text-ink-faint">//</span>
        <br />
        PRODUCTION AI
      </h1>

      <p className="mt-4 h-7 max-w-2xl font-mono text-lg text-accent">
        {typed}
        <span className="ml-0.5 inline-block w-2 animate-blink bg-accent align-middle">&nbsp;</span>
      </p>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted">
        {PROFILE.subtitle}
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        {PROFILE.badges.map((b, i) => (
          <span
            key={b}
            className={
              i === 0
                ? "inline-flex items-center gap-2 rounded-full border border-[#007a55]/60 bg-[#002d23]/40 px-3.5 py-1.5 text-sm font-medium text-accent"
                : "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm font-medium text-ink-muted"
            }
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-accent-dim" : "bg-ink-faint"}`}
            />
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
