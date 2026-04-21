// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _Canbus } from "../bases";
import type { __marker_esp32_can_ESP32Can, __marker_mcp2515_MCP2515, __marker_spi_SPIComponent } from "../markers";
interface Esp32CanProps extends _Canbus {
    /** enum: Operating mode. One of: */
    mode?: "LISTENONLY" | "NORMAL";
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): Receive pin.
     * @yamlKey rx_pin
     */
    rxPin: Pin;
    /**
     * int: Length of RX queue.
     * @yamlKey rx_queue_len
     */
    rxQueueLen?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Maximum time to wait when the TX queue is full before dro...
     * @yamlKey tx_enqueue_timeout
     */
    txEnqueueTimeout?: TimePeriod;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): Transmit pin.
     * @yamlKey tx_pin
     */
    txPin: Pin;
    /**
     * int: Length of TX queue, 0 to disable.
     * @yamlKey tx_queue_len
     */
    txQueueLen?: number;
}
interface Mcp2515Props extends _Canbus {
    /** enum: The frequency of the clock crystal used on the MCP2515 device. One of `8MHZ`, `12MHZ`, `16MHZ` or `20MHZ`. Defa... */
    clock?: "12MHZ" | "16MHZ" | "20MHZ" | "8MHZ";
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Is used to signal to a SPI device when it sho...
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** enum: Operating mode. One of: */
    mode?: "LISTENONLY" | "LOOPBACK" | "NORMAL";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
export type CanbusProps = ({
    platform: "esp32_can";
} & Esp32CanProps & ComponentProps<__marker_esp32_can_ESP32Can>) | ({
    platform: "mcp2515";
} & Mcp2515Props & ComponentProps<__marker_mcp2515_MCP2515>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            canbus: CanbusProps;
        }
    }
}
