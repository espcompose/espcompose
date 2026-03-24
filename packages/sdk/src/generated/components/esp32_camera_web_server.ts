// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { esp32_camera_web_server_CameraWebServer } from "../markers";
export interface Esp32CameraWebServerProps extends _CoreComponent {
    /** string: The serving port. */
    port: number;
    /** string: The operation mode. One of these values: */
    mode: "STREAM" | "SNAPSHOT";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_camera_web_server: Esp32CameraWebServerProps & ComponentProps<esp32_camera_web_server_CameraWebServer>;
        }
    }
}
