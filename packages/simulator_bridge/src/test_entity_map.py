"""Tests for entity_map — JSON entity definitions ↔ protobuf messages."""

from __future__ import annotations

from typing import Any

import pytest

from aioesphomeapi.api_pb2 import (
    ListEntitiesLightResponse,
    ListEntitiesSwitchResponse,
    ListEntitiesSensorResponse,
    ListEntitiesBinarySensorResponse,
    ListEntitiesFanResponse,
    ListEntitiesCoverResponse,
    ListEntitiesNumberResponse,
    ListEntitiesSelectResponse,
    ListEntitiesTextSensorResponse,
    ListEntitiesButtonResponse,
    LightStateResponse,
    SwitchStateResponse,
    SensorStateResponse,
    BinarySensorStateResponse,
    FanStateResponse,
    CoverStateResponse,
    NumberStateResponse,
    SelectStateResponse,
    TextSensorStateResponse,
    LightCommandRequest,
    SwitchCommandRequest,
    FanCommandRequest,
    CoverCommandRequest,
    NumberCommandRequest,
    SelectCommandRequest,
    ButtonCommandRequest,
)

from entity_map import (
    _stable_key,
    build_list_entity_response,
    build_state_response,
    command_to_json,
)


# ── Stable key tests ─────────────────────────────────────────────────────────


class TestStableKey:
    """Tests for _stable_key()."""

    def test_produces_positive_int(self) -> None:
        key = _stable_key("light.living_room")
        assert isinstance(key, int)
        assert key > 0

    def test_deterministic(self) -> None:
        assert _stable_key("sensor.temp") == _stable_key("sensor.temp")

    def test_different_ids_produce_different_keys(self) -> None:
        assert _stable_key("light.a") != _stable_key("light.b")

    def test_fits_in_uint32(self) -> None:
        key = _stable_key("some.very.long.entity_id.string")
        assert 0 <= key < 2**32


# ── build_list_entity_response tests ──────────────────────────────────────────


def _entity(domain: str, entity_id: str | None = None, **kw: Any) -> dict[str, Any]:
    """Helper to build a minimal entity definition dict."""
    eid = entity_id or f"{domain}.test"
    return {"domain": domain, "entity_id": eid, "name": f"Test {domain}", **kw}


class TestBuildListEntityResponse:
    """Tests for build_list_entity_response()."""

    @pytest.mark.parametrize(
        "domain, expected_type",
        [
            ("light", ListEntitiesLightResponse),
            ("switch", ListEntitiesSwitchResponse),
            ("sensor", ListEntitiesSensorResponse),
            ("binary_sensor", ListEntitiesBinarySensorResponse),
            ("fan", ListEntitiesFanResponse),
            ("cover", ListEntitiesCoverResponse),
            ("number", ListEntitiesNumberResponse),
            ("select", ListEntitiesSelectResponse),
            ("text_sensor", ListEntitiesTextSensorResponse),
            ("button", ListEntitiesButtonResponse),
        ],
    )
    def test_all_supported_domains(self, domain: str, expected_type: type) -> None:
        entity = _entity(domain)
        result = build_list_entity_response(entity)
        assert result is not None
        assert isinstance(result, expected_type)

    def test_unsupported_domain_returns_none(self) -> None:
        entity = _entity("climate", entity_id="climate.test")
        result = build_list_entity_response(entity)
        assert result is None

    def test_sets_key_name_object_id(self) -> None:
        entity = {
            "domain": "switch",
            "entity_id": "switch.kitchen",
            "name": "Kitchen Switch",
            "unique_id": "switch_kitchen_001",
        }
        result = build_list_entity_response(entity)
        assert result is not None
        assert result.name == "Kitchen Switch"
        assert result.object_id == "switch_kitchen_001"
        assert result.key == _stable_key("switch.kitchen")

    def test_light_has_color_modes(self) -> None:
        result = build_list_entity_response(_entity("light"))
        assert result is not None
        assert len(result.supported_color_modes) > 0

    def test_fan_supports_speed(self) -> None:
        result = build_list_entity_response(_entity("fan"))
        assert result is not None
        assert result.supports_speed is True

    def test_cover_supports_position(self) -> None:
        result = build_list_entity_response(_entity("cover"))
        assert result is not None
        assert result.supports_position is True

    def test_number_has_min_max_step(self) -> None:
        result = build_list_entity_response(_entity("number"))
        assert result is not None
        assert result.min_value == 0
        assert result.max_value == 100
        assert result.step == 1

    def test_device_class_passed_through(self) -> None:
        entity = _entity("sensor", device_class="temperature")
        result = build_list_entity_response(entity)
        assert result is not None
        assert result.device_class == "temperature"


