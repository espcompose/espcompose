// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { teleinfo_TeleInfo, uart_UARTComponent } from "../markers";
export interface TeleinfoProps extends _CoreComponent {
    /**
     * Whether to use historical mode or standard mode. With historical mode, baudrate of 1200 must be used whereas 9600 mus...
     * @yamlKey historical_mode
     */
    historicalMode?: boolean;
    /**
     * [Time](/guides/configuration-types#time): The interval to check the sensor. Defaults to `60s`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) if you want t...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            teleinfo: TeleinfoProps & ComponentProps<teleinfo_TeleInfo>;
        }
    }
}
