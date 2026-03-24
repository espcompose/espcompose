// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { micronova_MicroNova, uart_UARTComponent } from "../markers";
export interface MicronovaProps {
    /**
     * [Pin](/guides/configuration-types#pin): Output pin to be used to switch the line between RX and TX.
     * @yamlKey enable_rx_pin
     */
    enableRxPin: Pin;
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            micronova: MicronovaProps & ComponentProps<micronova_MicroNova>;
        }
    }
}
