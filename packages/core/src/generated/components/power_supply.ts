// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_power_supply_PowerSupply } from "../markers";
export interface PowerSupplyProps extends _CoreComponent {
    /**
     * bool: If the power supply should be enabled when the power supply component is setup. Defaults to false. The startup ...
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time that the power supply needs for startup. The out...
     * @yamlKey enable_time
     */
    enableTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time the power supply should be kept enabled after th...
     * @yamlKey keep_on_time
     */
    keepOnTime?: TimePeriod;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The GPIO pin to control the power supply on. */
    pin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            power_supply: PowerSupplyProps & ComponentProps<__marker_power_supply_PowerSupply>;
        }
    }
}
