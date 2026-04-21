// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
export interface ExternalComponentsProps {
    components?: Array<string>;
    refresh?: string;
    /** Repository type. One of `local`, `git`. */
    source: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            external_components: ExternalComponentsProps & ComponentProps;
        }
    }
}
