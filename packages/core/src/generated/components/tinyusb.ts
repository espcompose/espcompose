// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_tinyusb_TinyUSB } from "../markers";
export interface TinyusbProps extends _CoreComponent {
    /**
     * int: USB language identifier. Defaults to `0x0409` (English - United States).
     * @yamlKey usb_lang_id
     */
    usbLangId?: number;
    /**
     * string: Manufacturer string descriptor. Defaults to `"ESPHome"`.
     * @yamlKey usb_manufacturer_str
     */
    usbManufacturerStr?: string;
    /**
     * int: USB product identifier. Defaults to `0x4001`.
     * @yamlKey usb_product_id
     */
    usbProductId?: number;
    /**
     * string: Product name string descriptor. Defaults to `"ESPHome"`.
     * @yamlKey usb_product_str
     */
    usbProductStr?: string;
    /**
     * string: Serial number string descriptor. If not specified, the device's MAC address will be used.
     * @yamlKey usb_serial_str
     */
    usbSerialStr?: string;
    /**
     * int: USB vendor identifier. Defaults to `0x303A` (Espressif Systems).
     * @yamlKey usb_vendor_id
     */
    usbVendorId?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tinyusb: TinyusbProps & ComponentProps<__marker_tinyusb_TinyUSB>;
        }
    }
}
