// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { pipsolar_Pipsolar, uart_UARTComponent } from "../markers";
export interface PipsolarProps extends _CoreComponent {
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * The uart Bus ID
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pipsolar: PipsolarProps & ComponentProps<pipsolar_Pipsolar>;
        }
    }
}
