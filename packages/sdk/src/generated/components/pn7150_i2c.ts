// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus, pn7150_PN7150 } from "../markers";
export interface Pn7150I2cTagTtlProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface Pn7150I2cProps extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: unknown;
    /** @yamlKey on_emulated_tag_scan */
    onEmulatedTagScan?: () => void;
    /** @yamlKey on_finished_write */
    onFinishedWrite?: () => void;
    /** @yamlKey on_tag */
    onTag?: () => void;
    /** @yamlKey on_tag_removed */
    onTagRemoved?: () => void;
    /** @yamlKey irq_pin */
    irqPin: Pin;
    /** @yamlKey ven_pin */
    venPin: Pin;
    /** @yamlKey emulation_message */
    emulationMessage?: string;
    /** @yamlKey tag_ttl */
    tagTtl?: Pn7150I2cTagTtlProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pn7150_i2c: Pn7150I2cProps & ComponentProps<pn7150_PN7150>;
        }
    }
}
