// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_safe_mode_SafeModeComponent } from "../markers";
export interface SafeModeProps extends _CoreComponent {
    /**
     * [Time](/guides/configuration-types#time): The amount of time after which the boot is considered successful.
     * @yamlKey boot_is_good_after
     */
    bootIsGoodAfter?: TimePeriod;
    /** boolean: Set to `true` to disable safe_mode. [Ota](/components/ota/) automatically */
    disabled?: boolean;
    /**
     * int: The number of failed boot attempts which must occur before invoking safe mode.
     * @yamlKey num_attempts
     */
    numAttempts?: number;
    /**
     * [Time](/guides/configuration-types#time): The amount of time to wait before rebooting when in safe mode.
     * @yamlKey reboot_timeout
     */
    rebootTimeout?: TimePeriod;
    /**
     * [Automation](/automations): An action to be performed once when safe mode is invoked.
     * @yamlKey on_safe_mode
     */
    onSafeMode?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            safe_mode: SafeModeProps & ComponentProps<__marker_safe_mode_SafeModeComponent>;
        }
    }
}
