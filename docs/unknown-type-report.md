# Unknown Type Report: Outstanding Items

## Addressed In This Pass

- Explicit docs markers now flow through component props and action params, including `file path`, `port`, `list of strings`, `string or list of strings`, `action`, and `action or boolean`.
- Docs-driven semantic types now cover `TimePeriod`, `MACAddress`, and `IPv4Address` without relying on property-name heuristics.
- Previously suspicious MQTT topic fields were corrected back to `unknown` rather than being incorrectly inferred as `number`.
- `data_type`-based inference now maps 13 ESPHome constraint names (`uint8_t`, `hex_uint8_t`, `positive_int`, `positive_float`, `zero_to_one_float`, `port`, `device_address`, `output`, etc.) to `number` as a last-resort fallback when neither `type` nor a docs marker is present. Applies to both component props and action params.

## Remaining Generated `unknown` Breakdown

| Category | Examples | Remaining Estimate | Root Cause |
|----------|----------|--------------------|------------|
| Untyped scalar fields with no docs marker | `sortingWeight`, `deviceId`, `qos`, `subscribeQos`, `payloadAvailable` | 200+ | Schema entries omit both `type` and a leading docs marker, so there is no safe docs-driven inference source |
| Complex nested values | `effects`, `filters`, `lambda`, `bgGrad` | 20+ | Current mapper intentionally leaves loosely described object, lambda, and polymorphic list shapes as `unknown` |
| Weakly typed action params | `data`, `power`, `state`, `text`, `font` | 30+ | Action schemas still contain many params with no explicit scalar type, docs marker, or `data_type` constraint |

## Outstanding Work

1. Decide whether selected untyped MQTT and web-server fields should remain `unknown` or receive explicit manual overrides backed by upstream validator behavior.
2. Improve complex nested schema mapping for high-value cases such as `effects`, `filters`, and selected LVGL style/action payloads.