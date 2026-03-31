// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { hlk_fm22x_HlkFm22xComponent, uart_UARTComponent } from "../markers";
export interface HlkFm22xProps extends _CoreComponent {
    /**
     * [Automation](/automations/): An action to be performed when an enrolled face is scanned and recognized. See [`on_face...
     * @yamlKey on_face_scan_matched
     */
    onFaceScanMatched?: TriggerHandler;
    /**
     * [Automation](/automations/): An action to be performed when an unknown face is scanned. See [`on_face_scan_unmatched`...
     * @yamlKey on_face_scan_unmatched
     */
    onFaceScanUnmatched?: TriggerHandler;
    /**
     * [Automation](/automations/): An action to be performed when the face scan failed. See [`on_face_scan_invalid`](https:...
     * @yamlKey on_face_scan_invalid
     */
    onFaceScanInvalid?: TriggerHandler;
    /**
     * [Automation](/automations/): An action to be performed when face information is available. See [`on_face_info`](https...
     * @yamlKey on_face_info
     */
    onFaceInfo?: TriggerHandler;
    /**
     * [Automation](/automations/): An action to be performed when a face enrollment step is successful. See [`on_enrollment...
     * @yamlKey on_enrollment_done
     */
    onEnrollmentDone?: TriggerHandler;
    /**
     * [Automation](/automations/): An action to be performed when a face enrollment step failed. See [`on_enrollment_failed...
     * @yamlKey on_enrollment_failed
     */
    onEnrollmentFailed?: TriggerHandler;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * ID: Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            hlk_fm22x: HlkFm22xProps & ComponentProps<hlk_fm22x_HlkFm22xComponent>;
        }
    }
}
