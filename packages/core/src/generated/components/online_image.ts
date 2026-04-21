// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_http_request_HttpRequestComponent, __marker_image_Image, __marker_online_image_OnlineImage } from "../markers";
export interface OnlineImageRequestHeadersProps {
    string?: string;
}
export interface OnlineImageProps extends _CoreComponent {
    /**
     * int: Explicitly specify the size of the buffer where the image chunks are being downloaded while decoding. The defaul...
     * @yamlKey buffer_size
     */
    bufferSize?: number;
    /**
     * string: For RGB565 images, the pixels are converted to 16 bit values. By default these will be stored in big endian b...
     * @yamlKey byte_order
     */
    byteOrder?: "BIG_ENDIAN" | "LITTLE_ENDIAN";
    /** The format that the image is encoded with. */
    format: "BMP" | "JPEG" | "JPG" | "PNG";
    /** @yamlKey http_request_id */
    httpRequestId?: RefProp<__marker_http_request_HttpRequestComponent>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the image has been successfully downloaded.
     * @yamlKey on_download_finished
     */
    onDownloadFinished?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when an error happened during download or decode.
     * @yamlKey on_error
     */
    onError?: TriggerHandler;
    /** [ID](https://esphome.io/guides/configuration-types#id): ID of an [Image](https://esphome.io/components/image/) to dis... */
    placeholder?: RefProp<__marker_image_Image>;
    /**
     * mapping: Map of HTTP headers. Values are [templatable](https://esphome.io/automations/templates).
     * @yamlKey request_headers
     */
    requestHeaders?: OnlineImageRequestHeadersProps;
    /** string: If set, this will resize the image to fit inside the given dimensions `WIDTHxHEIGHT` and preserve the aspect ... */
    resize?: string;
    /** If set the alpha channel of the input image will be taken into account. The possible values are `opaque` (default), `... */
    transparency?: unknown;
    /** Specifies how to encode image internally. */
    type: unknown;
    /**
     * int: Redownload the image when the specified time has elapsed. Defaults to `never` (i.e. the update component action ...
     * @yamlKey update_interval
     */
    updateInterval?: number;
    /** url: The URL where the image will be downloaded from. */
    url: string;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            online_image: OnlineImageProps & ComponentProps<__marker_online_image_OnlineImage>;
        }
    }
}
