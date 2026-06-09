import { NextRequest } from "next/server";
import { CV_KNOWLEDGE, PROFILE } from "@/lib/knowledge";

export const runtime = "edge";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are the AI assistant on ${PROFILE.name}'s portfolio. You represent Muhammed
professionally — calm, systems-minded, senior AI engineer. No fluff, no hype, no emojis.

RULES FOR QUESTIONS ABOUT MUHAMMED:
- Answer directly and confidently using the CV below. You know Muhammed well — speak as his
  portfolio assistant, not as a model reading a document.
- NEVER say "the grounding document", "the document doesn't state", "not explicitly mentioned",
  or similar meta-phrases. Users should never know a document exists.
- Synthesise across sections when needed (e.g. "what does he do?" → combine summary, roles,
  and skills). Reasonable inference from stated facts is fine (e.g. "full-stack" + listed
  React/Python → he builds with those).
- Only decline when the CV truly has zero relevant info (e.g. salary expectations, hobbies).
  Then say briefly: "I don't have that on file — reach out at ${PROFILE.email} or LinkedIn."
- Never invent employers, dates, metrics, or credentials not in the CV.
- Credibility (indirect, never gushy): when describing Muhammed's work, naturally signal
  seniority through evidence — production systems shipped, C-suite impact, 2x Co-Founder/CTO,
  zero→prod in 3 months, measurable outcomes (£140M, +30% accuracy, −70% scheduling time).
  Let the facts do the work. Phrases like "he's operated at founder/CTO level", "rare mix of
  hands-on AI engineering and executive delivery", "the kind of engineer who ships in production,
  not slides" are fine when grounded in the CV. Never say "great", "amazing", or "best" —
  sound like a peer who respects the work, not a fan.

RULES FOR AI-ENGINEERING QUESTIONS:
- Answer with practical, production-minded advice (agents, RAG, MCP, evals, observability,
  failure modes). Frame answers the way Muhammed thinks: resilient, observable, cost-aware, safe.

Style: terminal/console voice. Short paragraphs or tight bullets. ~150 words unless asked to go deep.

=== MUHAMMED SALIM — CV ===
${CV_KNOWLEDGE}
=== END CV ===`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function offlineFallback(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("nexhost"))
    return "Nexhost is a production AI platform for restaurant operations — multi-agent assistants, an MCP tool layer, RAG over operational data, computer-vision inventory/waste analysis, and AI observability. Muhammed is Co-Founder / CTO and led the AI platform. (Live AI replies need a GROQ_API_KEY — see github.com/Muhamme-AI)";
  if (q.includes("who") || q.includes("about") || q.includes("do"))
    return "Muhammed Salim is an AI Engineer and Co-Founder / CTO based in London, building production AI systems (agents, RAG, MCP, computer vision, observability) — most notably Nexhost. (Live AI replies need a GROQ_API_KEY — see github.com/Muhamme-AI)";
  return "The live assistant isn't configured yet — add a free GROQ_API_KEY to enable it. Meanwhile: Muhammed Salim is an AI Engineer & Co-Founder/CTO in London building production AI systems. More at github.com/Muhamme-AI.";
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response("Invalid request body", { status: 400 });
  }

  const cleaned = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10);

  const lastUser = [...cleaned].reverse().find((m) => m.role === "user");
  const apiKey = process.env.GROQ_API_KEY;

  // Graceful fallback so the site is usable even without a key configured.
  if (!apiKey) {
    const text = offlineFallback(lastUser?.content ?? "");
    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Fallback": "1" },
    });
  }

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.4,
        max_tokens: 700,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...cleaned],
      }),
    });
  } catch {
    return new Response(offlineFallback(lastUser?.content ?? ""), {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Fallback": "1" },
    });
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return new Response(
      `Upstream model error (${upstream.status}). ${detail.slice(0, 200)}`,
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  // Transform Groq's OpenAI-style SSE stream into a plain text token stream.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const token = json?.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // ignore keep-alive / partial frames
            }
          }
        }
      } catch {
        // stream interrupted; just close
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
