"""
Entity mapping — JSON entity definitions → protobuf messages.

Converts the EntityDefinition objects received from Node into:
  1. ListEntities*Response protobuf messages (for entity discovery)
  2. *StateResponse protobuf messages (for state updates)
"""

from __future__ import annotations

import hashlib
import logging
from typing import Any

from google.protobuf.message import Message as ProtoMessage

from aioesphomeapi.api_pb2 import (  # type: ignore
    # Light
    ListEntitiesLightResponse,
    LightStateResponse,
    LightCommandRequest,
    # Switch
    ListEntitiesSwitchResponse,
    SwitchStateResponse,
    SwitchCommandRequest,
    # Sensor
    ListEntitiesSensorResponse,
    SensorStateResponse,
    # Binary sensor
    ListEntitiesBinarySensorResponse,
    BinarySensorStateResponse,
    # Fan
    ListEntitiesFanResponse,
    FanStateResponse,
    FanCommandRequest,
    # Cover
    ListEntitiesCoverResponse,
    CoverStateResponse,
    CoverCommandRequest,
    # Number
    ListEntitiesNumberResponse,
    NumberStateResponse,
    NumberCommandRequest,
    # Select
    ListEntitiesSelectResponse,
    SelectStateResponse,
    SelectCommandRequest,
    # Text sensor
    ListEntitiesTextSensorResponse,
    TextSensorStateResponse,
    # Button
    ListEntitiesButtonResponse,
    ButtonCommandRequest,
)

from generated.entity_domains import DEFAULT_STATES

logger = logging.getLogger("espcompose_bridge.entity_map")


def _stable_key(entity_id: str) -> int:
    """Generate a stable uint32 key from an entity ID string."""
    return int(hashlib.md5(entity_id.encode()).hexdigest()[:8], 16)


# ── Entity definition → ListEntities*Response ─────────────────────────────────

def build_list_entity_response(entity: dict[str, Any]) -> ProtoMessage | None:
    """Build a ListEntities*Response for a single entity definition."""
    domain = entity.get("domain", "")
    entity_id = entity.get("entity_id", "")
    name = entity.get("name", entity_id)
    unique_id = entity.get("unique_id", entity_id)
    key = _stable_key(entity_id)
    device_class = entity.get("device_class", "")

    builder = _LIST_ENTITY_BUILDERS.get(domain)
    if builder is None:
        logger.warning("Unsupported entity domain: %s (%s)", domain, entity_id)
        return None

    return builder(key=key, name=name, unique_id=unique_id, device_class=device_class)


def _build_light(key: int, name: str, unique_id: str, **_: Any) -> ProtoMessage:
    return ListEntitiesLightResponse(
        object_id=unique_id,
        key=key,
        name=name,
        supported_color_modes=[1, 3],  # ON_OFF, BRIGHTNESS
        min_mireds=153,
        max_mireds=500,
    )


def _build_switch(key: int, name: str, unique_id: str, **_: Any) -> ProtoMessage:
    return ListEntitiesSwitchResponse(
        object_id=unique_id,
        key=key,
        name=name,
    )


def _build_sensor(key: int, name: str, unique_id: str, device_class: str = "", **_: Any) -> ProtoMessage:
    return ListEntitiesSensorResponse(
        object_id=unique_id,
        key=key,
        name=name,
        device_class=device_class,
        state_class=1,  # MEASUREMENT
        unit_of_measurement="",
        accuracy_decimals=1,
    )


def _build_binary_sensor(key: int, name: str, unique_id: str, device_class: str = "", **_: Any) -> ProtoMessage:
    return ListEntitiesBinarySensorResponse(
        object_id=unique_id,
        key=key,
        name=name,
        device_class=device_class,
    )


def _build_fan(key: int, name: str, unique_id: str, **_: Any) -> ProtoMessage:
    return ListEntitiesFanResponse(
        object_id=unique_id,
        key=key,
        name=name,
        supports_speed=True,
    )


def _build_cover(key: int, name: str, unique_id: str, device_class: str = "", **_: Any) -> ProtoMessage:
    return ListEntitiesCoverResponse(
        object_id=unique_id,
        key=key,
        name=name,
        device_class=device_class,
        supports_position=True,
    )


def _build_number(key: int, name: str, unique_id: str, **_: Any) -> ProtoMessage:
    return ListEntitiesNumberResponse(
        object_id=unique_id,
        key=key,
        name=name,
        min_value=0,
        max_value=100,
        step=1,
    )


