// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_hlk_fm22x_HlkFm22xComponent, __marker_uart_UARTComponent } from "../markers";
export interface HlkFm22xProps extends _CoreComponent {
    /**
     * [Automation](https://esphome.io/automations/): An action to be performed when a face enrollment step is successful. S...
     * @yamlKey on_enrollment_done
     */
    onEnrollmentDone?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations/): An action to be performed when a face enrollment step failed. See [`on...
     * @yamlKey on_enrollment_failed
     */
    onEnrollmentFailed?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations/): An action to be performed when face information is available. See [`on...
     * @yamlKey on_face_info
     */
    onFaceInfo?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations/): An action to be performed when the face scan failed. See [`on_face_sca...
     * @yamlKey on_face_scan_invalid
     */
    onFaceScanInvalid?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations/): An action to be performed when an enrolled face is scanned and recogni...
     * @yamlKey on_face_scan_matched
     */
    onFaceScanMatched?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations/): An action to be performed when an unknown face is scanned. See [`on_fa...
     * @yamlKey on_face_scan_unmatched
     */
    onFaceScanUnmatched?: TriggerHandler;
    /**
     * ID: Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            hlk_fm22x: HlkFm22xProps & ComponentProps<__marker_hlk_fm22x_HlkFm22xComponent>;
        }
    }
}
