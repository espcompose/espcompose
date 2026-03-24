// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { ble_nus_BLENUS } from "../markers";
export interface BleNusProps extends _CoreComponent {
    /** string: Mode of operation. One of `logs` or `uart`. `logs` streams ESPHome logs. `uart` provides bi-directional commu... */
    type?: "logs" | "uart";
    /**
     * int: Size of the transmit buffer in bytes. Range: 160-8192. Defaults to `512`.
     * @yamlKey tx_buffer_size
     */
    txBufferSize?: number;
    /**
     * int: Size of the receive buffer in bytes. Range: 160-8192. Defaults to `512`. Valid only for mode `uart`.
     * @yamlKey rx_buffer_size
     */
    rxBufferSize?: number;
    /** mapping: Options for debugging communication on the UART hub, see [Debugging](/components/uart#uart-debugging). */
    debug?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ble_nus: BleNusProps & ComponentProps<ble_nus_BLENUS>;
        }
    }
}
