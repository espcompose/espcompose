// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_image_Image } from "../markers";
export interface ImageProps {
    /**
     * Pixel byte order for RGB565 images. Defaults to big_endian.
     * @yamlKey byte_order
     */
    byteOrder?: "big_endian" | "little_endian";
    /** Dither method for GRAYSCALE/BINARY images. Defaults to NONE. */
    dither?: "FLOYDSTEINBERG" | "NONE";
    /** @filePath — path (relative to YAML), MDI icon (mdi:name), or URL. */
    file: string;
    /**
     * Invert colors (binary/grayscale only). Defaults to false.
     * @yamlKey invert_alpha
     */
    invertAlpha?: boolean;
    /** Resize to fit WIDTHxHEIGHT, preserving aspect ratio. */
    resize?: string;
    transparency?: "alpha_channel" | "chroma_key" | "opaque";
    type: "BINARY" | "GRAYSCALE" | "RGB" | "RGB565" | "RGBA" | "TRANSPARENT_BINARY";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            image: ImageProps & ComponentProps<__marker_image_Image>;
        }
    }
}
