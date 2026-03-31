// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { sm2135_SM2135 } from "../markers";
export interface Sm2135Props extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin used for MOSI.
     * @yamlKey data_pin
     */
    dataPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin which SCLK is
     * @yamlKey clock_pin
     */
    clockPin: Pin | EmbedValue<Pin>;
    /**
     * current: The current used for the RGB channel. Defaults to `20mA`. Can be one of `10mA`, `15mA`, `20mA`, `25mA`, `30m...
     * @yamlKey rgb_current
     */
    rgbCurrent?: "10mA" | "15mA" | "20mA" | "25mA" | "30mA" | "35mA" | "40mA" | "45mA";
    /**
     * current: The current used for the white channel. Defaults to `10mA`. Can be one of `10mA`, `15mA`, `20mA`, `25mA`, `3...
     * @yamlKey cw_current
     */
    cwCurrent?: "10mA" | "15mA" | "20mA" | "25mA" | "30mA" | "35mA" | "40mA" | "45mA" | "50mA" | "55mA" | "60mA";
    /**
     * bool: Use separate RGB/CW modes instead of writing all 5 values as RGB. Defaults to `true`, keep it at `true` if your...
     * @yamlKey separate_modes
     */
    separateModes?: boolean | EmbedValue<boolean>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sm2135: Sm2135Props & ComponentProps<sm2135_SM2135>;
        }
    }
}
