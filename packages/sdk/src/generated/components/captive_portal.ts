// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { captive_portal_CaptivePortal, web_server_base_WebServerBase } from "../markers";
export interface CaptivePortalProps extends _CoreComponent {
    /** @yamlKey web_server_base_id */
    webServerBaseId?: RefProp<web_server_base_WebServerBase>;
    /** string: The compression algorithm used for the embedded web assets. Options are `gzip` or `br` (Brotli). Brotli provi... */
    compression?: "gzip" | "br";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            captive_portal: CaptivePortalProps & ComponentProps<captive_portal_CaptivePortal>;
        }
    }
}
