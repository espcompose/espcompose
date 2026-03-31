// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { spi_SPIComponent, spi_device_SPIDeviceComponent } from "../markers";
export interface SpiDeviceProps {
    /** @yamlKey bit_order */
    bitOrder?: "msb_first" | "lsb_first";
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /** @yamlKey cs_pin */
    csPin?: Pin | EmbedValue<Pin>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            spi_device: SpiDeviceProps & ComponentProps<spi_device_SPIDeviceComponent>;
        }
    }
}
