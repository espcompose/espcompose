// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { mcp3204_MCP3204, spi_SPIComponent } from "../markers";
export interface Mcp3204Props {
    /**
     * float: The reference voltage. Defaults to `3.3V`.
     * @yamlKey reference_voltage
     */
    referenceVoltage?: number;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The SPI cable select pin to use.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mcp3204: Mcp3204Props & ComponentProps<mcp3204_MCP3204>;
        }
    }
}
