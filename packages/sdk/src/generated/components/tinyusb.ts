// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { tinyusb_TinyUSB } from "../markers";
export interface TinyusbProps extends _CoreComponent {
    /**
     * int: USB product identifier. Defaults to `0x4001`.
     * @yamlKey usb_product_id
     */
    usbProductId?: number | EmbedValue<number>;
    /**
     * int: USB vendor identifier. Defaults to `0x303A` (Espressif Systems).
     * @yamlKey usb_vendor_id
     */
    usbVendorId?: number | EmbedValue<number>;
    /**
     * int: USB language identifier. Defaults to `0x0409` (English - United States).
     * @yamlKey usb_lang_id
     */
    usbLangId?: number | EmbedValue<number>;
    /**
     * string: Manufacturer string descriptor. Defaults to `"ESPHome"`.
     * @yamlKey usb_manufacturer_str
     */
    usbManufacturerStr?: string | EmbedValue<string>;
    /**
     * string: Product name string descriptor. Defaults to `"ESPHome"`.
     * @yamlKey usb_product_str
     */
    usbProductStr?: string | EmbedValue<string>;
    /**
     * string: Serial number string descriptor. If not specified, the device's MAC address will be used.
     * @yamlKey usb_serial_str
     */
    usbSerialStr?: string | EmbedValue<string>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tinyusb: TinyusbProps & ComponentProps<tinyusb_TinyUSB>;
        }
    }
}
