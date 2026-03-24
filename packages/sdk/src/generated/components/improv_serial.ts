// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { improv_serial_ImprovSerialComponent } from "../markers";
export interface ImprovSerialProps {
    /**
     * url: A URL that can be used to forward the user to after setting credentials with improv.
     * @yamlKey next_url
     */
    nextUrl?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            improv_serial: ImprovSerialProps & ComponentProps<improv_serial_ImprovSerialComponent>;
        }
    }
}
