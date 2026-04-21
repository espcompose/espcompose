// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_sun_gtil2_SunGTIL2, __marker_uart_UARTComponent } from "../markers";
export interface SunGtil2Props extends _CoreComponent {
    /**
     * The UART Bus ID for receiving messages sent from the inverter's controller to the display.
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sun_gtil2: SunGtil2Props & ComponentProps<__marker_sun_gtil2_SunGTIL2>;
        }
    }
}
