// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { factory_reset_FactoryResetComponent } from "../markers";
export interface FactoryResetMaxDelayProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface FactoryResetProps extends _CoreComponent {
    /**
     * [Time](/guides/configuration-types#time): The maximum delay between power cycles. Default: 10s
     * @yamlKey max_delay
     */
    maxDelay?: FactoryResetMaxDelayProps;
    /**
     * integer: The number of power cycles after which the device will be reset. No default, if not configured the power cyc...
     * @yamlKey resets_required
     */
    resetsRequired?: number;
    /** @yamlKey on_increment */
    onIncrement?: () => void;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            factory_reset: FactoryResetProps & ComponentProps<factory_reset_FactoryResetComponent>;
        }
    }
}
