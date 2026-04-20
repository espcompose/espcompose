// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_modbus_Modbus, __marker_uart_UARTComponent } from "../markers";
export interface ModbusProps extends _CoreComponent {
    /**
     * boolean: If set to `true`, invalid CRC values are ignored. This will reduce error messages but will not fix communica...
     * @yamlKey disable_crc
     */
    disableCrc?: boolean;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The pin used to switch flow control. This is useful for RS4...
     * @yamlKey flow_control_pin
     */
    flowControlPin?: Pin;
    /** string: The role of this component, `client` or `server`. Defaults to `client`. */
    role?: "client" | "server";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Time in milliseconds before the next ModBUS command is se...
     * @yamlKey send_wait_time
     */
    sendWaitTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Time in milliseconds before the next ModBUS command is se...
     * @yamlKey turnaround_time
     */
    turnaroundTime?: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [UART Component](https://espho...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            modbus: ModbusProps & ComponentProps<__marker_modbus_Modbus>;
        }
    }
}
