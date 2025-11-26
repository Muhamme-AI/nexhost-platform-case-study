"""Resilient multi-provider routing with health tracking and failover.

A simplified, dependency-free stand-in for the platform's Resilient AI Service. Providers are
mocks; the point is the routing/failover/health logic, not real model calls.
"""

from __future__ import annotations

from collections.abc import Callable, Sequence
from dataclasses import dataclass, field


class ProviderError(Exception):
    """Raised by a provider to simulate an outage or rate limit."""


@dataclass
class ProviderHealth:
    name: str
    available: bool = True
    error_count: int = 0
    last_error: str | None = None

    def record_success(self) -> None:
        self.available = True
        self.last_error = None

    def record_failure(self, message: str) -> None:
        self.available = False
        self.error_count += 1
        self.last_error = message


@dataclass
class ResilientRouter:
    """Routes a prompt to the first healthy provider, retrying and failing over.

    ``providers`` maps a provider name to a callable that takes a prompt and returns a string,
    or raises :class:`ProviderError` to simulate failure.
    """

    providers: dict[str, Callable[[str], str]]
    priority: Sequence[str]
    max_retries: int = 3
    health: dict[str, ProviderHealth] = field(default_factory=dict)

    def __post_init__(self) -> None:
        for name in self.providers:
            self.health.setdefault(name, ProviderHealth(name=name))

    def _ordered_candidates(self) -> list[str]:
        # Healthy providers first, preserving configured priority.
        healthy = [n for n in self.priority if self.health[n].available]
        degraded = [n for n in self.priority if not self.health[n].available]
        return healthy + degraded

    def complete(self, prompt: str) -> tuple[str, str]:
        """Return ``(provider_name, response)`` or raise if every provider fails."""
        last_error: str | None = None
        attempts = 0
        for name in self._ordered_candidates():
            if attempts >= self.max_retries:
                break
            attempts += 1
            try:
                response = self.providers[name](prompt)
            except ProviderError as exc:
                last_error = str(exc)
                self.health[name].record_failure(str(exc))
                continue
            self.health[name].record_success()
            return name, response
        raise RuntimeError(f"All providers failed; last error: {last_error}")
