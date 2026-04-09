"""
ESPCompose Simulator Bridge — Entry point.

Spawned by the Node dev server as: python3 main.py
Communicates via stdin/stdout JSON-line protocol.
"""

from __future__ import annotations

import logging
import sys

from bridge import Bridge


def main() -> None:
    logging.basicConfig(
        level=logging.DEBUG,
        format="[bridge] %(levelname)s %(message)s",
        stream=sys.stderr,  # logs go to stderr so stdout stays clean for protocol
    )

    import asyncio

    bridge = Bridge()
    asyncio.run(bridge.run())


if __name__ == "__main__":
    main()
