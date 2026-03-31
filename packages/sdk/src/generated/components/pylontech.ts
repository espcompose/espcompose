// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { pylontech_PylontechComponent, uart_UARTComponent } from "../markers";
export interface PylontechProps extends _CoreComponent {
    /**
     * [Time](/guides/configuration-types#time): The interval to check the sensor. Defaults to `60s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
    /**
     * The uart Bus ID
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pylontech: PylontechProps & ComponentProps<pylontech_PylontechComponent>;
        }
    }
}
