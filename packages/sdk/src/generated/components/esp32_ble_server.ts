// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { esp32_ble_ESP32BLE, esp32_ble_server_BLEServer } from "../markers";
export interface Esp32BleServerManufacturerProps {
    data: number;
    type?: "uint8_t" | "uint16_t" | "uint32_t" | "uint64_t" | "int8_t" | "int16_t" | "int32_t" | "int64_t" | "float" | "double" | "string";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    endianness?: "LITTLE" | "BIG";
}
export interface Esp32BleServerModelProps {
    data: number;
    type?: "uint8_t" | "uint16_t" | "uint32_t" | "uint64_t" | "int8_t" | "int16_t" | "int32_t" | "int64_t" | "float" | "double" | "string";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    endianness?: "LITTLE" | "BIG";
}
export interface Esp32BleServerFirmwareVersionProps {
    data: number;
    type?: "uint8_t" | "uint16_t" | "uint32_t" | "uint64_t" | "int8_t" | "int16_t" | "int32_t" | "int64_t" | "float" | "double" | "string";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    endianness?: "LITTLE" | "BIG";
}
export interface Esp32BleServerServicesPropsCharacteristicsPropsValueProps {
    data: number;
    type?: "uint8_t" | "uint16_t" | "uint32_t" | "uint64_t" | "int8_t" | "int16_t" | "int32_t" | "int64_t" | "float" | "double" | "string";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    endianness?: "LITTLE" | "BIG";
}
export interface Esp32BleServerServicesPropsCharacteristicsPropsDescriptorsPropsValueProps {
    data: number;
    type?: "uint8_t" | "uint16_t" | "uint32_t" | "uint64_t" | "int8_t" | "int16_t" | "int32_t" | "int64_t" | "float" | "double" | "string";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    endianness?: "LITTLE" | "BIG";
}
export interface Esp32BleServerServicesPropsCharacteristicsPropsDescriptorsProps {
    uuid: unknown;
    read?: boolean;
    write?: boolean;
    /** @yamlKey on_write */
    onWrite?: () => void;
    value: Esp32BleServerServicesPropsCharacteristicsPropsDescriptorsPropsValueProps;
    /** @yamlKey max_length */
    maxLength?: number;
}
export interface Esp32BleServerServicesPropsCharacteristicsPropsDescriptionProps {
    data: number;
    type?: "uint8_t" | "uint16_t" | "uint32_t" | "uint64_t" | "int8_t" | "int16_t" | "int32_t" | "int64_t" | "float" | "double" | "string";
    /** @yamlKey string_encoding */
    stringEncoding?: unknown;
    endianness?: "LITTLE" | "BIG";
}
export interface Esp32BleServerServicesPropsCharacteristicsProps {
    uuid: unknown;
    value?: Esp32BleServerServicesPropsCharacteristicsPropsValueProps;
    descriptors?: Array<Esp32BleServerServicesPropsCharacteristicsPropsDescriptorsProps>;
    /** @yamlKey on_write */
    onWrite?: () => void;
    description?: Esp32BleServerServicesPropsCharacteristicsPropsDescriptionProps;
    read?: boolean;
    write?: boolean;
    notify?: boolean;
    broadcast?: boolean;
    indicate?: boolean;
    /** @yamlKey write_no_response */
    writeNoResponse?: boolean;
}
export interface Esp32BleServerServicesProps {
    uuid: unknown;
    advertise?: boolean;
    characteristics?: Array<Esp32BleServerServicesPropsCharacteristicsProps>;
}
export interface Esp32BleServerProps extends _CoreComponent {
    /** @yamlKey ble_id */
    bleId?: RefProp<esp32_ble_ESP32BLE>;
    /** [Value Configuration](https://esphome.io/components/esp32_ble_server#esp32_ble_server-value): The name of the manufac... */
    manufacturer?: Esp32BleServerManufacturerProps;
    /** int: Sets the [appearance](https://bitbucket.org/bluetooth-SIG/public/src/main/assigned_numbers/core/appearance_value... */
    appearance?: number;
    /** [Value Configuration](https://esphome.io/components/esp32_ble_server#esp32_ble_server-value): The model name of the d... */
    model?: Esp32BleServerModelProps;
    /**
     * [Value Configuration](https://esphome.io/components/esp32_ble_server#esp32_ble_server-value): The firmware version of...
     * @yamlKey firmware_version
     */
    firmwareVersion?: Esp32BleServerFirmwareVersionProps;
    /**
     * list of bytes: The manufacturer-specific data to include in the advertising packet. Should be a list of bytes, where ...
     * @yamlKey manufacturer_data
     */
    manufacturerData?: unknown;
    /**
     * int: The maximum number of simultaneous BLE client connections the server will accept. When set to a value greater th...
     * @yamlKey max_clients
     */
    maxClients?: number;
    /** list of [Service Configuration](https://esphome.io/components/esp32_ble_server#esp32_ble_server-service): A list of s... */
    services?: Array<Esp32BleServerServicesProps>;
    /**
     * [Automation](/automations): An action to be performed when a client connects to the BLE server. It provides the `id` ...
     * @yamlKey on_connect
     */
    onConnect?: () => void;
    /**
     * [Automation](/automations): An action to be performed when a client disconnects from the BLE server. It provides the ...
     * @yamlKey on_disconnect
     */
    onDisconnect?: () => void;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_ble_server: Esp32BleServerProps & ComponentProps<esp32_ble_server_BLEServer>;
        }
    }
}
