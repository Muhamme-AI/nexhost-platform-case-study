"""A minimal agent loop: route a query to a scoped tool and ground the answer.

Intentionally rule-based (no real LLM) so the demo is deterministic and testable. It mirrors the
real flow: plan -> call scoped tool -> compose a grounded answer from structured results.
"""

from __future__ import annotations

from mcp_tools import AccessDenied, Session, call_tool


def _route(query: str) -> tuple[str, dict] | None:
    q = query.lower()
    if "low" in q and "stock" in q:
        return "low_stock", {}
    if "waste" in q:
        return "waste_summary", {}
    return None


def answer(session: Session, query: str) -> str:
    """Compose a grounded answer for ``query`` using scoped tools."""
    route = _route(query)
    if route is None:
        return "I can help with low stock and waste questions for your restaurant."

    tool_name, args = route
    try:
        result = call_tool(session, tool_name, args)
    except AccessDenied as exc:
        return f"Sorry, you don't have permission for that: {exc}"

    if tool_name == "low_stock":
        if not result:
            return "Nothing is below its reorder level right now."
        items = ", ".join(f"{r['item']} ({r['qty']} left)" for r in result)
        return f"{len(result)} item(s) need reordering: {items}."

    if tool_name == "waste_summary":
        reasons = ", ".join(f"{k}: {v}" for k, v in result["by_reason"].items())
        return (
            f"Total waste cost is {result['total_cost']:.2f}. "
            f"Breakdown by reason — {reasons}."
        )

    return "Done."
