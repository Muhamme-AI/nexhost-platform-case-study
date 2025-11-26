import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest

from resilient_router import ProviderError, ResilientRouter


def _router(fail=()):
    def make(name):
        def provider(prompt):
            if name in fail:
                raise ProviderError(f"{name} down")
            return f"[{name}] {prompt}"

        return provider

    names = ["gemini", "openai", "claude"]
    return ResilientRouter(
        providers={n: make(n) for n in names},
        priority=names,
    )


def test_uses_primary_when_healthy():
    provider, response = _router().complete("hi")
    assert provider == "gemini"
    assert response == "[gemini] hi"


def test_fails_over_to_next_provider():
    router = _router(fail=("gemini",))
    provider, _ = router.complete("hi")
    assert provider == "openai"
    assert router.health["gemini"].available is False
    assert router.health["gemini"].error_count == 1


def test_raises_when_all_fail():
    router = _router(fail=("gemini", "openai", "claude"))
    with pytest.raises(RuntimeError):
        router.complete("hi")
