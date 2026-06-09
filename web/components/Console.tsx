"use client";

import { useEffect, useRef, useState } from "react";
import { EXAMPLE_PROMPTS } from "@/lib/knowledge";
import { SendIcon } from "./icons";

type Msg = { role: "user" | "assistant"; content: string };

export function Console() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.body) {
        const fallback = await res.text();
        setMessages((m) => updateLast(m, fallback));
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => updateLast(m, acc));
      }
    } catch {
      setMessages((m) => updateLast(m, "connection error — please try again in a moment."));
    } finally {
      setLoading(false);
    }
  }

  function updateLast(m: Msg[], content: string): Msg[] {
    const copy = [...m];
    copy[copy.length - 1] = { role: "assistant", content };
    return copy;
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const empty = messages.length === 0;

  return (
    <section id="console" className="relative z-10 pb-20">
      <div className="overflow-hidden rounded-xl border border-[#27272a] bg-bg panel-glow">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-[#27272a] bg-panel px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-2 leading-tight">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
                AI Systems Console
              </p>
              <p className="font-mono text-[11px] text-ink-faint">live demo · CV-grounded assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-dim" />
            connected
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="console-scroll h-[360px] space-y-5 overflow-y-auto px-4 py-5 font-mono sm:px-6">
          {empty && (
            <div className="animate-fade-up">
              <Label tag="assistant" />
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                ask me anything about Muhammed — his work, Nexhost, his stack — or general
                AI-engineering questions (agents, RAG, MCP, production architecture). I&apos;ll
                answer in a systems-minded way.
              </p>
              <p className="mt-4 text-[13px] text-ink-faint">examples:</p>
              <ul className="mt-2 space-y-1.5">
                {EXAMPLE_PROMPTS.map((ex) => (
                  <li key={ex}>
                    <button
                      onClick={() => send(ex)}
                      className="text-left text-xs text-ink-muted transition hover:text-accent"
                    >
                      <span className="text-accent">$</span> {ex}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className="animate-fade-up">
              <Label tag={m.role === "user" ? "you" : "assistant"} />
              <div className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed text-ink">
                {m.role === "user" ? (
                  <span><span className="text-accent">$ </span>{m.content}</span>
                ) : m.content ? (
                  m.content
                ) : (
                  <span className="text-ink-faint">
                    thinking
                    <span className="animate-blink">_</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Prompt input */}
        <div className="border-t border-[#27272a] bg-panel px-4 py-4 font-mono sm:px-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded border border-accent/30 bg-accent-soft px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent">
              prompt
            </span>
            <span className="text-[11px] text-ink-faint">ask about Muhammed, AI engineering, or your system.</span>
          </div>
          <div className="flex items-end gap-2 rounded-lg border border-white/10 bg-bg/60 px-3 py-2.5 focus-within:border-accent/40">
            <span className="select-none pt-1.5 text-accent">$</span>
            <textarea
              ref={taRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="What's on your mind? Ask about agents, RAG, or an architecture question…"
              className="max-h-32 flex-1 resize-none bg-transparent py-1 text-[13px] text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent-dim px-3 py-1.5 font-sans text-xs font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SendIcon className="h-3.5 w-3.5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {tag}
    </span>
  );
}
