"""
ESPCompose Simulator Bridge — Protocol message parsing.

Reads/writes newline-delimited JSON messages on stdio.
"""

from __future__ import annotations

import json
import sys
from typing import Any


def read_message() -> dict[str, Any] | None:
    """Read a single JSON-line message from stdin. Returns None on EOF."""
    line = sys.stdin.readline()
    if not line:
        return None
    line = line.strip()
    if not line:
        return None
    return json.loads(line)


def write_message(msg: dict[str, Any]) -> None:
    """Write a single JSON-line message to stdout and flush."""
    sys.stdout.write(json.dumps(msg) + "\n")
    sys.stdout.flush()
