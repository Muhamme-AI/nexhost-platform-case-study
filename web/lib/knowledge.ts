// ---------------------------------------------------------------------------
// Knowledge base that grounds the AI assistant.
// This is the single source of truth for "everything about Muhammed".
// Edit this file to refine what the assistant knows (e.g. paste a fuller CV,
// add roles, dates, achievements). It is injected into the model's system
// prompt on every request.
// ---------------------------------------------------------------------------

export const PROFILE = {
  name: "Muhammed Salim",
  title: "AI Engineer · Full-Stack & AI/ML Engineer",
  location: "London / Hybrid (UK)",
  github: "https://github.com/Muhamme-AI",
  githubUser: "Muhamme-AI",
  linkedin: "https://www.linkedin.com/in/Muhammed-AI",
  email: "muhammed.ismael.ai@gmail.com",
  phone: "+44 7562 317 578",
  tagline: "BRIDGING DATA // PRODUCTION AI",
  subtitle:
    "AI Engineer and 2x Co-Founder/CTO building production AI systems end to end — multi-agent assistants, RAG, MCP tool layers, computer vision, and the full-stack + data platforms underneath.",
  badges: [
    "Co-Founder & CTO @ Nexhost AI",
    "AWS · GCP · Azure AI certified",
  ],
};

