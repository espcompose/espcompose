// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent, _OtaBaseOta } from "../bases";
import type { esphome_ESPHomeOTAComponent, http_request_HttpRequestComponent, http_request_OtaHttpRequestComponent, web_server_WebServerOTAComponent, zephyr_CdcAcm, zephyr_mcumgr_OTAComponent } from "../markers";
interface ZephyrMcumgrTransportProps {
    ble?: boolean;
    /** @yamlKey hardware_uart */
    hardwareUart?: "CDC" | "CDC1" | "UART0" | "UART1";
}
interface Nrf52DfuProps {
    /** @yamlKey reset_pin */
    resetPin: Pin;
}
interface Nrf52Reg0Props {
    voltage: "1.8" | "2.1" | "2.4" | "2.7" | "3.0" | "3.3";
    /** @yamlKey uicr_erase */
    uicrErase?: boolean;
}
interface Nrf52FrameworkPropsAdvancedProps {
    /** @yamlKey enable_ota_rollback */
    enableOtaRollback?: boolean;
}
interface Nrf52FrameworkProps {
    version?: string;
    advanced?: Nrf52FrameworkPropsAdvancedProps;
}
interface ZephyrMcumgrProps extends _OtaBaseOta, _CoreComponent {
    /** mapping: Specifies the transport method used by Zephyr MCUmgr for OTA updates. By default, Bluetooth Low Energy (`ble... */
    transport?: ZephyrMcumgrTransportProps;
}
interface EsphomeProps extends _OtaBaseOta, _CoreComponent {
    version?: "1" | "2";
    port?: number;
    password?: string;
}
interface HttpRequestProps extends _OtaBaseOta, _CoreComponent {
    /** @yamlKey http_request_id */
    httpRequestId?: RefProp<http_request_HttpRequestComponent>;
}
interface Nrf52Props {
    /** string: The board type. Valid options are `adafruit_feather_nrf52840`, `adafruit_itsybitsy_nrf52840`, `xiao_ble`. Oth... */
    board: string;
    /** string: Bootloader type. Valid options are `mcuboot`, `adafruit`, `adafruit_nrf52_sd132`, `adafruit_nrf52_sd140_v6`, ... */
    bootloader?: "adafruit" | "adafruit_nrf52_sd132" | "adafruit_nrf52_sd140_v6" | "adafruit_nrf52_sd140_v7" | "mcuboot";
    dfu?: Nrf52DfuProps;
    /** boolean: Enable DC/DC converter for REG1 stage. Defaults to `true`. */
    dcdc?: boolean;
    reg0?: Nrf52Reg0Props;
    framework?: Nrf52FrameworkProps;
}
interface WebServerProps extends _OtaBaseOta, _CoreComponent {
}
export type OtaProps = ({
    platform: "zephyr_mcumgr";
} & ZephyrMcumgrProps & ComponentProps<zephyr_mcumgr_OTAComponent>) | ({
    platform: "esphome";
} & EsphomeProps & ComponentProps<esphome_ESPHomeOTAComponent>) | ({
    platform: "http_request";
} & HttpRequestProps & ComponentProps<http_request_OtaHttpRequestComponent>) | ({
    platform: "nrf52";
} & Nrf52Props & ComponentProps<zephyr_CdcAcm>) | ({
    platform: "web_server";
} & WebServerProps & ComponentProps<web_server_WebServerOTAComponent>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ota: OtaProps;
        }
    }
}
