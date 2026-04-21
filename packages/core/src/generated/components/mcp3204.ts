// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_mcp3204_MCP3204, __marker_spi_SPIComponent } from "../markers";
export interface Mcp3204Props {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The SPI cable select pin to use.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * float: The reference voltage. Defaults to `3.3V`.
     * @yamlKey reference_voltage
     */
    referenceVoltage?: number;
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
            mcp3204: Mcp3204Props & ComponentProps<__marker_mcp3204_MCP3204>;
        }
    }
}