# ── build_state_response tests ────────────────────────────────────────────────


class TestBuildStateResponse:
    """Tests for build_state_response()."""

    def test_light_on(self) -> None:
        resp = build_state_response("light.test", "light", "on")
        assert isinstance(resp, LightStateResponse)
        assert resp.state is True
        assert resp.brightness == 1.0

    def test_light_off(self) -> None:
        resp = build_state_response("light.test", "light", "off")
        assert isinstance(resp, LightStateResponse)
        assert resp.state is False
        assert resp.brightness == 0.0

    def test_light_brightness_from_attributes(self) -> None:
        resp = build_state_response("light.test", "light", "on", {"brightness": 128})
        assert isinstance(resp, LightStateResponse)
        assert abs(resp.brightness - 128 / 255.0) < 0.01

    def test_switch_on(self) -> None:
        resp = build_state_response("switch.test", "switch", "on")
        assert isinstance(resp, SwitchStateResponse)
        assert resp.state is True

    def test_switch_off(self) -> None:
        resp = build_state_response("switch.test", "switch", "off")
        assert isinstance(resp, SwitchStateResponse)
        assert resp.state is False

    def test_sensor_numeric(self) -> None:
        resp = build_state_response("sensor.temp", "sensor", "23.5")
        assert isinstance(resp, SensorStateResponse)
        assert abs(resp.state - 23.5) < 0.01
        assert resp.missing_state is False

    def test_sensor_non_numeric_defaults_to_zero(self) -> None:
        resp = build_state_response("sensor.temp", "sensor", "unavailable")
        assert isinstance(resp, SensorStateResponse)
        assert resp.state == 0.0

    def test_binary_sensor_on(self) -> None:
        resp = build_state_response("binary_sensor.door", "binary_sensor", "on")
        assert isinstance(resp, BinarySensorStateResponse)
        assert resp.state is True

    def test_binary_sensor_off(self) -> None:
        resp = build_state_response("binary_sensor.door", "binary_sensor", "off")
        assert isinstance(resp, BinarySensorStateResponse)
        assert resp.state is False

    def test_fan_state(self) -> None:
        resp = build_state_response("fan.test", "fan", "on", {"speed_level": 3})
        assert isinstance(resp, FanStateResponse)
        assert resp.state is True
        assert resp.speed_level == 3

    def test_cover_open(self) -> None:
        resp = build_state_response("cover.test", "cover", "open")
        assert isinstance(resp, CoverStateResponse)
        assert resp.position == 1.0

    def test_cover_closed(self) -> None:
        resp = build_state_response("cover.test", "cover", "closed")
        assert isinstance(resp, CoverStateResponse)
        assert resp.position == 0.0

    def test_number_state(self) -> None:
        resp = build_state_response("number.vol", "number", "75")
        assert isinstance(resp, NumberStateResponse)
        assert resp.state == 75.0

    def test_select_state(self) -> None:
        resp = build_state_response("select.mode", "select", "auto")
        assert isinstance(resp, SelectStateResponse)
        assert resp.state == "auto"

    def test_text_sensor_state(self) -> None:
        resp = build_state_response("text_sensor.version", "text_sensor", "1.2.3")
        assert isinstance(resp, TextSensorStateResponse)
        assert resp.state == "1.2.3"

    def test_unsupported_domain_returns_none(self) -> None:
        resp = build_state_response("climate.hvac", "climate", "cool")
        assert resp is None

    def test_key_matches_stable_key(self) -> None:
        entity_id = "light.living_room"
        resp = build_state_response(entity_id, "light", "on")
        assert resp.key == _stable_key(entity_id)

    @pytest.mark.parametrize("state_str", ["on", "ON", "true", "True", "1"])
    def test_truthy_states(self, state_str: str) -> None:
        resp = build_state_response("switch.test", "switch", state_str)
        assert isinstance(resp, SwitchStateResponse)
        assert resp.state is True

    @pytest.mark.parametrize("state_str", ["off", "OFF", "false", "False", "0"])
    def test_falsy_states(self, state_str: str) -> None:
        resp = build_state_response("switch.test", "switch", state_str)
        assert isinstance(resp, SwitchStateResponse)
        assert resp.state is False


