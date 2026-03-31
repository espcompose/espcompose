// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { usb_host_USBHost } from "../markers";
export interface UsbHostDevicesProps {
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    vid: number;
    pid: number;
}
export interface UsbHostProps extends _CoreComponent {
    /**
     * boolean: Whether to include support for hubs. Defaults to `false`.
     * @yamlKey enable_hubs
     */
    enableHubs?: boolean | EmbedValue<boolean>;
    /**
     * int: Maximum number of concurrent USB transfer requests. Range: 1-32. Defaults to `16`. Increase this value for high-...
     * @yamlKey max_transfer_requests
     */
    maxTransferRequests?: number | EmbedValue<number>;
    /** list: A list of devices to configure. */
    devices?: Array<UsbHostDevicesProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            usb_host: UsbHostProps & ComponentProps<usb_host_USBHost>;
        }
    }
}
