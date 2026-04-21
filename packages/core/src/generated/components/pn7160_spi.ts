// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_pn7160_spi_PN7160Spi, __marker_spi_SPIComponent } from "../markers";
export interface Pn7160SpiProps {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to the PN7160's `NSS` (chip...
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [SPI Component](https://esphom...
     * @yamlKey spi_id
     */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pn7160_spi: Pn7160SpiProps & ComponentProps<__marker_pn7160_spi_PN7160Spi>;
        }
    }
}