# ── command_to_json tests ─────────────────────────────────────────────────────


def _entities_by_key(*entities: dict[str, Any]) -> dict[int, dict[str, Any]]:
    """Build the entities_by_key lookup from entity defs."""
    return {_stable_key(e["entity_id"]): e for e in entities}


class TestCommandToJson:
    """Tests for command_to_json()."""

    def test_light_turn_on(self) -> None:
        entity = _entity("light", entity_id="light.kitchen")
        lookup = _entities_by_key(entity)
        key = _stable_key("light.kitchen")
        cmd = LightCommandRequest(key=key, has_state=True, state=True, has_brightness=True, brightness=0.5)
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["entity_id"] == "light.kitchen"
        assert result["domain"] == "light"
        assert result["action"] == "turn_on"
        assert result["data"]["state"] is True
        assert result["data"]["brightness"] == 127  # int(0.5 * 255)

    def test_light_turn_off(self) -> None:
        entity = _entity("light", entity_id="light.kitchen")
        lookup = _entities_by_key(entity)
        key = _stable_key("light.kitchen")
        cmd = LightCommandRequest(key=key, has_state=True, state=False)
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["action"] == "turn_off"

    def test_switch_turn_on(self) -> None:
        entity = _entity("switch", entity_id="switch.relay")
        lookup = _entities_by_key(entity)
        key = _stable_key("switch.relay")
        cmd = SwitchCommandRequest(key=key, state=True)
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["action"] == "turn_on"
        assert result["domain"] == "switch"

    def test_switch_turn_off(self) -> None:
        entity = _entity("switch", entity_id="switch.relay")
        lookup = _entities_by_key(entity)
        key = _stable_key("switch.relay")
        cmd = SwitchCommandRequest(key=key, state=False)
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["action"] == "turn_off"

    def test_fan_command(self) -> None:
        entity = _entity("fan", entity_id="fan.ceiling")
        lookup = _entities_by_key(entity)
        key = _stable_key("fan.ceiling")
        cmd = FanCommandRequest(key=key, has_state=True, state=True, has_speed_level=True, speed_level=3)
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["data"]["speed_level"] == 3

    def test_cover_set_position(self) -> None:
        entity = _entity("cover", entity_id="cover.blinds")
        lookup = _entities_by_key(entity)
        key = _stable_key("cover.blinds")
        cmd = CoverCommandRequest(key=key, has_position=True, position=0.5)
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["action"] == "set_position"
        assert result["data"]["position"] == 0.5

    def test_cover_stop(self) -> None:
        entity = _entity("cover", entity_id="cover.blinds")
        lookup = _entities_by_key(entity)
        key = _stable_key("cover.blinds")
        cmd = CoverCommandRequest(key=key, stop=True)
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["action"] == "stop"

    def test_number_command(self) -> None:
        entity = _entity("number", entity_id="number.volume")
        lookup = _entities_by_key(entity)
        key = _stable_key("number.volume")
        cmd = NumberCommandRequest(key=key, state=42.0)
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["action"] == "set"
        assert result["data"]["value"] == 42.0

    def test_select_command(self) -> None:
        entity = _entity("select", entity_id="select.mode")
        lookup = _entities_by_key(entity)
        key = _stable_key("select.mode")
        cmd = SelectCommandRequest(key=key, state="eco")
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["action"] == "select"
        assert result["data"]["option"] == "eco"

    def test_button_command(self) -> None:
        entity = _entity("button", entity_id="button.restart")
        lookup = _entities_by_key(entity)
        key = _stable_key("button.restart")
        cmd = ButtonCommandRequest(key=key)
        result = command_to_json(cmd, lookup)
        assert result is not None
        assert result["action"] == "press"

    def test_unknown_entity_returns_none(self) -> None:
        cmd = SwitchCommandRequest(key=99999, state=True)
        result = command_to_json(cmd, {})
        assert result is None

    def test_missing_key_returns_none(self) -> None:
        """A message without a key attribute should return None."""
        from unittest import mock
        msg = mock.MagicMock(spec=[])  # No attributes at all
        result = command_to_json(msg, {})
        assert result is None
