// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_pn7150_PN7150 } from "../markers";
export interface Pn7150I2cProps extends _CoreComponent {
    address?: number;
    /** @yamlKey emulation_message */
    emulationMessage?: string;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** @yamlKey irq_pin */
    irqPin: Pin;
    /** @yamlKey on_emulated_tag_scan */
    onEmulatedTagScan?: TriggerHandler;
    /** @yamlKey on_finished_write */
    onFinishedWrite?: TriggerHandler;
    /** @yamlKey on_tag */
    onTag?: TriggerHandler;
    /** @yamlKey on_tag_removed */
    onTagRemoved?: TriggerHandler;
    /** @yamlKey tag_ttl */
    tagTtl?: TimePeriod;
    /** @yamlKey ven_pin */
    venPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pn7150_i2c: Pn7150I2cProps & ComponentProps<__marker_pn7150_PN7150>;
        }
    }
}
