import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest

from agent import answer
from mcp_tools import AccessDenied, Session, call_tool


def test_tenant_isolation():
    a = call_tool(Session("tenant_a", "staff"), "low_stock")
    b = call_tool(Session("tenant_b", "staff"), "low_stock")
    a_items = {r["item"] for r in a}
    b_items = {r["item"] for r in b}
    assert a_items.isdisjoint(b_items)


def test_role_scoping_blocks_staff_write():
    with pytest.raises(AccessDenied):
        call_tool(
            Session("tenant_a", "staff"),
            "adjust_reorder",
            {"item": "flour", "reorder_at": 9},
        )


def test_manager_can_write():
    result = call_tool(
        Session("tenant_a", "manager"), "adjust_reorder", {"item": "flour", "reorder_at": 9}
    )
    assert result["updated"] is True
    assert result["reorder_at"] == 9


def test_agent_grounds_low_stock_answer():
    reply = answer(Session("tenant_a", "staff"), "what is low on stock?")
    assert "reorder" in reply.lower()


def test_agent_waste_answer_has_total():
    reply = answer(Session("tenant_b", "staff"), "show me waste")
    assert "waste cost" in reply.lower()
