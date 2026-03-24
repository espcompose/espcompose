// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { animation_Animation } from "../markers";
export interface AnimationLoopProps {
    /**
     * int: The frame to loop back to when `end_frame` is reached. Defaults to the first frame in the animation.
     * @yamlKey start_frame
     */
    startFrame?: number;
    /**
     * int: The last frame to show in the loop; when this frame is reached it will loop back to `start_frame`. Defaults to t...
     * @yamlKey end_frame
     */
    endFrame?: number;
    /** int: Specifies how many times the loop will run. When the count is reached, the animation will continue with the next... */
    repeat?: number;
}
export interface AnimationProps {
    /** string: The path (relative to where the .yaml file is) of the gif file. */
    file: unknown;
    /** string: If set, this will resize all the frames to fit inside the given dimensions `WIDTHxHEIGHT` and preserve the as... */
    resize?: unknown;
    dither?: "NONE" | "FLOYDSTEINBERG";
    /** @yamlKey invert_alpha */
    invertAlpha?: boolean;
    /** @yamlKey byte_order */
    byteOrder?: "BIG_ENDIAN" | "LITTLE_ENDIAN";
    /** If set the alpha channel of the input image will be taken into account. The possible values are `opaque` (default), `... */
    transparency?: unknown;
    /** Specifies how to encode image internally. See the [image component](/components/image#display-image) for more informa... */
    type: unknown;
    /** If you want to loop over a subset of your animation (e.g. a fire animation where the fire "starts", then "burns" and ... */
    loop?: AnimationLoopProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            animation: AnimationProps & ComponentProps<animation_Animation>;
        }
    }
}
