// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
export interface ExternalComponentsProps {
    /** Repository type. One of `local`, `git`. */
    source: unknown;
    refresh?: string;
    components?: Array<string>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            external_components: ExternalComponentsProps & ComponentProps;
        }
    }
}
