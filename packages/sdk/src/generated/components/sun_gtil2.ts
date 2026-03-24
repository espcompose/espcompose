// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { sun_gtil2_SunGTIL2, uart_UARTComponent } from "../markers";
export interface SunGtil2Props {
    /**
     * The UART Bus ID for receiving messages sent from the inverter's controller to the display.
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sun_gtil2: SunGtil2Props & ComponentProps<sun_gtil2_SunGTIL2>;
        }
    }
}
