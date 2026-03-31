// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, TriggerHandler } from "../../types";
export interface ExposureNotificationsProps {
    /**
     * [Automation](/automations): An automation to run when an exposure notification bluetooth message is received. A varia...
     * @yamlKey on_exposure_notification
     */
    onExposureNotification: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            exposure_notifications: ExposureNotificationsProps & ComponentProps;
        }
    }
}
