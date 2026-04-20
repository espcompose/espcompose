#!/usr/bin/env python3
"""
Extract LVGL schema information from the ESPHome Python source.

This script imports the LVGL component modules from the local ESPHome clone
and introspects the live Python objects (WIDGET_TYPES, STYLE_PROPS, LvConstant
instances, etc.) to produce a structured JSON file that the TypeScript codegen
can consume.

Usage:
    .cache/venv/bin/python packages/esphome-codegen/src/extract_lvgl_schema.py \
        --esphome-path .cache/esphome \
        --output .cache/schemas/lvgl-schema.json
"""

import argparse
import json
import sys
from pathlib import Path


def setup_esphome_env(esphome_path: str) -> None:
    """Add ESPHome to sys.path and configure minimal environment."""
    sys.path.insert(0, esphome_path)
    # ESPHome's schema_extractors need this flag
    import esphome.schema_extractors
    esphome.schema_extractors.EnableSchemaExtraction = True


# ── Validator type mapping ──────────────────────────────────────────────────

def classify_validator(validator) -> dict:
    """
    Inspect a voluptuous/ESPHome validator and return a type descriptor dict.
    Returns {"type": "<type_name>", ...} with optional extra keys like "values".
    """
    from esphome.components.lvgl.defines import LvConstant, LValidator
    from esphome.schema_extractors import SCHEMA_EXTRACT
    import esphome.config_validation as cv

    # Unwrap LValidator.one_of / .several_of wrappers
    if isinstance(validator, LValidator):
        if isinstance(validator, LvConstant):
            return {"type": "enum", "values": list(validator.choices)}
        # Try to call with SCHEMA_EXTRACT to get choices from schema_extractor-decorated validators
        try:
            result = validator.validator(SCHEMA_EXTRACT)
            if isinstance(result, (list, tuple)) and len(result) > 0:
                # Handle [('A', 'B', 'C')] — list of one tuple → unwrap as enum choices
                if len(result) == 1 and isinstance(result[0], tuple):
                    values = [str(v) for v in result[0]]
                    return {"type": "enum", "values": values}
                values = [str(v) for v in result]
                # Filter out Python repr contamination
                if any("object at" in v or v.startswith("(") for v in values):
                    pass  # Fall through to identity checks
                # If all values look like enum constants (short uppercase), treat as enum
                elif all(v.replace("_", "").replace(" ", "").isalnum() for v in values):
                    return {"type": "enum", "values": values}
        except Exception:
            pass
        # Try to identify known validators by their inner validator
        inner = validator.validator
        result = _classify_inner(inner, validator)
        if result["type"] != "unknown":
            return result
        # Fall back to identity check on the wrapper itself
        return _classify_by_identity(validator)

    return _classify_inner(validator, None)


def _classify_by_identity(validator) -> dict:
    """Check known module-level validator objects by identity."""
    from esphome.components.lvgl import lv_validation as lvalid

    known_validators = {
        id(lvalid.lv_bool): "boolean",
        id(lvalid.lv_int): "integer",
        id(lvalid.lv_positive_int): "positive_integer",
        id(lvalid.lv_float): "float",
        id(lvalid.lv_color): "color",
        id(lvalid.opacity): "opacity",
        id(lvalid.lv_font): "font",
        id(lvalid.lv_image): "image",
        id(lvalid.lv_text): "string",
        id(lvalid.pixels): "pixels",
        id(lvalid.pixels_or_percent): "pixels_or_percent",
        id(lvalid.padding): "padding",
        id(lvalid.size): "size",
        id(lvalid.scale): "scale",
        id(lvalid.lv_angle): "angle",
        id(lvalid.lv_angle_degrees): "angle",
        id(lvalid.lv_milliseconds): "milliseconds",
        id(lvalid.lv_fraction): "fraction",
        id(lvalid.lv_gradient): "gradient",
    }

    type_name = known_validators.get(id(validator))
    if type_name:
        return {"type": type_name}
    return {"type": "unknown"}