def _build_select(key: int, name: str, unique_id: str, **_: Any) -> ProtoMessage:
    return ListEntitiesSelectResponse(
        object_id=unique_id,
        key=key,
        name=name,
    )


def _build_text_sensor(key: int, name: str, unique_id: str, **_: Any) -> ProtoMessage:
    return ListEntitiesTextSensorResponse(
        object_id=unique_id,
        key=key,
        name=name,
    )


def _build_button(key: int, name: str, unique_id: str, device_class: str = "", **_: Any) -> ProtoMessage:
    return ListEntitiesButtonResponse(
        object_id=unique_id,
        key=key,
        name=name,
        device_class=device_class,
    )


_LIST_ENTITY_BUILDERS = {
    "light": _build_light,
    "switch": _build_switch,
    "sensor": _build_sensor,
    "binary_sensor": _build_binary_sensor,
    "fan": _build_fan,
    "cover": _build_cover,
    "number": _build_number,
    "select": _build_select,
    "text_sensor": _build_text_sensor,
    "button": _build_button,
}


# ── State update → *StateResponse ─────────────────────────────────────────────

def build_state_response(
    entity_id: str,
    domain: str,
    state: str,
    attributes: dict[str, Any] | None = None,
) -> ProtoMessage | None:
    """Build a *StateResponse protobuf message from a state update."""
    key = _stable_key(entity_id)
    attrs = attributes or {}

    builder = _STATE_BUILDERS.get(domain)
    if builder is None:
        logger.warning("Unsupported state domain: %s (%s)", domain, entity_id)
        return None

    return builder(key=key, state=state, attrs=attrs)


def _build_light_state(key: int, state: str, attrs: dict[str, Any]) -> ProtoMessage:
    is_on = state.lower() in ("on", "true", "1")
    brightness = attrs.get("brightness", 255 if is_on else 0)
    # Normalize brightness to 0.0-1.0
    if isinstance(brightness, (int, float)) and brightness > 1:
        brightness = brightness / 255.0
    return LightStateResponse(
        key=key,
        state=is_on,
        brightness=float(brightness),
        color_mode=3 if is_on else 0,  # BRIGHTNESS when on
    )


def _build_switch_state(key: int, state: str, attrs: dict[str, Any]) -> ProtoMessage:
    return SwitchStateResponse(
        key=key,
        state=state.lower() in ("on", "true", "1"),
    )


def _build_sensor_state(key: int, state: str, attrs: dict[str, Any]) -> ProtoMessage:
    try:
        value = float(state)
    except (ValueError, TypeError):
        value = 0.0
    return SensorStateResponse(
        key=key,
        state=value,
        missing_state=False,
    )


def _build_binary_sensor_state(key: int, state: str, attrs: dict[str, Any]) -> ProtoMessage:
    return BinarySensorStateResponse(
        key=key,
        state=state.lower() in ("on", "true", "1"),
        missing_state=False,
    )


def _build_fan_state(key: int, state: str, attrs: dict[str, Any]) -> ProtoMessage:
    return FanStateResponse(
        key=key,
        state=state.lower() in ("on", "true", "1"),
        speed_level=int(attrs.get("speed_level", 0)),
    )


def _build_cover_state(key: int, state: str, attrs: dict[str, Any]) -> ProtoMessage:
    position = float(attrs.get("position", 1.0 if state == "open" else 0.0))
    return CoverStateResponse(
        key=key,
        position=position,
        current_operation=0,  # IDLE
    )


def _build_number_state(key: int, state: str, attrs: dict[str, Any]) -> ProtoMessage:
    try:
        value = float(state)
    except (ValueError, TypeError):
        value = 0.0
    return NumberStateResponse(
        key=key,
        state=value,
        missing_state=False,
    )


def _build_select_state(key: int, state: str, attrs: dict[str, Any]) -> ProtoMessage:
    return SelectStateResponse(
        key=key,
        state=state,
        missing_state=False,
    )


def _build_text_sensor_state(key: int, state: str, attrs: dict[str, Any]) -> ProtoMessage:
    return TextSensorStateResponse(
        key=key,
        state=state,
        missing_state=False,
    )


_STATE_BUILDERS = {
    "light": _build_light_state,
    "switch": _build_switch_state,
    "sensor": _build_sensor_state,
    "binary_sensor": _build_binary_sensor_state,
    "fan": _build_fan_state,
    "cover": _build_cover_state,
    "number": _build_number_state,
    "select": _build_select_state,
    "text_sensor": _build_text_sensor_state,
}

