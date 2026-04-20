// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_mapping_Mapping } from "../markers";
export interface MappingProps {
    /** string: The type of the keys in the mapping. Can be one of `string` or `int`. */
    from: "int" | "string";
    /** string: The type of values in the map. May be one of `string` or `int` or a class specifier as discussed below. */
    to: string;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mapping: MappingProps & ComponentProps<__marker_mapping_Mapping>;
        }
    }
}
