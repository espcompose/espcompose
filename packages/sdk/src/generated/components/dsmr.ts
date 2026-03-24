// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { esphome_dsmr_Dsmr, uart_UARTComponent } from "../markers";
export interface DsmrRequestIntervalProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface DsmrReceiveTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface DsmrProps {
    /** @yamlKey decryption_key */
    decryptionKey?: unknown;
    /** @yamlKey crc_check */
    crcCheck?: boolean;
    /** @yamlKey gas_mbus_id */
    gasMbusId?: number;
    /** @yamlKey water_mbus_id */
    waterMbusId?: number;
    /** @yamlKey max_telegram_length */
    maxTelegramLength?: number;
    /** @yamlKey request_pin */
    requestPin?: Pin;
    /** @yamlKey request_interval */
    requestInterval?: DsmrRequestIntervalProps;
    /** @yamlKey receive_timeout */
    receiveTimeout?: DsmrReceiveTimeoutProps;
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dsmr: DsmrProps & ComponentProps<esphome_dsmr_Dsmr>;
        }
    }
}
