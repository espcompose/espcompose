// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { cd74hc4067_CD74HC4067Component } from "../markers";
export interface Cd74hc4067Props extends _CoreComponent {
    /** @yamlKey pin_s0 */
    pinS0: Pin;
    /** @yamlKey pin_s1 */
    pinS1: Pin;
    /** @yamlKey pin_s2 */
    pinS2: Pin;
    /** @yamlKey pin_s3 */
    pinS3: Pin;
    /** [Time](/guides/configuration-types#time): A small delay duration needed for the chip to switch inputs, defaults to 2ms. */
    delay?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            cd74hc4067: Cd74hc4067Props & ComponentProps<cd74hc4067_CD74HC4067Component>;
        }
    }
}
