// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_factory_reset_FactoryResetComponent } from "../markers";
export interface FactoryResetProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The maximum delay between power cycles. Default: 10s
     * @yamlKey max_delay
     */
    maxDelay?: TimePeriod;
    /** @yamlKey on_increment */
    onIncrement?: TriggerHandler;
    /**
     * integer: The number of power cycles after which the device will be reset. No default, if not configured the power cyc...
     * @yamlKey resets_required
     */
    resetsRequired?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            factory_reset: FactoryResetProps & ComponentProps<__marker_factory_reset_FactoryResetComponent>;
        }
    }
}
