// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _Rc522 } from "../bases";
import type { rc522_spi_RC522Spi, spi_SPIComponent } from "../markers";
export interface Rc522SpiProps extends _Rc522 {
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
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin on the ESP that the chip select line is connected to.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rc522_spi: Rc522SpiProps & ComponentProps<rc522_spi_RC522Spi>;
        }
    }
}