def _classify_inner(validator, lv_wrapper) -> dict:
    """Classify a raw validator function/object."""
    import esphome.config_validation as cv
    from esphome.components.lvgl.defines import LvConstant, LValidator
    from esphome.schema_extractors import SCHEMA_EXTRACT

    # First try identity check against known validators
    if lv_wrapper is not None:
        result = _classify_by_identity(lv_wrapper)
        if result["type"] != "unknown":
            return result

    result = _classify_by_identity(validator)
    if result["type"] != "unknown":
        return result

    # Check for LvConstant one_of / several_of
    if isinstance(validator, LValidator) and isinstance(validator, LvConstant):
        return {"type": "enum", "values": list(validator.choices)}
    if isinstance(validator, LValidator):
        # Try SCHEMA_EXTRACT on the inner validator
        try:
            inner_result = validator.validator(SCHEMA_EXTRACT)
            if isinstance(inner_result, (list, tuple)) and len(inner_result) > 0:
                # Handle [('A', 'B', 'C')] — list of one tuple
                if len(inner_result) == 1 and isinstance(inner_result[0], tuple):
                    values = [str(v) for v in inner_result[0]]
                    return {"type": "enum", "values": values}
                values = [str(v) for v in inner_result]
                # Filter out Python repr contamination
                if not any("object at" in v or v.startswith("(") for v in values):
                    return {"type": "enum", "values": values}
        except Exception:
            pass
        return {"type": "unknown"}

    # cv module validators
    if validator is cv.boolean:
        return {"type": "boolean"}
    if validator is cv.string or validator is cv.string_strict:
        return {"type": "string"}
    if validator is cv.int_:
        return {"type": "integer"}
    if validator is cv.positive_int:
        return {"type": "positive_integer"}
    if validator is cv.float_:
        return {"type": "float"}
    if validator is cv.percentage:
        return {"type": "percentage"}
    if validator is cv.uint8_t:
        return {"type": "uint8"}

    # Check if it's a bool
    if validator is bool:
        return {"type": "boolean"}

    # Check for schema_extractor decorated functions — try calling with SCHEMA_EXTRACT
    try:
        result = validator(SCHEMA_EXTRACT)
        if isinstance(result, (list, tuple)) and len(result) > 0:
            # Handle [('A', 'B', 'C')] — list of one tuple → unwrap as enum choices
            if len(result) == 1 and isinstance(result[0], tuple):
                values = [str(v) for v in result[0]]
                return {"type": "enum", "values": values}
            values = [str(v) for v in result]
            # Filter out Python repr contamination (object addresses, tuple reprs)
            if any("object at" in v or v.startswith("(") for v in values):
                return {"type": "unknown"}
            return {"type": "enum", "values": values}
    except Exception:
        pass

    return {"type": "unknown"}


# ── Schema introspection ────────────────────────────────────────────────────

def extract_schema_keys(schema) -> dict:
    """
    Extract config keys from a voluptuous Schema object.
    Returns a dict of {key_name: {type, key, default?, values?}}.
    """
    import esphome.config_validation as cv

    result = {}
    if schema is None:
        return result

    # Get the raw schema dict
    raw = None
    if hasattr(schema, "schema"):
        raw = schema.schema
    elif isinstance(schema, dict):
        raw = schema

    if not raw:
        return result

    for key, validator in raw.items():
        key_name = str(key)
        key_type = "Optional"
        default = None

        # Extract key metadata
        if isinstance(key, cv.Optional):
            key_type = "Optional"
            key_name = str(key.key) if hasattr(key, "key") else str(key)
            if hasattr(key, "default") and key.default is not cv.UNDEFINED:
                default = key.default
                if callable(default) and not isinstance(default, (str, int, float, bool)):
                    default = None
        elif isinstance(key, cv.Required):
            key_type = "Required"
            key_name = str(key.key) if hasattr(key, "key") else str(key)
        elif isinstance(key, cv.GenerateID):
            continue  # Skip generated IDs
        elif isinstance(key, str):
            key_name = key
        else:
            key_name = str(key)

        # Skip internal keys
        if key_name.startswith("_") or key_name == "id":
            continue

        info = classify_validator(validator)
        info["key"] = key_type
        if default is not None:
            info["default"] = str(default)

        result[key_name] = info

    return result


# ── Main extraction ─────────────────────────────────────────────────────────