def build_default_state(entity: dict[str, Any]) -> ProtoMessage | None:
    """Build a default *StateResponse for an entity definition."""
    domain = entity.get("domain", "")
    entity_id = entity.get("entity_id", "")
    default = DEFAULT_STATES.get(domain)
    if default is None:
        return None
    return build_state_response(entity_id, domain, default)


# ── Command → JSON (for forwarding to Node) ──────────────────────────────────

def command_to_json(msg: ProtoMessage, entities: dict[int, dict[str, Any]]) -> dict[str, Any] | None:
    """Convert a *CommandRequest protobuf into a JSON payload for Node."""
    key = getattr(msg, "key", None)
    if key is None:
        return None

    entity = entities.get(key)
    if entity is None:
        logger.warning("Command for unknown entity key %d", key)
        return None

    entity_id = entity["entity_id"]
    domain = entity["domain"]

    if isinstance(msg, LightCommandRequest):
        data: dict[str, Any] = {}
        if msg.has_state:
            data["state"] = msg.state
        if msg.has_brightness:
            data["brightness"] = int(msg.brightness * 255)
        if msg.has_color_temperature:
            data["color_temp"] = msg.color_temperature
        action = "turn_on" if msg.state else "turn_off"
        return {"entity_id": entity_id, "domain": domain, "action": action, "data": data}

    elif isinstance(msg, SwitchCommandRequest):
        return {"entity_id": entity_id, "domain": domain, "action": "turn_on" if msg.state else "turn_off"}

    elif isinstance(msg, FanCommandRequest):
        data = {}
        if msg.has_state:
            data["state"] = msg.state
        if msg.has_speed_level:
            data["speed_level"] = msg.speed_level
        action = "turn_on" if msg.state else "turn_off"
        return {"entity_id": entity_id, "domain": domain, "action": action, "data": data}

    elif isinstance(msg, CoverCommandRequest):
        if msg.has_position:
            return {"entity_id": entity_id, "domain": domain, "action": "set_position", "data": {"position": msg.position}}
        if msg.stop:
            return {"entity_id": entity_id, "domain": domain, "action": "stop"}
        return {"entity_id": entity_id, "domain": domain, "action": "open" if msg.position > 0 else "close"}

    elif isinstance(msg, NumberCommandRequest):
        return {"entity_id": entity_id, "domain": domain, "action": "set", "data": {"value": msg.state}}

    elif isinstance(msg, SelectCommandRequest):
        return {"entity_id": entity_id, "domain": domain, "action": "select", "data": {"option": msg.state}}

    elif isinstance(msg, ButtonCommandRequest):
        return {"entity_id": entity_id, "domain": domain, "action": "press"}

    return None


def state_from_command(msg: ProtoMessage, entities: dict[int, dict[str, Any]]) -> tuple[int, ProtoMessage] | None:
    """Derive a state response from a command message.

    Returns (entity_key, state_msg) or None if unhandled.
    Real ESPHome devices immediately emit state after processing a command;
    this mirrors that behaviour so HA doesn't revert to the stale cached state.
    """
    key = getattr(msg, "key", None)
    if key is None:
        return None

    entity = entities.get(key)
    if entity is None:
        return None

    domain = entity["domain"]

    if isinstance(msg, LightCommandRequest):
        is_on = msg.state if msg.has_state else True
        brightness = msg.brightness if msg.has_brightness else (1.0 if is_on else 0.0)
        state_msg = LightStateResponse(
            key=key,
            state=is_on,
            brightness=float(brightness),
            color_mode=3 if is_on else 0,
        )
        return key, state_msg

    elif isinstance(msg, SwitchCommandRequest):
        return key, SwitchStateResponse(key=key, state=msg.state)

    elif isinstance(msg, FanCommandRequest):
        is_on = msg.state if msg.has_state else True
        state_msg = FanStateResponse(key=key, state=is_on)
        if msg.has_speed_level:
            state_msg.speed_level = msg.speed_level
        return key, state_msg

    elif isinstance(msg, CoverCommandRequest):
        position = msg.position if msg.has_position else 0.0
        return key, CoverStateResponse(key=key, position=position, current_operation=0)

    elif isinstance(msg, NumberCommandRequest):
        return key, NumberStateResponse(key=key, state=msg.state, missing_state=False)

    elif isinstance(msg, SelectCommandRequest):
        return key, SelectStateResponse(key=key, state=msg.state, missing_state=False)

    return None
