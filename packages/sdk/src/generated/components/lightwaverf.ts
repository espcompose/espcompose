// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { lightwaverf_LightWaveRF } from "../markers";
export interface LightwaverfProps extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin that the receiver is connected to
     * @yamlKey read_pin
     */
    readPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin that the transmitter is connected to
     * @yamlKey write_pin
     */
    writePin?: Pin;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            lightwaverf: LightwaverfProps & ComponentProps<lightwaverf_LightWaveRF>;
        }
    }
}
