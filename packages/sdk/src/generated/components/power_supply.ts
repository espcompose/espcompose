// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { power_supply_PowerSupply } from "../markers";
export interface PowerSupplyProps extends _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The GPIO pin to control the power supply on. */
    pin: Pin | EmbedValue<Pin>;
    /**
     * [Time](/guides/configuration-types#time): The time that the power supply needs for startup. The output component will...
     * @yamlKey enable_time
     */
    enableTime?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The time the power supply should be kept enabled after the last output that...
     * @yamlKey keep_on_time
     */
    keepOnTime?: TimePeriod;
    /**
     * bool: If the power supply should be enabled when the power supply component is setup. Defaults to false. The startup ...
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean | EmbedValue<boolean>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            power_supply: PowerSupplyProps & ComponentProps<power_supply_PowerSupply>;
        }
    }
}
