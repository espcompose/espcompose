# AUTO-GENERATED — DO NOT EDIT. Source: metadata/entity-domains.json

"""
Centralized entity domain metadata generated from entity-domains.json.
"""

from __future__ import annotations


# ── Domain metadata ──────────────────────────────────────────────────────────

DOMAINS: dict[str, dict] = {
    "light": {
        "sensor_platform": "binary_sensor",
        "default_state": "off",
        "active_state": "on",
        "ui_category": "toggleable",
    },
    "switch": {
        "sensor_platform": "binary_sensor",
        "default_state": "off",
        "active_state": "on",
        "ui_category": "toggleable",
    },
    "sensor": {
        "sensor_platform": "sensor",
        "default_state": "0",
        "active_state": None,
        "ui_category": "sensor",
    },
    "binary_sensor": {
        "sensor_platform": "binary_sensor",
        "default_state": "off",
        "active_state": "on",
        "ui_category": "binary",
    },
    "fan": {
        "sensor_platform": "binary_sensor",
        "default_state": "off",
        "active_state": "on",
        "ui_category": "toggleable",
    },
    "cover": {
        "sensor_platform": "binary_sensor",
        "default_state": "closed",
        "active_state": "open",
        "ui_category": "cover",
    },
    "number": {
        "sensor_platform": "sensor",
        "default_state": "0",
        "active_state": None,
        "ui_category": "sensor",
    },
    "select": {
        "sensor_platform": "text_sensor",
        "default_state": "",
        "active_state": None,
        "ui_category": "sensor",
    },
    "text_sensor": {
        "sensor_platform": "text_sensor",
        "default_state": "",
        "active_state": None,
        "ui_category": "sensor",
    },
    "button": {
        "sensor_platform": "binary_sensor",
        "default_state": "",
        "active_state": None,
        "ui_category": "button",
    },
    "lock": {
        "sensor_platform": "binary_sensor",
        "default_state": "locked",
        "active_state": "unlocked",
        "ui_category": "toggleable",
    },
    "climate": {
        "sensor_platform": "binary_sensor",
        "default_state": "off",
        "active_state": None,
        "ui_category": "sensor",
    },
}


KNOWN_DOMAINS: frozenset[str] = frozenset(DOMAINS.keys())


DEFAULT_STATES: dict[str, str] = {
    k: v["default_state"] for k, v in DOMAINS.items()
}


# Maps domain → action name → HA service suffix
ACTION_SERVICE_MAP: dict[str, dict[str, str]] = {
    "light": {"toggle": "toggle", "turnOn": "turn_on", "turnOff": "turn_off"},
    "switch": {"toggle": "toggle", "turnOn": "turn_on", "turnOff": "turn_off"},
    "fan": {"toggle": "toggle", "turnOn": "turn_on", "turnOff": "turn_off"},
    "cover": {"open": "open", "close": "close", "stop": "stop"},
    "button": {"press": "press"},
    "lock": {"lock": "lock", "unlock": "unlock"},
}


# Maps "domain.service" → expected result state (None = toggle/unknown)
ACTION_RESULT_STATES: dict[str, str | None] = {
    "light.toggle": None,
    "light.turn_on": "on",
    "light.turn_off": "off",
    "switch.toggle": None,
    "switch.turn_on": "on",
    "switch.turn_off": "off",
    "fan.toggle": None,
    "fan.turn_on": "on",
    "fan.turn_off": "off",
    "cover.open": "open",
    "cover.close": "closed",
    "cover.stop": None,
    "button.press": None,
    "lock.lock": "locked",
    "lock.unlock": "unlocked",
}
