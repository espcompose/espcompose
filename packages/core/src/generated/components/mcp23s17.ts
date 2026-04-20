// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_mcp23s17_MCP23S17, __marker_spi_SPIComponent } from "../markers";
export interface Mcp23s17Props extends _CoreComponent {
    /**
     * int: The SPI chip select pin to use.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** int: The address of the chip. Defaults to `0`. */
    deviceaddress?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to the INTA or INTB output ...
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * boolean: Configure interrupt pins to open-drain mode. Useful when the MCP23S17's power supply is greater than 3.3 vol...
     * @yamlKey open_drain_interrupt
     */
    openDrainInterrupt?: boolean;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mcp23s17: Mcp23s17Props & ComponentProps<__marker_mcp23s17_MCP23S17>;
        }
    }
}
