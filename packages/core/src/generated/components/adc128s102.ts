// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_adc128s102_ADC128S102, __marker_spi_SPIComponent } from "../markers";
export interface Adc128s102Props {
    /**
     * int: The SPI cable select pin to use
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
            adc128s102: Adc128s102Props & ComponentProps<__marker_adc128s102_ADC128S102>;
        }
    }
}
