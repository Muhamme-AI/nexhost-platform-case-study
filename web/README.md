# Muhammed Salim — Portfolio

A terminal/console-style personal portfolio for **Muhammed Salim** (AI Engineer · Co-Founder / CTO),
modelled on the look & feel of `cesarb.ai`. The centrepiece is an **AI Systems Console** — a chat
assistant grounded on Muhammed's CV that answers questions about him and about AI engineering.

Built with the same stack as the reference site: **Next.js (App Router) + React + Tailwind CSS**,
deployable free on **Vercel**. The assistant runs on a free LLM (**Groq — Llama 3.3 70B**) via a
serverless route.

## Sections

1. **Hero** — animated terminal tagline.
2. **AI Systems Console** — streaming, CV-grounded chat assistant.
3. **The stack** — what Muhammed builds with, in production.
4. **Projects** — Nexhost (featured) + linked GitHub repos.

## Run locally

```bash
cd web
npm install
cp .env.local.example .env.local   # then paste your free Groq key
npm run dev                         # http://localhost:3000
```

> The site works **without** a key (the assistant returns a sensible canned answer), but for the
> live AI you need a free Groq key.

## Get a free Groq API key (the AI brain)

1. Sign up at <https://console.groq.com> (free).
2. Create a key at <https://console.groq.com/keys>.
3. Put it in `web/.env.local`:

```
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile   # optional override
```

4. Restart `npm run dev`.

## Make the assistant smarter about you

All knowledge lives in **`lib/knowledge.ts`**:

- `CV_KNOWLEDGE` — the grounding document injected into the model. Paste your full CV here
  (roles, dates, achievements, education, contact) to let it "answer anything about you".
- `PROJECTS` — the cards in the Projects section (add/remove repos here).
- `STACK` — the cards in "The stack".
- `EXAMPLE_PROMPTS` — the clickable starter questions.

## Swap the LLM provider (optional)

The route in `app/api/chat/route.ts` calls an **OpenAI-compatible** endpoint. To use a different
free provider (e.g. Google Gemini via its OpenAI-compatible endpoint, or OpenRouter free models),
change `GROQ_URL`, the model, and the auth header — the streaming logic is provider-agnostic.

## Deploy free on Vercel

```bash
npm i -g vercel
vercel            # from the web/ directory
```

Then add `GROQ_API_KEY` in **Project → Settings → Environment Variables** and redeploy.

## TODO before going live

- Add your free `GROQ_API_KEY` (Vercel env var) to enable the live assistant.
- Update `metadataBase` in `app/layout.tsx` to your real domain.

Done: full CV is in `CV_KNOWLEDGE`, LinkedIn (`linkedin.com/in/Muhammed-AI`) and email are wired
into the nav/footer via `PROFILE` in `lib/knowledge.ts`.
