// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { esp32_ble_ESP32BLE } from "../markers";
export interface Esp32BleProps extends _CoreComponent {
    /** string: The name of the BLE device. */
    name?: string | EmbedValue<string>;
    /**
     * enum: The IO capability of this ESP32, used for securely connecting to other BLE devices. Defaults to `none`.
     * @yamlKey io_capability
     */
    ioCapability?: "none" | "keyboard_only" | "keyboard_display" | "display_only" | "display_yes_no";
    /**
     * enum: The authentication request mode. Defaults to the ESP-IDF default. Leave unspecified unless your device needs sp...
     * @yamlKey auth_req_mode
     */
    authReqMode?: "no_bond" | "bond" | "mitm" | "bond_mitm" | "sc_only" | "sc_bond" | "sc_mitm" | "sc_mitm_bond";
    /**
     * integer: Maximum encryption key size to support. Must be between `7` and `16`. Leave unspecified to use the ESP32 def...
     * @yamlKey max_key_size
     */
    maxKeySize?: number | EmbedValue<number>;
    /**
     * integer: Minimum encryption key size requirement from peer. Must be between `7` and `16`. Leave unspecified to use th...
     * @yamlKey min_key_size
     */
    minKeySize?: number | EmbedValue<number>;
    /**
     * boolean: If enabled, the BLE interface will be enabled on boot. Defaults to `true`.
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean | EmbedValue<boolean>;
    /** boolean: Manually enable BLE advertising support. This is automatically enabled when using [Esp32 Ble Server](/compon... */
    advertising?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): The time interval for cycling through multiple advertisements. Only applica...
     * @yamlKey advertising_cycle_time
     */
    advertisingCycleTime?: TimePeriod;
    /**
     * boolean: When enabled, disables Bluetooth logging categories that are not used by the configured components. This sav...
     * @yamlKey disable_bt_logs
     */
    disableBtLogs?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): The maximum time to wait for a BLE connection to be established. Defaults t...
     * @yamlKey connection_timeout
     */
    connectionTimeout?: TimePeriod;
    /**
     * integer: The maximum number of BLE characteristics that can have notifications enabled across all connections. Defaul...
     * @yamlKey max_notifications
     */
    maxNotifications?: number | EmbedValue<number>;
    /**
     * integer: The maximum number of simultaneous BLE connections (client + server combined). Defaults to `3`.
     * @yamlKey max_connections
     */
    maxConnections?: number | EmbedValue<number>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_ble: Esp32BleProps & ComponentProps<esp32_ble_ESP32BLE>;
        }
    }
}
