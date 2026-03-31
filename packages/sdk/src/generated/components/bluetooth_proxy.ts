// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { bluetooth_proxy_BluetoothProxy, esp32_ble_tracker_ESP32BLETracker } from "../markers";
export interface BluetoothProxyConnectionsProps {
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<esp32_ble_tracker_ESP32BLETracker>;
}
export interface BluetoothProxyProps extends _CoreComponent {
    active?: boolean | EmbedValue<boolean>;
    /** @yamlKey cache_services */
    cacheServices?: boolean | EmbedValue<boolean>;
    /** @yamlKey connection_slots */
    connectionSlots?: number | EmbedValue<number>;
    connections?: Array<BluetoothProxyConnectionsProps>;
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<esp32_ble_tracker_ESP32BLETracker>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            bluetooth_proxy: BluetoothProxyProps & ComponentProps<bluetooth_proxy_BluetoothProxy>;
        }
    }
}
