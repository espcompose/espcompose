// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
export interface ExposureNotificationsProps {
    /**
     * [Automation](https://esphome.io/automations): An automation to run when an exposure notification bluetooth message is...
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
