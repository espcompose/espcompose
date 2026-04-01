// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { image_Image } from "../markers";
export interface ImageProps {
    /** @filePath — path (relative to YAML), MDI icon (mdi:name), or URL. */
    file: string;
    type: "BINARY" | "GRAYSCALE" | "RGB565" | "RGB" | "RGBA" | "TRANSPARENT_BINARY";
    /** Resize to fit WIDTHxHEIGHT, preserving aspect ratio. */
    resize?: string;
    transparency?: "opaque" | "chroma_key" | "alpha_channel";
    /**
     * Invert colors (binary/grayscale only). Defaults to false.
     * @yamlKey invert_alpha
     */
    invertAlpha?: boolean;
    /** Dither method for GRAYSCALE/BINARY images. Defaults to NONE. */
    dither?: "NONE" | "FLOYDSTEINBERG";
    /**
     * Pixel byte order for RGB565 images. Defaults to big_endian.
     * @yamlKey byte_order
     */
    byteOrder?: "big_endian" | "little_endian";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            image: ImageProps & ComponentProps<image_Image>;
        }
    }
}
