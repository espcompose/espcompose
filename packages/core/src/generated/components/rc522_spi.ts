// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _Rc522 } from "../bases";
import type { __marker_rc522_spi_RC522Spi, __marker_spi_SPIComponent } from "../markers";
export interface Rc522SpiProps extends _Rc522 {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin on the ESP that the chip select line ...
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
            rc522_spi: Rc522SpiProps & ComponentProps<__marker_rc522_spi_RC522Spi>;
        }
    }
}
