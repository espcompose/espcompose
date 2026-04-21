// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_spi_SPIComponent, __marker_weikai_spi_WeikaiComponentSPI } from "../markers";
export interface Wk2204SpiProps {
    /** @yamlKey cs_pin */
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
            wk2204_spi: Wk2204SpiProps & ComponentProps<__marker_weikai_spi_WeikaiComponentSPI>;
        }
    }
}
