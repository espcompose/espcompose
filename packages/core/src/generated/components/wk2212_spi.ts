// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { spi_SPIComponent, weikai_spi_WeikaiComponentSPI } from "../markers";
export interface Wk2212SpiProps {
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey cs_pin */
    csPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            wk2212_spi: Wk2212SpiProps & ComponentProps<weikai_spi_WeikaiComponentSPI>;
        }
    }
}
