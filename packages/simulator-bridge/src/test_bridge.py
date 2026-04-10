"""Tests for the Bridge class — message dispatch and server integration."""

from __future__ import annotations

import asyncio
import json
from typing import Any
from unittest import mock

import pytest

from bridge import Bridge
from entity_map import _stable_key


# ── Helpers ───────────────────────────────────────────────────────────────────


def _capture_writes() -> tuple[list[dict[str, Any]], mock.MagicMock]:
    """Patch write_message to capture all outbound messages."""
    captured: list[dict[str, Any]] = []

    def _capture(msg: dict[str, Any]) -> None:
        captured.append(msg)

    patcher = mock.patch("bridge.write_message", side_effect=_capture)
    return captured, patcher


SAMPLE_ENTITIES = [
    {"domain": "light", "entity_id": "light.living_room", "name": "Living Room"},
    {"domain": "switch", "entity_id": "switch.relay_1", "name": "Relay 1"},
    {"domain": "sensor", "entity_id": "sensor.temperature", "name": "Temperature"},
]


# ── Tests ─────────────────────────────────────────────────────────────────────


class TestBridgeInit:
    """Tests for Bridge initialization state."""

    def test_initial_state(self) -> None:
        bridge = Bridge(enable_mdns=False)
        assert bridge._running is True
        assert bridge._server is None
        assert bridge._entities_by_key == {}
        assert bridge._entity_domains == {}


class TestBridgeDefineNode:
    """Tests for _handle_define_node()."""

    @pytest.mark.asyncio
    async def test_starts_server_and_sends_ready(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test-device",
                "mac_address": "AA:BB:CC:DD:EE:FF",
                "port": 0,  # random free port
                "entities": SAMPLE_ENTITIES,
            })

        # Should have sent bridge_ready
        assert len(captured) == 1
        assert captured[0]["type"] == "bridge_ready"
        assert captured[0]["payload"]["version"] == "0.2.0"

        # Server should be running
        assert bridge._server is not None

        # Entity lookup tables should be populated
        assert len(bridge._entities_by_key) == 3
        assert bridge._entity_domains["light.living_room"] == "light"
        assert bridge._entity_domains["switch.relay_1"] == "switch"
        assert bridge._entity_domains["sensor.temperature"] == "sensor"

        # Cleanup
        await bridge._shutdown()

    @pytest.mark.asyncio
    async def test_entity_keys_are_stable(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
            })

        for entity in SAMPLE_ENTITIES:
            key = _stable_key(entity["entity_id"])
            assert key in bridge._entities_by_key
            assert bridge._entities_by_key[key]["entity_id"] == entity["entity_id"]

        await bridge._shutdown()

    @pytest.mark.asyncio
    async def test_redefine_stops_old_server(self) -> None:
        """Calling define_node twice should stop the first server."""
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "v1",
                "port": 0,
                "entities": SAMPLE_ENTITIES[:1],
            })
            first_server = bridge._server

            await bridge._handle_define_node({
                "name": "v2",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
            })

        assert bridge._server is not first_server
        assert len(captured) == 2  # Two bridge_ready messages

        await bridge._shutdown()


class TestBridgeStateUpdates:
    """Tests for entity state update handling."""

    @pytest.mark.asyncio
    async def test_state_update_known_entity(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
            })

        # Update state for a known entity
        bridge._handle_entity_state_update({
            "entity_id": "light.living_room",
            "state": "on",
            "attributes": {"brightness": 200},
        })

        # Verify state was cached in server (3 default + 1 updated = 3 unique keys)
        key = _stable_key("light.living_room")
        states = bridge._server.current_state_responses()
        assert len(states) == len(SAMPLE_ENTITIES)
        # The updated light entity should reflect the new state
        state_by_key = {s.key: s for s in states}
        assert key in state_by_key
        assert state_by_key[key].state is True  # "on"

        await bridge._shutdown()

    @pytest.mark.asyncio
    async def test_state_update_unknown_entity_ignored(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
            })

        # Should not crash on unknown entity
        bridge._handle_entity_state_update({
            "entity_id": "light.nonexistent",
            "state": "on",
        })

        # Only default-seeded states should exist (no new one for nonexistent)
        assert len(bridge._server.current_state_responses()) == len(SAMPLE_ENTITIES)

        await bridge._shutdown()

    @pytest.mark.asyncio
    async def test_batch_state_update(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
            })

        bridge._handle_batch_entity_state_update({
            "updates": [
                {"entity_id": "light.living_room", "state": "on"},
                {"entity_id": "switch.relay_1", "state": "off"},
                {"entity_id": "sensor.temperature", "state": "22.5"},
            ],
        })

        assert len(bridge._server.current_state_responses()) == 3

        await bridge._shutdown()


class TestBridgeCommands:
    """Tests for HA command forwarding to Node."""

    @pytest.mark.asyncio
    async def test_command_forwarded_as_entity_command(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
            })

        from aioesphomeapi.api_pb2 import SwitchCommandRequest

        key = _stable_key("switch.relay_1")
        cmd = SwitchCommandRequest(key=key, state=True)

        with patcher:
            bridge._on_ha_command(cmd)

        # Should have written an entity_command message
        cmd_msgs = [m for m in captured if m["type"] == "entity_command"]
        assert len(cmd_msgs) == 1
        assert cmd_msgs[0]["payload"]["entity_id"] == "switch.relay_1"
        assert cmd_msgs[0]["payload"]["action"] == "turn_on"

        await bridge._shutdown()


