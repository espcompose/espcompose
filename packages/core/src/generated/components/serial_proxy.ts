// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_serial_proxy_SerialProxy, __marker_uart_UARTComponent } from "../markers";
export interface SerialProxyProps extends _CoreComponent {
    /** string: A human-readable name for this serial port, used to identify it to API clients. */
    name: string;
    /**
     * string: The electrical type of the serial port. One of:
     * @yamlKey port_type
     */
    portType: "TTL" | "RS232" | "RS485";
    /**
     * [Pin](/guides/configuration-types#pin): GPIO pin to use as the RTS (Request to Send) modem control output. The state ...
     * @yamlKey rts_pin
     */
    rtsPin?: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): GPIO pin to use as the DTR (Data Terminal Ready) modem control output. The st...
     * @yamlKey dtr_pin
     */
    dtrPin?: Pin;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [UART](/components/uart/) component this proxy is attached to.
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
