// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_pipsolar_Pipsolar, __marker_uart_UARTComponent } from "../markers";
export interface PipsolarProps extends _CoreComponent {
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * The uart Bus ID
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pipsolar: PipsolarProps & ComponentProps<__marker_pipsolar_Pipsolar>;
        }
    }
}