// The full grounding document handed to the model. Written in first person so
// the assistant speaks as Muhammed's representative with accurate facts.
export const CV_KNOWLEDGE = `
# WHO I AM
Name: Muhammed Salim
Headline: AI Engineer | Full-Stack & AI/ML Engineer
Location: London / Hybrid (UK)
Email: muhammed.ismael.ai@gmail.com
Phone: +44 7562 317 578
GitHub: https://github.com/Muhamme-AI
LinkedIn: https://www.linkedin.com/in/Muhammed-AI

Professional summary: I'm a strategic technology executive and venture builder with years of
success orchestrating end-to-end engineering, AI/ML innovation, and high-scale data
operations. I've been Co-Founder/CTO of two ventures. I align complex technical strategy with
C-suite objectives, drive operational excellence and multi-million-pound growth, accelerate
product-to-market cycles, and use intelligent automation to create competitive advantage.
My foundation is in data/BI and I now build production AI systems end to end.

# CORE SKILLS
- Leadership & Strategy: Co-Founder/CTO across 2 ventures, team management, executive
  stakeholder engagement.
- Full-Stack & Cloud: Python, React, TypeScript, REST APIs, Supabase, Vercel, Cloudflare,
  Azure, AWS, GCP, MLOps.
- AI/ML & Automation: RAG, MCP, FastMCP, LangChain, LangGraph, Hugging Face, A2A
  (agent-to-agent), LLM integration, computer vision.
- Data & BI: PostgreSQL, T-SQL, ETL/ELT, data modelling, Power Automate, Power BI, Git, CI/CD.

# PROFESSIONAL EXPERIENCE

## Nexhost AI — Co-Founder & CTO | AI Engineer (Dec 2024 – Present)
- Full-stack build: sole architect of the NEX platform (React, TypeScript, Python,
  PostgreSQL, Supabase) deployed via Vercel and Railway — taken from zero to live production
  in 3 months.
- AI/ML implementation: designed and deployed 5 AI modules, including AI agents and a
  computer-vision smart inventory-counting and wastage-logging system — increasing inventory
  counting accuracy by 30% and reducing food waste by 25%; AI-driven rota generation cutting
  scheduling time by 70%. Ran 20+ operator discovery sessions to validate features.
- Team leadership: managed 3 engineers (code reviews, sprint planning), onboarded beta
  clients, achieving a 100% successful launch rate on the initial cohort.

## Claims Consortium Group (CCG) — InsureTech — Implementation Engineer | SQL Data Analyst (Mar 2024 – Present)
- Executive engagement: built a predictive financial forecasting AI model for executive
  decision-making — real-time budget projections, cost-variance analysis, and revenue
  forecasting to support C-suite financial planning.
- Automation: automated 70% of the monthly MI cycle with Python and SQL pipelines, cutting
  delivery from days to hours.
- Integration & reconciliation: standardised schemas across partners, reducing data errors
  by 40%.

## Light & Wonder — Analyst (Billing) (Sep 2024 – Mar 2025)
- Automation: automated billing extract and Power BI reporting workflows, reducing manual
  processing time by 50% and closing monthly cycles 2 days faster.
- Reconciliation: identified and resolved billing variances worth £100k, supporting accurate
  invoicing across high-volume game revenue streams.

## Perkk™ — Co-Founder & CTO (Nov 2022 – Dec 2024)
- Business impact: contributed to £140M in combined revenue across partnered startups,
  including a client achieving 4x revenue growth and £28M in funding secured post-branding.
- Tech leadership: built and owned the full tech stack for a global B2B branding agency
  (11–50 team), supporting 2–3 premium projects per month.
- Growth: helped scale the agency team by 8 members while sustaining a premium delivery model.

# CERTIFICATIONS
- AWS Certified
- Google Cloud (GCP) Generative AI Leader
- Microsoft Azure AI — Apps and Agents Developer

# FLAGSHIP WORK — NEXHOST (deeper detail)
Nexhost is a production AI platform for restaurant operations. As Co-Founder/CTO I lead its
design and implementation. It lets an operator ask questions in plain language ("what did we
waste this week and why?", "which menu items are below target margin?", "who's scheduled
Friday night?") and get grounded, actionable answers — and it automates the data capture
(e.g. counting stock from a photo) that makes those answers possible.

Architecture highlights:
- Multi-agent assistant layer (operations / scheduling / context agents).
- A Model Context Protocol (MCP) tool interface exposing safe, role-scoped database tools to
  the LLM — the model never touches the database directly.
- A resilient multi-provider LLM layer with automatic failover across Gemini, OpenAI, and
  Claude, plus per-provider health tracking.
- Computer-vision pipelines for inventory counting and waste detection, with confidence
  scoring and cost-impact estimation.
- RAG over operational data so each answer is grounded.
- AI observability: per-call usage, latency, and cost metering.
- Multi-tenant data on Supabase/Postgres with Row-Level Security; POS integration with
  inventory auto-deduction from synced orders.

Engineering principles: resilience first (failover), safety by design (role-scoped tools +
RLS), cost visibility (every call metered), operator-grade UX (realtime sync, auto-reconnect).

# PORTFOLIO PROJECTS (GitHub: Muhamme-AI)
1. Nexhost — Restaurant Operations AI Platform (architecture case study):
   https://github.com/Muhamme-AI/nexhost-platform-case-study
2. Music Store SQL Analysis — business-performance Q&A over a music store dataset:
   https://github.com/Muhamme-AI/Data-analysis-project-3
3. Vacation Planning Power BI Dashboard (team project for a major client):
   https://github.com/Muhamme-AI/data-analytics-portfolio-project-2
4. GDP & Internet Usage Analysis — UN data, Python/Jupyter:
   https://github.com/Muhamme-AI/data-analytics-portfolio
5. UK Crime Data Analysis — datasets, report, Power BI dashboard:
   https://github.com/Muhamme-AI/Data_analysis_project_4

# HOW I WORK / PHILOSOPHY
I build AI that survives contact with production: resilient, observable, cost-aware, and safe.
I think in systems — failure modes, guardrails, evals, and operational cost are first-class
concerns. I'm a venture builder as much as an engineer, comfortable translating between
C-suite strategy and hands-on delivery.

# CONTACT
Email: muhammed.ismael.ai@gmail.com · Phone: +44 7562 317 578
LinkedIn: https://www.linkedin.com/in/Muhammed-AI · GitHub: https://github.com/Muhamme-AI

# QUICK FACTS (use these for common questions — answer directly, do not hedge)
- Who is Muhammed? AI Engineer and Full-Stack & AI/ML Engineer based in London/Hybrid UK.
  2x Co-Founder/CTO (Nexhost AI, Perkk™). Venture builder who ships production AI end to end.
- What does he do (one line)? Builds production AI systems — multi-agent assistants, RAG, MCP
  tool layers, computer vision — plus the full-stack and data platforms underneath.
- Current role: Co-Founder & CTO | AI Engineer at Nexhost AI (Dec 2024 – Present).
- Other current role: Implementation Engineer | SQL Data Analyst at Claims Consortium Group
  (CCG) InsureTech (Mar 2024 – Present).
- Past roles: Co-Founder & CTO at Perkk™ (Nov 2022 – Dec 2024); Analyst (Billing) at Light &
  Wonder (Sep 2024 – Mar 2025).
- Nexhost in one sentence: Production AI platform for restaurant operations — agents, MCP,
  RAG, computer vision, observability — he is Co-Founder/CTO and sole architect of the NEX stack.
- Biggest Nexhost wins: zero→production in 3 months; 5 AI modules; +30% inventory accuracy;
  −25% food waste; −70% scheduling time; managed 3 engineers; 100% beta launch success.
- Perkk wins: £140M combined revenue across partnered startups; client 4x growth + £28M funding;
  built full tech stack for global B2B branding agency.
- CCG wins: predictive financial forecasting AI for C-suite; 70% MI automation; −40% data errors.
- Light & Wonder wins: 50% less manual billing work; £100k variances resolved.
- Tech stack: Python, React, TypeScript, PostgreSQL, Supabase, LangChain, LangGraph, RAG, MCP,
  FastMCP, Hugging Face, Power BI, Azure/AWS/GCP, Vercel, Railway, CI/CD.
- Certifications: AWS Certified, GCP Generative AI Leader, Azure AI Apps and Agents Developer.
- GitHub: https://github.com/Muhamme-AI · LinkedIn: https://www.linkedin.com/in/Muhammed-AI
- Email: muhammed.ismael.ai@gmail.com · Phone: +44 7562 317 578
- Philosophy: production AI that is resilient, observable, cost-aware, and safe; venture builder
  who bridges C-suite strategy and hands-on engineering.
`;

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  url: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "Nexhost — Restaurant Operations AI",
    blurb:
      "Production multi-agent AI platform: agents, an MCP tool layer, RAG over operational data, computer-vision inventory/waste analysis, and end-to-end AI observability. My role: Co-Founder / CTO.",
    tags: ["Multi-agent", "RAG", "MCP", "Computer Vision", "Observability"],
    url: "https://github.com/Muhamme-AI/nexhost-platform-case-study",
    featured: true,
  },
  {
    title: "Music Store SQL Analysis",
    blurb:
      "SQL analysis of an online music store's dataset to answer key business-performance questions and support data-driven growth decisions.",
    tags: ["SQL", "Analytics", "Business Insight"],
    url: "https://github.com/Muhamme-AI/Data-analysis-project-3",
  },
  {
    title: "Vacation Planning Power BI Dashboard",
    blurb:
      "Team project: a Power BI dashboard for a major client to aid vacation planning — data collection, cleaning, transformation, and visualization.",
    tags: ["Power BI", "Data Viz", "Teamwork"],
    url: "https://github.com/Muhamme-AI/data-analytics-portfolio-project-2",
  },
  {
    title: "GDP & Internet Usage Analysis",
    blurb:
      "Exploring the relationship between GDP per capita and internet usage across countries using UN data — trends, distributions, and change over time.",
    tags: ["Python", "Jupyter", "EDA"],
    url: "https://github.com/Muhamme-AI/data-analytics-portfolio",
  },
  {
    title: "UK Crime Data Analysis",
    blurb:
      "Analysis of UK crime data with raw and cleaned datasets, a detailed report, an interactive Power BI dashboard, and a summary presentation.",
    tags: ["Power BI", "Reporting", "Data Cleaning"],
    url: "https://github.com/Muhamme-AI/Data_analysis_project_4",
  },
];

export const STACK = [
  {
    title: "AI orchestration",
    body: "Multi-agent systems with LangChain / LangGraph, tool-calling via a Model Context Protocol (MCP) layer, and RAG-grounded answers — in production, not demos. Resilient multi-provider routing with automatic failover.",
  },
  {
    title: "Production systems",
    body: "Python, FastAPI, React / Next.js, TypeScript. Supabase / Postgres with Row-Level Security, multi-tenant design, POS integrations. Config-driven, env for secrets, structured logging, health checks.",
  },
  {
    title: "Observability",
    body: "Per-call usage, latency, and cost metering across every model call. Provider health tracking and failover so AI features stay available and economically viable at scale.",
  },
  {
    title: "Computer vision",
    body: "Photo-based inventory counting and waste detection with confidence scoring and cost-impact estimation — turning a phone camera into a data-capture pipeline for operations.",
  },
];

export const EXAMPLE_PROMPTS = [
  "what does Muhammed do, in one line?",
  "how would you design a production-grade RAG system?",
  "what is Nexhost and what was your role?",
  "what failure modes should I expect from long-running agents?",
];
