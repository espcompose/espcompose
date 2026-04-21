// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_lightwaverf_LightWaveRF } from "../markers";
export interface LightwaverfProps extends _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin that the receiver is connected to
     * @yamlKey read_pin
     */
    readPin?: Pin;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin that the transmitter is connected to
     * @yamlKey write_pin
     */
    writePin?: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            lightwaverf: LightwaverfProps & ComponentProps<__marker_lightwaverf_LightWaveRF>;
        }
    }
}
