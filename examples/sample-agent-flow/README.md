# Sample Agent Flow (synthetic demo)

A tiny, self-contained illustration of three core patterns from the Nexhost platform:

1. **Resilient multi-provider routing** with per-provider health and failover.
2. **A role- and tenant-scoped tool layer** (the MCP boundary, simplified).
3. **A minimal agent loop** that selects a tool and returns a grounded answer.

> This demo uses **mock providers** and **synthetic in-memory data** only. It contains no
> production code, prompts, secrets, or real data. It exists so the patterns described in the
> case study are concrete and testable.

## Run

```bash
python -m pip install -r requirements.txt
python demo.py
```

## Test

```bash
python -m pip install -r requirements.txt
pytest
```

## What it shows

- `resilient_router.py` — picks a provider by priority and health, retries, and fails over when a
  provider raises. Mirrors the real platform's provider independence.
- `mcp_tools.py` — a small registry of tools scoped by role (e.g. `staff` cannot run
  manager-only tools) and by tenant (a restaurant only sees its own rows).
- `agent.py` — routes a natural-language-ish query to a tool, executes it through the scoped
  layer, and composes a grounded answer string.
- `demo.py` — wires it together over synthetic inventory/waste data for two tenants.
