// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _Pn532 } from "../bases";
import type { pn532_spi_PN532Spi, spi_SPIComponent } from "../markers";
export interface Pn532SpiProps extends _Pn532 {
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
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin on the ESP that the chip select line is connected to.
     * @yamlKey cs_pin
     */
    csPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pn532_spi: Pn532SpiProps & ComponentProps<pn532_spi_PN532Spi>;
        }
    }
}
