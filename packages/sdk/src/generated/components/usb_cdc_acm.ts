// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { usb_cdc_acm_USBCDCACMComponent } from "../markers";
export interface UsbCdcAcmInterfacesProps {
}
export interface UsbCdcAcmProps extends _CoreComponent {
    /**
     * int: Size of the USB receive buffer in bytes. Range: 1-65535. Defaults to `256`.
     * @yamlKey rx_buffer_size
     */
    rxBufferSize?: number | EmbedValue<number>;
    /**
     * int: Size of the USB transmit buffer in bytes. Range: 1-65535. Defaults to `256`.
     * @yamlKey tx_buffer_size
     */
    txBufferSize?: number | EmbedValue<number>;
    /** list: List of CDC-ACM interface instances. Up to two are supported; at least one is required. Defaults to a single-it... */
    interfaces?: Array<UsbCdcAcmInterfacesProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            usb_cdc_acm: UsbCdcAcmProps & ComponentProps<usb_cdc_acm_USBCDCACMComponent>;
        }
    }
}
