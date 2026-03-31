// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { esp_ldo_EspLdo } from "../markers";
export interface EspLdoProps extends _CoreComponent {
    /** voltage: The desired output voltage. Must be in the range ``0.5V`` to ``2.7V``, or ``passthrough`` to enable pass-thr... */
    voltage: unknown;
    /** int: The channel number of the LDO regulator to configure. Valid values are 1–4. Channels 3 and 4 are available for g... */
    channel: "1" | "2" | "3" | "4";
    /** bool: If true, the output voltage can be adjusted at runtime using the ``esp_ldo.voltage.adjust`` action. Defaults to... */
    adjustable?: boolean | EmbedValue<boolean>;
    /**
     * bool: Must be set to ``true`` to use channels 1 or 2. These channels are normally reserved by the chip for flash and ...
     * @yamlKey allow_internal_channel
     */
    allowInternalChannel?: boolean | EmbedValue<boolean>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp_ldo: EspLdoProps & ComponentProps<esp_ldo_EspLdo>;
        }
    }
}