class TestBridgeClientCallbacks:
    """Tests for HA client connect/disconnect notification."""

    @pytest.mark.asyncio
    async def test_client_connected_sends_message(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            bridge._on_ha_client_connected("127.0.0.1:5555", "homeassistant")

        assert len(captured) == 1
        assert captured[0]["type"] == "client_connected"
        assert captured[0]["payload"]["address"] == "127.0.0.1:5555"
        assert captured[0]["payload"]["client_info"] == "homeassistant"

    @pytest.mark.asyncio
    async def test_client_disconnected_sends_message(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            bridge._on_ha_client_disconnected("127.0.0.1:5555")

        assert len(captured) == 1
        assert captured[0]["type"] == "client_disconnected"
        assert captured[0]["payload"]["address"] == "127.0.0.1:5555"


class TestBridgeShutdown:
    """Tests for graceful shutdown."""

    @pytest.mark.asyncio
    async def test_shutdown_stops_server(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": [],
            })

        assert bridge._server is not None
        await bridge._shutdown()
        assert bridge._server is None

    @pytest.mark.asyncio
    async def test_shutdown_without_server_is_safe(self) -> None:
        bridge = Bridge(enable_mdns=False)
        assert bridge._server is None
        await bridge._shutdown()  # Should not raise
        assert bridge._server is None


SAMPLE_HA_IMPORTS = [
    {"entity_id": "light.office", "domain": "light", "generated_id": "ha_light_office"},
    {"entity_id": "switch.fan", "domain": "switch", "generated_id": "ha_switch_fan"},
]


class TestBridgeHAImportActions:
    """Tests for HA entity import action forwarding (device → HA service calls)."""

    @pytest.mark.asyncio
    async def test_ha_import_domains_populated(self) -> None:
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
                "ha_entity_imports": SAMPLE_HA_IMPORTS,
            })

        assert bridge._ha_import_domains["light.office"] == "light"
        assert bridge._ha_import_domains["switch.fan"] == "switch"
        # Native entities should not be in ha_import_domains
        assert "light.living_room" not in bridge._ha_import_domains

        await bridge._shutdown()

    @pytest.mark.asyncio
    async def test_ha_import_action_sends_ha_action(self) -> None:
        """Button click on an HA import entity should send HomeassistantActionRequest."""
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
                "ha_entity_imports": SAMPLE_HA_IMPORTS,
            })

        # Mock send_ha_action on the server to capture calls
        calls: list[tuple[str, dict]] = []
        original_send = bridge._server.send_ha_action
        def mock_send(service: str, data: dict | None = None) -> None:
            calls.append((service, data or {}))
        bridge._server.send_ha_action = mock_send

        # Simulate a button click interaction for an HA import entity
        bridge._handle_entity_state_update({
            "entity_id": "light.office",
            "state": "",
            "action": "toggle",
        })

        assert len(calls) == 1
        assert calls[0][0] == "light.toggle"
        assert calls[0][1]["entity_id"] == "light.office"

        await bridge._shutdown()

    @pytest.mark.asyncio
    async def test_ha_import_action_with_data(self) -> None:
        """HA import actions should forward extra data attributes."""
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
                "ha_entity_imports": SAMPLE_HA_IMPORTS,
            })

        calls: list[tuple[str, dict]] = []
        bridge._server.send_ha_action = lambda service, data=None: calls.append((service, data or {}))

        bridge._handle_entity_state_update({
            "entity_id": "light.office",
            "state": "",
            "action": "turn_on",
            "attributes": {"brightness": 200, "entity_id": "light.office"},
        })

        assert len(calls) == 1
        assert calls[0][0] == "light.turn_on"
        assert calls[0][1]["entity_id"] == "light.office"
        assert calls[0][1]["brightness"] == "200"

        await bridge._shutdown()

    @pytest.mark.asyncio
    async def test_native_entity_still_uses_state_update(self) -> None:
        """Device-owned entity interactions should still push state updates, not HA actions."""
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "test",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
                "ha_entity_imports": SAMPLE_HA_IMPORTS,
            })

        calls: list[tuple[str, dict]] = []
        bridge._server.send_ha_action = lambda service, data=None: calls.append((service, data or {}))

        # Action on a NATIVE entity → should NOT call send_ha_action
        bridge._handle_entity_state_update({
            "entity_id": "light.living_room",
            "state": "",
            "action": "toggle",
        })

        assert len(calls) == 0  # Should use state update path instead
        # Verify state was updated
        key = _stable_key("light.living_room")
        state = bridge._server.get_state(key)
        assert state is not None

        await bridge._shutdown()

    @pytest.mark.asyncio
    async def test_redefine_clears_ha_imports(self) -> None:
        """Redefining the node should clear previous HA import domains."""
        captured, patcher = _capture_writes()
        bridge = Bridge(enable_mdns=False)

        with patcher:
            await bridge._handle_define_node({
                "name": "v1",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
                "ha_entity_imports": SAMPLE_HA_IMPORTS,
            })

        assert "light.office" in bridge._ha_import_domains

        with patcher:
            await bridge._handle_define_node({
                "name": "v2",
                "port": 0,
                "entities": SAMPLE_ENTITIES,
                "ha_entity_imports": [],  # No HA imports this time
            })

        assert "light.office" not in bridge._ha_import_domains

        await bridge._shutdown()
