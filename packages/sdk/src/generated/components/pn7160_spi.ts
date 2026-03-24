// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { pn7160_spi_PN7160Spi, spi_SPIComponent } from "../markers";
export interface Pn7160SpiProps {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [SPI Component](/components/spi) if you want to ...
     * @yamlKey spi_id
     */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin connected to the PN7160's `NSS` (chip select) line.
     * @yamlKey cs_pin
     */
    csPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pn7160_spi: Pn7160SpiProps & ComponentProps<pn7160_spi_PN7160Spi>;
        }
    }
}
