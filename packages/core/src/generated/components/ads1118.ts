// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_ads1118_ADS1118, __marker_spi_SPIComponent } from "../markers";
export interface Ads1118Props extends _CoreComponent {
    /**
     * int: The SPI cable select pin to use.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
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
            ads1118: Ads1118Props & ComponentProps<__marker_ads1118_ADS1118>;
        }
    }
}
