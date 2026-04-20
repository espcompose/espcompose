// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, MACAddress, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_ble_client_BLEClient, __marker_esp32_ble_tracker_ESP32BLETracker } from "../markers";
export interface BleClientProps extends _CoreComponent {
    /**
     * boolean: If true the device will be automatically connected when found by the [Esp32 Ble Tracker](https://esphome.io/...
     * @yamlKey auto_connect
     */
    autoConnect?: boolean;
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<__marker_esp32_ble_tracker_ESP32BLETracker>;
    /**
     * MAC Address: The MAC address of the BLE device to connect to.
     * @yamlKey mac_address
     */
    macAddress: MACAddress;
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the client connects to a device. See [`on...
     * @yamlKey on_connect
     */
    onConnect?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the client disconnects from a device. See...
     * @yamlKey on_disconnect
     */
    onDisconnect?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to compare the passkeys shown on the two BLE devices. See...
     * @yamlKey on_numeric_comparison_request
     */
    onNumericComparisonRequest?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to display the passkey to the user. See [`on_passkey_noti...
     * @yamlKey on_passkey_notification
     */
    onPasskeyNotification?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to enter the passkey required by the other BLE device. Se...
     * @yamlKey on_passkey_request
     */
    onPasskeyRequest?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ble_client: BleClientProps & ComponentProps<__marker_ble_client_BLEClient>;
        }
    }
}
