// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _OtaBaseOta } from "../bases";
import type { __marker_esphome_ESPHomeOTAComponent, __marker_http_request_HttpRequestComponent, __marker_http_request_OtaHttpRequestComponent, __marker_web_server_WebServerOTAComponent, __marker_zephyr_mcumgr_OTAComponent } from "../markers";
interface ZephyrMcumgrTransportProps {
    ble?: boolean;
    /** @yamlKey hardware_uart */
    hardwareUart?: "CDC" | "CDC1" | "UART0" | "UART1";
}
interface EsphomeProps extends _OtaBaseOta, _CoreComponent {
    password?: string;
    port?: number;
    version?: "1" | "2";
}
interface HttpRequestProps extends _OtaBaseOta, _CoreComponent {
    /** @yamlKey http_request_id */
    httpRequestId?: RefProp<__marker_http_request_HttpRequestComponent>;
}
interface WebServerProps extends _OtaBaseOta, _CoreComponent {
}
interface ZephyrMcumgrProps extends _OtaBaseOta, _CoreComponent {
    /** mapping: Specifies the transport method used by Zephyr MCUmgr for OTA updates. By default, Bluetooth Low Energy (`ble... */
    transport?: ZephyrMcumgrTransportProps;
}
export type OtaProps = ({
    platform: "esphome";
} & EsphomeProps & ComponentProps<__marker_esphome_ESPHomeOTAComponent>) | ({
    platform: "http_request";
} & HttpRequestProps & ComponentProps<__marker_http_request_OtaHttpRequestComponent>) | ({
    platform: "web_server";
} & WebServerProps & ComponentProps<__marker_web_server_WebServerOTAComponent>) | ({
    platform: "zephyr_mcumgr";
} & ZephyrMcumgrProps & ComponentProps<__marker_zephyr_mcumgr_OTAComponent>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ota: OtaProps;
        }
    }
}
