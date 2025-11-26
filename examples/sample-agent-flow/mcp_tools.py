"""A role- and tenant-scoped tool layer (simplified MCP boundary).

The model never queries data directly; it calls curated tools here. Each tool declares the role
required to use it, and every call is scoped to a single tenant. Data is synthetic and in-memory.
"""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from typing import Any


class AccessDenied(Exception):
    """Raised when a session's role is not permitted to use a tool."""


# --- Synthetic data: two tenants, no real information. ---------------------------------------
_INVENTORY: dict[str, list[dict[str, Any]]] = {
    "tenant_a": [
        {"item": "tomatoes", "qty": 4, "reorder_at": 10},
        {"item": "mozzarella", "qty": 18, "reorder_at": 8},
        {"item": "flour", "qty": 2, "reorder_at": 6},
    ],
    "tenant_b": [
        {"item": "salmon", "qty": 12, "reorder_at": 5},
        {"item": "rice", "qty": 1, "reorder_at": 4},
    ],
}

_WASTE: dict[str, list[dict[str, Any]]] = {
    "tenant_a": [
        {"item": "tomatoes", "reason": "spoilage", "cost": 6.50},
        {"item": "bread", "reason": "over-prep", "cost": 3.00},
    ],
    "tenant_b": [
        {"item": "salmon", "reason": "spoilage", "cost": 14.00},
    ],
}


@dataclass
class Session:
    tenant_id: str
    role: str  # "staff" or "manager"


@dataclass
class Tool:
    name: str
    required_role: str  # minimum role
    handler: Callable[[Session, dict[str, Any]], Any]


_ROLE_RANK = {"staff": 1, "manager": 2}


def _low_stock(session: Session, _args: dict[str, Any]) -> list[dict[str, Any]]:
    rows = _INVENTORY.get(session.tenant_id, [])
    return [r for r in rows if r["qty"] <= r["reorder_at"]]


def _waste_summary(session: Session, _args: dict[str, Any]) -> dict[str, Any]:
    rows = _WASTE.get(session.tenant_id, [])
    total = round(sum(r["cost"] for r in rows), 2)
    reasons: dict[str, int] = {}
    for r in rows:
        reasons[r["reason"]] = reasons.get(r["reason"], 0) + 1
    return {"total_cost": total, "by_reason": reasons, "items": rows}


def _adjust_reorder(session: Session, args: dict[str, Any]) -> dict[str, Any]:
    item = args["item"]
    new_level = int(args["reorder_at"])
    for r in _INVENTORY.get(session.tenant_id, []):
        if r["item"] == item:
            r["reorder_at"] = new_level
            return {"item": item, "reorder_at": new_level, "updated": True}
    return {"item": item, "updated": False}


TOOLS: dict[str, Tool] = {
    "low_stock": Tool("low_stock", "staff", _low_stock),
    "waste_summary": Tool("waste_summary", "staff", _waste_summary),
    # Writing a reorder threshold is a manager-only action.
    "adjust_reorder": Tool("adjust_reorder", "manager", _adjust_reorder),
}


def call_tool(session: Session, name: str, args: dict[str, Any] | None = None) -> Any:
    tool = TOOLS.get(name)
    if tool is None:
        raise KeyError(f"Unknown tool: {name}")
    if _ROLE_RANK[session.role] < _ROLE_RANK[tool.required_role]:
        raise AccessDenied(
            f"Role '{session.role}' cannot use '{name}' (requires '{tool.required_role}')"
        )
    return tool.handler(session, args or {})
