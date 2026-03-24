// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { mcp23s08_MCP23S08, spi_SPIComponent } from "../markers";
export interface Mcp23s08Props extends _CoreComponent {
    /** int: The address of the chip. Defaults to `0`. */
    deviceaddress?: number;
    /**
     * boolean: Configure interrupt pins to open-drain mode. Useful when the MCP23S08's power supply is greater than 3.3 vol...
     * @yamlKey open_drain_interrupt
     */
    openDrainInterrupt?: boolean;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * int: The SPI chip select pin to use
     * @yamlKey cs_pin
     */
    csPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mcp23s08: Mcp23s08Props & ComponentProps<mcp23s08_MCP23S08>;
        }
    }
}
