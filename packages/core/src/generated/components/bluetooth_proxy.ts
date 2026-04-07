// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_bluetooth_proxy_BluetoothProxy, __marker_esp32_ble_tracker_ESP32BLETracker } from "../markers";
export interface BluetoothProxyConnectionsProps {
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<__marker_esp32_ble_tracker_ESP32BLETracker>;
}
export interface BluetoothProxyProps extends _CoreComponent {
    active?: boolean;
    /** @yamlKey cache_services */
    cacheServices?: boolean;
    /** @yamlKey connection_slots */
    connectionSlots?: number;
    connections?: Array<BluetoothProxyConnectionsProps>;
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<__marker_esp32_ble_tracker_ESP32BLETracker>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            bluetooth_proxy: BluetoothProxyProps & ComponentProps<__marker_bluetooth_proxy_BluetoothProxy>;
        }
    }
}
