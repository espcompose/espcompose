// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_serial_proxy_SerialProxy, __marker_uart_UARTComponent } from "../markers";
export interface SerialProxyProps extends _CoreComponent {
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): GPIO pin to use as the DTR (Data Terminal Ready) modem cont...
     * @yamlKey dtr_pin
     */
    dtrPin?: Pin;
    /** string: A human-readable name for this serial port, used to identify it to API clients. */
    name: string;
    /**
     * string: The electrical type of the serial port. One of:
     * @yamlKey port_type
     */
    portType: "RS232" | "RS485" | "TTL";
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): GPIO pin to use as the RTS (Request to Send) modem control ...
     * @yamlKey rts_pin
     */
    rtsPin?: Pin;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [UART](https://esphome.io/components/uart/) com...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            serial_proxy: SerialProxyProps & ComponentProps<__marker_serial_proxy_SerialProxy>;
        }
    }
}
