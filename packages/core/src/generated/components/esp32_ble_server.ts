// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_esp32_ble_ESP32BLE, __marker_esp32_ble_server_BLEServer } from "../markers";
export interface Esp32BleServerFirmwareVersionProps {
    data: number;
    endianness?: "BIG" | "LITTLE";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    type?: "double" | "float" | "int16_t" | "int32_t" | "int64_t" | "int8_t" | "string" | "uint16_t" | "uint32_t" | "uint64_t" | "uint8_t";
}
export interface Esp32BleServerManufacturerProps {
    data: number;
    endianness?: "BIG" | "LITTLE";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    type?: "double" | "float" | "int16_t" | "int32_t" | "int64_t" | "int8_t" | "string" | "uint16_t" | "uint32_t" | "uint64_t" | "uint8_t";
}
export interface Esp32BleServerModelProps {
    data: number;
    endianness?: "BIG" | "LITTLE";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    type?: "double" | "float" | "int16_t" | "int32_t" | "int64_t" | "int8_t" | "string" | "uint16_t" | "uint32_t" | "uint64_t" | "uint8_t";
}
export interface Esp32BleServerServicesPropsCharacteristicsPropsDescriptionProps {
    data: number;
    endianness?: "BIG" | "LITTLE";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    type?: "double" | "float" | "int16_t" | "int32_t" | "int64_t" | "int8_t" | "string" | "uint16_t" | "uint32_t" | "uint64_t" | "uint8_t";
}
export interface Esp32BleServerServicesPropsCharacteristicsPropsDescriptorsPropsValueProps {
    data: number;
    endianness?: "BIG" | "LITTLE";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    type?: "double" | "float" | "int16_t" | "int32_t" | "int64_t" | "int8_t" | "string" | "uint16_t" | "uint32_t" | "uint64_t" | "uint8_t";
}
export interface Esp32BleServerServicesPropsCharacteristicsPropsDescriptorsProps {
    /** @yamlKey max_length */
    maxLength?: number;
    /** @yamlKey on_write */
    onWrite?: TriggerHandler;
    read?: boolean;
    uuid: number;
    value: Esp32BleServerServicesPropsCharacteristicsPropsDescriptorsPropsValueProps;
    write?: boolean;
}
export interface Esp32BleServerServicesPropsCharacteristicsPropsValueProps {
    data: number;
    endianness?: "BIG" | "LITTLE";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    type?: "double" | "float" | "int16_t" | "int32_t" | "int64_t" | "int8_t" | "string" | "uint16_t" | "uint32_t" | "uint64_t" | "uint8_t";
}
export interface Esp32BleServerServicesPropsCharacteristicsProps {
    broadcast?: boolean;
    description?: Esp32BleServerServicesPropsCharacteristicsPropsDescriptionProps;
    descriptors?: Array<Esp32BleServerServicesPropsCharacteristicsPropsDescriptorsProps>;
    indicate?: boolean;
    notify?: boolean;
    /** @yamlKey on_write */
    onWrite?: TriggerHandler;
    read?: boolean;
    uuid: number;
    value?: Esp32BleServerServicesPropsCharacteristicsPropsValueProps;
    write?: boolean;
    /** @yamlKey write_no_response */
    writeNoResponse?: boolean;
}
export interface Esp32BleServerServicesProps {
    advertise?: boolean;
    characteristics?: Array<Esp32BleServerServicesPropsCharacteristicsProps>;
    uuid: number;
}
export interface Esp32BleServerProps extends _CoreComponent {
    /** int: Sets the [appearance](https://bitbucket.org/bluetooth-SIG/public/src/main/assigned_numbers/core/appearance_value... */
    appearance?: number;
    /** @yamlKey ble_id */
    bleId?: RefProp<__marker_esp32_ble_ESP32BLE>;
    /**
     * [Value Configuration](https://esphome.io/components/esp32_ble_server#esp32_ble_server-value): The firmware version of...
     * @yamlKey firmware_version
     */
    firmwareVersion?: Esp32BleServerFirmwareVersionProps;
    /** [Value Configuration](https://esphome.io/components/esp32_ble_server#esp32_ble_server-value): The name of the manufac... */
    manufacturer?: Esp32BleServerManufacturerProps;
    /**
     * list of bytes: The manufacturer-specific data to include in the advertising packet. Should be a list of bytes, where ...
     * @yamlKey manufacturer_data
     */
    manufacturerData?: Array<number>;
    /**
     * int: The maximum number of simultaneous BLE client connections the server will accept. When set to a value greater th...
     * @yamlKey max_clients
     */
    maxClients?: number;
    /** [Value Configuration](https://esphome.io/components/esp32_ble_server#esp32_ble_server-value): The model name of the d... */
    model?: Esp32BleServerModelProps;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a client connects to the BLE server. It ...
     * @yamlKey on_connect
     */
    onConnect?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a client disconnects from the BLE server...
     * @yamlKey on_disconnect
     */
    onDisconnect?: TriggerHandler;
    /** list of [Service Configuration](https://esphome.io/components/esp32_ble_server#esp32_ble_server-service): A list of s... */
    services?: Array<Esp32BleServerServicesProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_ble_server: Esp32BleServerProps & ComponentProps<__marker_esp32_ble_server_BLEServer>;
        }
    }
}
