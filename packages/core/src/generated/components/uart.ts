// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { uart_UARTComponent } from "../markers";
export interface UartProps extends _CoreComponent {
    /**
     * int: The baud rate of the UART bus.
     * @yamlKey baud_rate
     */
    baudRate: number;
    /**
     * [Pin](/guides/configuration-types#pin): The pin to send data to from the ESP's perspective. Use the full pin schema a...
     * @yamlKey tx_pin
     */
    txPin?: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The pin to receive data on from the ESP's perspective. Use the full pin schem...
     * @yamlKey rx_pin
     */
    rxPin?: unknown;
    /**
     * [Pin](/guides/configuration-types#pin): ESP32 only. The pin used to for hardware RS485 flow control. Use of this sett...
     * @yamlKey flow_control_pin
     */
    flowControlPin?: Pin;
    /** string: Host platform only. Unix style name of the port to use. */
    port?: string;
    /**
     * int: The size of the buffer used for receiving UART messages. Increase if you use an integration that needs to read b...
     * @yamlKey rx_buffer_size
     */
    rxBufferSize?: number;
    /**
     * int: ESP32 only. After receiving this number of bytes, the data becomes available for processing. The default is calc...
     * @yamlKey rx_full_threshold
     */
    rxFullThreshold?: number;
    /**
     * int: ESP32 only. This value specifies a number of bytes used to determine the duration of the timeout. The duration o...
     * @yamlKey rx_timeout
     */
    rxTimeout?: number;
    /**
     * [Time](/guides/configuration-types#time): ESP32 only. The maximum time to wait for the TX FIFO to drain when `flush()...
     * @yamlKey flush_timeout
     */
    flushTimeout?: TimePeriod;
    /**
     * int: The number of stop bits to send. Options: 1, 2. Defaults to 1.
     * @yamlKey stop_bits
     */
    stopBits?: "1" | "2";
    /**
     * int: The number of data bits used on the UART bus. Options: 5 to 8. Defaults to 8.
     * @yamlKey data_bits
     */
    dataBits?: number;
    /** The parity used on the UART bus. Options: `NONE`, `EVEN`, `ODD`. Defaults to `NONE`. */
    parity?: "NONE" | "EVEN" | "ODD";
    /** mapping: Options for debugging communication on the UART hub, see [Debugging](https://esphome.io/components/uart#uart... */
    debug?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            uart: UartProps & ComponentProps<uart_UARTComponent>;
        }
    }
}
