// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_ds2484_DS2484OneWireBus, __marker_gpio_GPIOOneWireBus, __marker_i2c_I2CBus } from "../markers";
interface Ds2484Props extends _CoreComponent {
    /**
     * defaults to `false`: enables DS2484 `active_pullup`.
     * @yamlKey active_pullup
     */
    activePullup?: boolean;
    /**
     * defaults to `false`: enables DS2484 `strong_pullup`.
     * @yamlKey strong_pullup
     */
    strongPullup?: boolean;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [I2C](/components/i2c/). Required if you have co...
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the device. Defaults to `0x18`. */
    address?: number;
}
interface GpioProps extends _CoreComponent {
    /** number: The pin which will be use for bus communication. Note that 1-wire is a bi-directional bus so the selected GPI... */
    pin: Pin;
}
export type OneWireProps = ({
    platform: "ds2484";
} & Ds2484Props & ComponentProps<__marker_ds2484_DS2484OneWireBus>) | ({
    platform: "gpio";
} & GpioProps & ComponentProps<__marker_gpio_GPIOOneWireBus>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            one_wire: OneWireProps;
        }
    }
}
