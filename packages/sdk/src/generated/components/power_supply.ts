// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { power_supply_PowerSupply } from "../markers";
export interface PowerSupplyEnableTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface PowerSupplyKeepOnTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface PowerSupplyProps extends _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The GPIO pin to control the power supply on. */
    pin: Pin;
    /**
     * [Time](/guides/configuration-types#time): The time that the power supply needs for startup. The output component will...
     * @yamlKey enable_time
     */
    enableTime?: PowerSupplyEnableTimeProps;
    /**
     * [Time](/guides/configuration-types#time): The time the power supply should be kept enabled after the last output that...
     * @yamlKey keep_on_time
     */
    keepOnTime?: PowerSupplyKeepOnTimeProps;
    /**
     * bool: If the power supply should be enabled when the power supply component is setup. Defaults to false. The startup ...
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            power_supply: PowerSupplyProps & ComponentProps<power_supply_PowerSupply>;
        }
    }
}
