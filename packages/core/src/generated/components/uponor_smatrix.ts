// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _UartDevice } from "../bases";
import type { __marker_time_RealTimeClock, __marker_uponor_smatrix_UponorSmatrixComponent } from "../markers";
export interface UponorSmatrixProps extends _CoreComponent, _UartDevice {
    /**
     * [ID](/guides/configuration-types#id): Specify the ID of the [Time Component](/components/time/) to use as the time so...
     * @yamlKey time_id
     */
    timeId?: RefProp<__marker_time_RealTimeClock>;
    /**
     * int: The 32 bit device address of the thermostat that keeps the system time. This will be automatically detected from...
     * @yamlKey time_device_address
     */
    timeDeviceAddress?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            uponor_smatrix: UponorSmatrixProps & ComponentProps<__marker_uponor_smatrix_UponorSmatrixComponent>;
        }
    }
}
