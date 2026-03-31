// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { ads1118_ADS1118, spi_SPIComponent } from "../markers";
export interface Ads1118Props {
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * int: The SPI cable select pin to use.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ads1118: Ads1118Props & ComponentProps<ads1118_ADS1118>;
        }
    }
}
