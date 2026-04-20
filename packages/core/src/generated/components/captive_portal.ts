// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_captive_portal_CaptivePortal, __marker_web_server_base_WebServerBase } from "../markers";
export interface CaptivePortalProps extends _CoreComponent {
    /** string: The compression algorithm used for the embedded web assets. Options are `gzip` or `br` (Brotli). Brotli provi... */
    compression?: "br" | "gzip";
    /** @yamlKey web_server_base_id */
    webServerBaseId?: RefProp<__marker_web_server_base_WebServerBase>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            captive_portal: CaptivePortalProps & ComponentProps<__marker_captive_portal_CaptivePortal>;
        }
    }
}
