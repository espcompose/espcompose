"""
ESPCompose Simulator Bridge — HA integration via ESPHome native API.

Runs a minimal ESPHome Native API server so Home Assistant can connect
to the simulator as if it were a real device. Entity definitions and state
updates flow in from Node via stdin JSON-lines; HA commands flow back out.
"""

from __future__ import annotations

import asyncio
import logging
import signal
import sys
from typing import Any

from google.protobuf.message import Message as ProtoMessage

from protocol import read_message, write_message
from native_api import NativeAPIServer
from entity_map import (
    build_list_entity_response,
    build_default_state,
    build_state_response,
    command_to_json,
    state_from_command,
    _stable_key,
)

logger = logging.getLogger("espcompose_bridge")


class Bridge:
    """Manages the bridge lifecycle between Node and the Native API server."""

    def __init__(self, enable_mdns: bool = True) -> None:
        self._running = True
        self._node_config: dict[str, Any] | None = None
        self._server: NativeAPIServer | None = None
        self._enable_mdns = enable_mdns
        # entity_key → entity definition dict (for command resolution)
        self._entities_by_key: dict[int, dict[str, Any]] = {}
        # entity_id → domain (for state updates)
        self._entity_domains: dict[str, str] = {}

    async def run(self) -> None:
        """Main loop: read messages from stdin, dispatch handlers."""
        loop = asyncio.get_running_loop()

        # Handle graceful shutdown
        for sig in (signal.SIGTERM, signal.SIGINT):
            loop.add_signal_handler(sig, self._request_shutdown)

        logger.info("Bridge process started, waiting for messages...")

        # Run stdin reader in thread so we don't block the event loop
        while self._running:
            msg = await loop.run_in_executor(None, read_message)
            if msg is None:
                logger.info("stdin closed, shutting down")
                break

            msg_type = msg.get("type")
            if msg_type == "define_node":
                await self._handle_define_node(msg.get("payload", {}))
            elif msg_type == "entity_state_update":
                self._handle_entity_state_update(msg.get("payload", {}))
            elif msg_type == "batch_entity_state_update":
                self._handle_batch_entity_state_update(msg.get("payload", {}))
            else:
                logger.warning("Unknown message type: %s", msg_type)

        await self._shutdown()

    async def _handle_define_node(self, payload: dict[str, Any]) -> None:
        """Handle define_node message — start the Native API server.

        `entities` are native device entities (light, switch, etc.) that the
        device owns and should expose to HA via the ESPHome API.

        `ha_entity_imports` are HA entities the device reads from HA
        (platform: homeassistant sensor imports) — stored for future use.
        """
        self._node_config = payload
        name = payload.get("name", "espcompose")
        mac_address = payload.get("mac_address", "AA:BB:CC:DD:EE:FF")
        port = payload.get("port", 6053)
        entities = payload.get("entities", [])
        ha_imports = payload.get("ha_entity_imports", [])

        logger.info(
            "Node defined: name=%s, native_entities=%d, ha_imports=%d, port=%d",
            name, len(entities), len(ha_imports), port,
        )

        # Build entity lookup tables
        self._entities_by_key.clear()
        self._entity_domains.clear()
        for entity in entities:
            key = _stable_key(entity["entity_id"])
            self._entities_by_key[key] = entity
            self._entity_domains[entity["entity_id"]] = entity.get("domain", "")

        # Build ListEntities responses
        list_responses = []
        for entity in entities:
            resp = build_list_entity_response(entity)
            if resp is not None:
                list_responses.append(resp)

        # Stop existing server if redefining
        if self._server is not None:
            await self._server.stop()

        # Create and start the server
        self._server = NativeAPIServer(
            device_name=name,
            mac_address=mac_address,
            port=port,
            on_command_callback=self._on_ha_command,
            on_client_connected_callback=self._on_ha_client_connected,
            on_client_disconnected_callback=self._on_ha_client_disconnected,
            enable_mdns=self._enable_mdns,
        )
        self._server.set_entities(list_responses)

        # Seed initial default states so HA gets a state response on SubscribeStates
        for entity in entities:
            state_msg = build_default_state(entity)
            if state_msg is not None:
                key = _stable_key(entity["entity_id"])
                self._server.update_state(key, state_msg)

        await self._server.start()

        # Signal readiness back to Node
        write_message({
            "type": "bridge_ready",
            "payload": {
                "port": port,
                "version": "0.2.0",
                "protocol_version": 1,
            },
        })

    def _handle_entity_state_update(self, payload: dict[str, Any]) -> None:
        """Handle single entity state update from Node → push to HA."""
        entity_id = payload.get("entity_id", "")
        state = payload.get("state", "")
        attributes = payload.get("attributes")
        domain = self._entity_domains.get(entity_id, "")

        if not domain:
            logger.warning("State update for unknown entity: %s", entity_id)
            return

        state_msg = build_state_response(entity_id, domain, state, attributes)
        if state_msg is not None and self._server is not None:
            key = _stable_key(entity_id)
            self._server.update_state(key, state_msg)

        logger.debug("Entity state update: %s = %s", entity_id, state)

    def _handle_batch_entity_state_update(self, payload: dict[str, Any]) -> None:
        """Handle batch entity state update from Node."""
        updates = payload.get("updates", [])
        for update in updates:
            self._handle_entity_state_update(update)

    def _on_ha_command(self, msg: ProtoMessage) -> None:
        """Handle a command from HA → forward to Node and update local state."""
        cmd = command_to_json(msg, self._entities_by_key)
        if cmd is not None:
            write_message({"type": "entity_command", "payload": cmd})
            logger.info("HA command: %s.%s → %s", cmd["domain"], cmd["action"], cmd["entity_id"])

        # Immediately update cached state so HA sees the change.
        # Real ESPHome devices emit a state response right after processing a command.
        result = state_from_command(msg, self._entities_by_key)
        if result is not None and self._server is not None:
            entity_key, state_msg = result
            self._server.update_state(entity_key, state_msg)

    def _on_ha_client_connected(self, address: str, client_info: str) -> None:
        """Notify Node that an HA client connected."""
        write_message({
            "type": "client_connected",
            "payload": {"address": address, "client_info": client_info},
        })
        logger.info("HA client connected: %s (%s)", client_info, address)

    def _on_ha_client_disconnected(self, address: str) -> None:
        """Notify Node that an HA client disconnected."""
        write_message({
            "type": "client_disconnected",
            "payload": {"address": address},
        })
        logger.info("HA client disconnected: %s", address)

    def _request_shutdown(self) -> None:
        logger.info("Shutdown requested")
        self._running = False

    async def _shutdown(self) -> None:
        """Clean shutdown of bridge resources."""
        if self._server is not None:
            await self._server.stop()
            self._server = None
        logger.info("Bridge shutdown complete")