def extract_widgets() -> dict:
    """Extract all widget types from WIDGET_TYPES."""
    from esphome.components.lvgl.schemas import WIDGET_TYPES

    widgets = {}
    for name, wtype in WIDGET_TYPES.items():
        widget_info = {
            "parts": list(wtype.parts),
            "schema": extract_schema_keys(wtype.schema),
        }
        # Add C++ type name
        if hasattr(wtype, "w_type") and hasattr(wtype.w_type, "base"):
            widget_info["cpp_type"] = str(wtype.w_type.base)
        # Check for compound widget
        if hasattr(wtype, "is_compound") and wtype.is_compound():
            widget_info["is_compound"] = True
        widgets[name] = widget_info

    return widgets


def extract_style_props() -> dict:
    """Extract all style properties from STYLE_PROPS."""
    from esphome.components.lvgl.schemas import STYLE_PROPS

    props = {}
    for name, validator in STYLE_PROPS.items():
        props[name] = classify_validator(validator)
    return props


def extract_enums() -> dict:
    """Extract all LvConstant enum definitions from defines.py."""
    from esphome.components.lvgl import defines as df

    enums = {}
    for attr_name in dir(df):
        obj = getattr(df, attr_name)
        if isinstance(obj, df.LvConstant):
            enums[attr_name] = {
                "prefix": obj.prefix,
                "choices": list(obj.choices),
            }
    return enums


def extract_constants() -> dict:
    """Extract STATES, PARTS, OBJ_FLAGS tuples."""
    from esphome.components.lvgl.defines import STATES, PARTS, OBJ_FLAGS

    return {
        "states": list(STATES),
        "parts": list(PARTS),
        "obj_flags": list(OBJ_FLAGS),
    }


def extract_events() -> dict:
    """Extract event trigger names."""
    from esphome.components.lvgl.defines import LV_EVENT_TRIGGERS, SWIPE_TRIGGERS

    return {
        "event_triggers": list(LV_EVENT_TRIGGERS),
        "swipe_triggers": list(SWIPE_TRIGGERS),
    }


def extract_fonts() -> list:
    """Extract built-in LVGL font list."""
    from esphome.components.lvgl.defines import LV_FONTS
    return list(LV_FONTS)


def extract_top_level_schema() -> dict:
    """
    Extract the top-level LVGL_SCHEMA keys.
    This requires importing __init__.py which triggers all widget registrations.
    """
    # The LVGL_SCHEMA is complex (uses container_schema with lazy evaluation).
    # Rather than trying to fully introspect the voluptuous schema chain,
    # we extract the known keys from the Python source definition.
    # These are stable and well-documented in the ESPHome LVGL component.
    return {
        "displays": {"type": "use_id_list", "key": "Required"},
        "color_depth": {"type": "enum", "key": "Optional", "values": ["16"], "default": "16"},
        "default_font": {"type": "font", "key": "Optional", "default": "montserrat_14"},
        "full_refresh": {"type": "boolean", "key": "Optional", "default": "false"},
        "update_when_display_idle": {"type": "boolean", "key": "Optional", "default": "false"},
        "draw_rounding": {"type": "positive_integer", "key": "Optional", "default": "2"},
        "buffer_size": {"type": "percentage", "key": "Optional", "default": "0"},
        "log_level": {
            "type": "enum", "key": "Optional",
            "values": ["VERBOSE", "DEBUG", "INFO", "WARN", "ERROR", "NONE"],
            "default": "WARN",
        },
        "byte_order": {
            "type": "enum", "key": "Optional",
            "values": ["big_endian", "little_endian"],
            "default": "big_endian",
        },
        "style_definitions": {"type": "style_list", "key": "Optional"},
        "pages": {"type": "page_list", "key": "Optional"},
        "msgboxes": {"type": "msgbox_list", "key": "Optional"},
        "page_wrap": {"type": "boolean", "key": "Optional", "default": "true"},
        "top_layer": {"type": "widget_container", "key": "Optional"},
        "transparency_key": {"type": "color", "key": "Optional", "default": "0x000400"},
        "theme": {"type": "theme", "key": "Optional"},
        "gradients": {"type": "gradient_list", "key": "Optional"},
        "touchscreens": {"type": "touchscreen_config", "key": "Optional"},
        "encoders": {"type": "encoder_config", "key": "Optional"},
        "keypads": {"type": "keypad_config", "key": "Optional"},
        "resume_on_input": {"type": "boolean", "key": "Optional", "default": "true"},
        "disp_bg_image": {"type": "image", "key": "Optional"},
        "disp_bg_color": {"type": "color", "key": "Optional"},
        "disp_bg_opa": {"type": "opacity", "key": "Optional"},
    }


