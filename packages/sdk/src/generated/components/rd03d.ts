// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { rd03d_RD03DComponent, uart_UARTComponent } from "../markers";
export interface Rd03dProps extends _CoreComponent {
    /**
     * string: The tracking mode to configure. If not specified, no command is sent and the radar uses its default mode (typ...
     * @yamlKey tracking_mode
     */
    trackingMode?: "single" | "multi";
    /** [Time](/guides/configuration-types#time): Minimum time between sensor updates. The radar sends data very frequently; ... */
    throttle?: TimePeriod;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) to use. Requi...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rd03d: Rd03dProps & ComponentProps<rd03d_RD03DComponent>;
        }
    }
}
