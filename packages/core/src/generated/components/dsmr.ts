// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { __marker_esphome_dsmr_Dsmr, __marker_uart_UARTComponent } from "../markers";
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
    requestInterval?: TimePeriod;
    /** @yamlKey receive_timeout */
    receiveTimeout?: TimePeriod;
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dsmr: DsmrProps & ComponentProps<__marker_esphome_dsmr_Dsmr>;
        }
    }
}
