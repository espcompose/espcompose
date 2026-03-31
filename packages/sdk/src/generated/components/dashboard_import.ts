// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, TriggerHandler } from "../../types";
export interface DashboardImportProps {
    /** @yamlKey package_import_url */
    packageImportUrl: unknown;
    /** @yamlKey import_full_config */
    importFullConfig?: boolean | EmbedValue<boolean>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dashboard_import: DashboardImportProps & ComponentProps;
        }
    }
}