def extract_page_schema() -> dict:
    """Extract page-specific schema keys."""
    return {
        "skip": {"type": "boolean", "key": "Optional", "default": "false"},
        "on_load": {"type": "automation", "key": "Optional"},
        "on_unload": {"type": "automation", "key": "Optional"},
    }


def main():
    parser = argparse.ArgumentParser(description="Extract LVGL schema from ESPHome source")
    parser.add_argument("--esphome-path", required=True, help="Path to ESPHome repo clone")
    parser.add_argument("--output", required=True, help="Output JSON file path")
    args = parser.parse_args()

    esphome_path = str(Path(args.esphome_path).resolve())
    output_path = Path(args.output)

    print(f"  Setting up ESPHome environment from {esphome_path}...")
    setup_esphome_env(esphome_path)

    # Force-import the LVGL component to trigger widget registrations
    print("  Importing LVGL component modules...")
    try:
        # Import the widgets package — this triggers all WidgetType registrations
        import esphome.components.lvgl.widgets.obj  # noqa: F401
        import esphome.components.lvgl.widgets.label  # noqa: F401
        import esphome.components.lvgl.widgets.button  # noqa: F401
        import esphome.components.lvgl.widgets.switch  # noqa: F401
        import esphome.components.lvgl.widgets.checkbox  # noqa: F401
        import esphome.components.lvgl.widgets.arc  # noqa: F401
        import esphome.components.lvgl.widgets.lv_bar  # noqa: F401
        import esphome.components.lvgl.widgets.slider  # noqa: F401
        import esphome.components.lvgl.widgets.led  # noqa: F401
        import esphome.components.lvgl.widgets.dropdown  # noqa: F401
        import esphome.components.lvgl.widgets.roller  # noqa: F401
        import esphome.components.lvgl.widgets.textarea  # noqa: F401
        import esphome.components.lvgl.widgets.keyboard  # noqa: F401
        import esphome.components.lvgl.widgets.line  # noqa: F401
        import esphome.components.lvgl.widgets.img  # noqa: F401
        import esphome.components.lvgl.widgets.animimg  # noqa: F401
        import esphome.components.lvgl.widgets.canvas  # noqa: F401
        import esphome.components.lvgl.widgets.container  # noqa: F401
        import esphome.components.lvgl.widgets.meter  # noqa: F401
        import esphome.components.lvgl.widgets.spinner  # noqa: F401
        import esphome.components.lvgl.widgets.spinbox  # noqa: F401
        import esphome.components.lvgl.widgets.buttonmatrix  # noqa: F401
        import esphome.components.lvgl.widgets.qrcode  # noqa: F401
        import esphome.components.lvgl.widgets.tabview  # noqa: F401
        import esphome.components.lvgl.widgets.tileview  # noqa: F401
        import esphome.components.lvgl.widgets.page  # noqa: F401
        import esphome.components.lvgl.widgets.msgbox  # noqa: F401
    except Exception as e:
        print(f"  Warning: Some widget imports failed: {e}", file=sys.stderr)

    print("  Extracting widget types...")
    widgets = extract_widgets()
    print(f"    Found {len(widgets)} widget types")

    print("  Extracting style properties...")
    style_props = extract_style_props()
    print(f"    Found {len(style_props)} style properties")

    print("  Extracting enums...")
    enums = extract_enums()
    print(f"    Found {len(enums)} enum definitions")

    print("  Extracting constants...")
    constants = extract_constants()

    print("  Extracting events...")
    events = extract_events()

    print("  Extracting fonts...")
    fonts = extract_fonts()

    print("  Extracting top-level schema...")
    top_level = extract_top_level_schema()

    print("  Extracting page schema...")
    page_schema = extract_page_schema()

    result = {
        "widgets": widgets,
        "style_props": style_props,
        "enums": enums,
        **constants,
        **events,
        "fonts": fonts,
        "top_level": top_level,
        "page_schema": page_schema,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(result, indent=2))
    print(f"  Written to {output_path}")
    print(f"  Widgets: {len(widgets)}, Style props: {len(style_props)}, Enums: {len(enums)}")


if __name__ == "__main__":
    main()
