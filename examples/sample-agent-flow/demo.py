"""Wire the pieces together over synthetic data. Run: ``python demo.py``."""

from __future__ import annotations

from agent import answer
from mcp_tools import Session
from resilient_router import ProviderError, ResilientRouter


def _build_router() -> ResilientRouter:
    # gemini is "down" to demonstrate failover; openai answers.
    def gemini(_prompt: str) -> str:
        raise ProviderError("gemini: simulated rate limit")

    def openai(prompt: str) -> str:
        return f"[openai] {prompt}"

    def claude(prompt: str) -> str:
        return f"[claude] {prompt}"

    return ResilientRouter(
        providers={"gemini": gemini, "openai": openai, "claude": claude},
        priority=["gemini", "openai", "claude"],
    )


def main() -> None:
    router = _build_router()
    provider, _ = router.complete("health check")
    print(f"Resilient router selected provider: {provider} (failed over from gemini)\n")

    staff = Session(tenant_id="tenant_a", role="staff")
    manager = Session(tenant_id="tenant_b", role="manager")

    print("Tenant A / staff:")
    print("  Q: What's low on stock?")
    print(f"  A: {answer(staff, 'what is low on stock?')}")
    print("  Q: How much waste this period?")
    print(f"  A: {answer(staff, 'show me waste')}\n")

    print("Tenant B / manager:")
    print("  Q: What's low on stock?")
    print(f"  A: {answer(manager, 'anything low stock?')}")


if __name__ == "__main__":
    main()
