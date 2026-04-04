// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { daly_bms_DalyBmsComponent, uart_UARTComponent } from "../markers";
export interface DalyBmsProps extends _CoreComponent {
    /** int: Address to use, defaults to `0x80`. */
    address?: number;
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
    /**
     * [Time](/guides/configuration-types#time): Delay between data requests.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            daly_bms: DalyBmsProps & ComponentProps<daly_bms_DalyBmsComponent>;
        }
    }
}
