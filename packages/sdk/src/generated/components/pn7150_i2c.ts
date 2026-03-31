// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus, pn7150_PN7150 } from "../markers";
export interface Pn7150I2cProps extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
    /** @yamlKey on_emulated_tag_scan */
    onEmulatedTagScan?: TriggerHandler;
    /** @yamlKey on_finished_write */
    onFinishedWrite?: TriggerHandler;
    /** @yamlKey on_tag */
    onTag?: TriggerHandler;
    /** @yamlKey on_tag_removed */
    onTagRemoved?: TriggerHandler;
    /** @yamlKey irq_pin */
    irqPin: Pin | EmbedValue<Pin>;
    /** @yamlKey ven_pin */
    venPin: Pin | EmbedValue<Pin>;
    /** @yamlKey emulation_message */
    emulationMessage?: string | EmbedValue<string>;
    /** @yamlKey tag_ttl */
    tagTtl?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pn7150_i2c: Pn7150I2cProps & ComponentProps<pn7150_PN7150>;
        }
    }
}
