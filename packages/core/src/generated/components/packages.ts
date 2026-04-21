// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
import type { _PackagesPackage } from "../bases";
export interface PackagesStringPropsFilesProps {
    path: unknown;
    vars?: Record<string, unknown>;
}
export interface PackagesStringProps {
    file?: unknown;
    /** List of files to include. Can be one of: */
    files?: Array<PackagesStringPropsFilesProps>;
    /** string: Password to be used for authentication, if required. */
    password?: string;
    /** string: Base common path of included files. */
    path?: string;
    /** string: The Git ref(erence) to be used when pulling content from the repository. */
    ref?: string;
    /** [Time](https://esphome.io/guides/configuration-types#time): The interval at which the content from the repository sho... */
    refresh?: string;
    /** string: The URL for the repository. */
    url: string;
    /** string: Username to be used for authentication, if required. */
    username?: string;
}
export interface PackagesProps extends _PackagesPackage {
    string?: PackagesStringProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            packages: PackagesProps & ComponentProps;
        }
    }
}
