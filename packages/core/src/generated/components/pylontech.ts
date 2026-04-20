// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_pylontech_PylontechComponent, __marker_uart_UARTComponent } from "../markers";
export interface PylontechProps extends _CoreComponent {
    /**
     * The uart Bus ID
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to check the sensor. Defaults to `60s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pylontech: PylontechProps & ComponentProps<__marker_pylontech_PylontechComponent>;
        }
    }
}
