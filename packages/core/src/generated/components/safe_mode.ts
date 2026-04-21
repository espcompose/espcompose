// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_safe_mode_SafeModeComponent } from "../markers";
export interface SafeModeProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time after which the boot is considered suc...
     * @yamlKey boot_is_good_after
     */
    bootIsGoodAfter?: TimePeriod;
    /** boolean: Set to `true` to disable safe_mode. [Ota](https://esphome.io/components/ota/) automatically */
    disabled?: boolean;
    /**
     * int: The number of failed boot attempts which must occur before invoking safe mode.
     * @yamlKey num_attempts
     */
    numAttempts?: number;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed once when safe mode is invoked.
     * @yamlKey on_safe_mode
     */
    onSafeMode?: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time to wait before rebooting when in safe ...
     * @yamlKey reboot_timeout
     */
    rebootTimeout?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            safe_mode: SafeModeProps & ComponentProps<__marker_safe_mode_SafeModeComponent>;
        }
    }
}
