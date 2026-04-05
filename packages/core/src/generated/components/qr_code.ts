// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_qr_code_QrCode } from "../markers";
export interface QrCodeProps {
    /** string: The string which you want to encode in the QR-code. */
    value: string;
    /** string: The error correction code level you want to use. Defaults to `LOW`. You can use one of the following values: */
    ecc?: "LOW" | "MEDIUM" | "QUARTILE" | "HIGH";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            qr_code: QrCodeProps & ComponentProps<__marker_qr_code_QrCode>;
        }
    }
}
