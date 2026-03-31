// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { modbus_Modbus, uart_UARTComponent } from "../markers";
export interface ModbusProps extends _CoreComponent {
    /** string: The role of this component, `client` or `server`. Defaults to `client`. */
    role?: "client" | "server";
    /**
     * [Pin](/guides/configuration-types#pin): The pin used to switch flow control. This is useful for RS485 transceivers th...
     * @yamlKey flow_control_pin
     */
    flowControlPin?: Pin | EmbedValue<Pin>;
    /**
     * [Time](/guides/configuration-types#time): Time in milliseconds before the next ModBUS command is sent when an answer ...
     * @yamlKey send_wait_time
     */
    sendWaitTime?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): Time in milliseconds before the next ModBUS command is sent after last resp...
     * @yamlKey turnaround_time
     */
    turnaroundTime?: TimePeriod;
    /**
     * boolean: If set to `true`, invalid CRC values are ignored. This will reduce error messages but will not fix communica...
     * @yamlKey disable_crc
     */
    disableCrc?: boolean | EmbedValue<boolean>;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) if you want t...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            modbus: ModbusProps & ComponentProps<modbus_Modbus>;
        }
    }
}
