// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_teleinfo_TeleInfo, __marker_uart_UARTComponent } from "../markers";
export interface TeleinfoProps extends _CoreComponent {
    /**
     * Whether to use historical mode or standard mode. With historical mode, baudrate of 1200 must be used whereas 9600 mus...
     * @yamlKey historical_mode
     */
    historicalMode?: boolean;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [UART Component](https://espho...
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
            teleinfo: TeleinfoProps & ComponentProps<__marker_teleinfo_TeleInfo>;
        }
    }
}
