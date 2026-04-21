// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_esphome_dsmr_Dsmr, __marker_uart_UARTComponent } from "../markers";
export interface DsmrProps extends _CoreComponent {
    /** @yamlKey crc_check */
    crcCheck?: boolean;
    /** @yamlKey decryption_key */
    decryptionKey?: unknown;
    /** @yamlKey gas_mbus_id */
    gasMbusId?: number;
    /** @yamlKey max_telegram_length */
    maxTelegramLength?: number;
    /** @yamlKey receive_timeout */
    receiveTimeout?: TimePeriod;
    /** @yamlKey request_interval */
    requestInterval?: TimePeriod;
    /** @yamlKey request_pin */
    requestPin?: Pin;
    /** @yamlKey thermal_mbus_id */
    thermalMbusId?: number;
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /** @yamlKey water_mbus_id */
    waterMbusId?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dsmr: DsmrProps & ComponentProps<__marker_esphome_dsmr_Dsmr>;
        }
    }
}
