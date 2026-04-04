// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
export interface Esp32HostedProps {
    /** string: The variant of the ESP32 co-processor that is used by the host. One of `ESP32`, `ESP32S2`, `ESP32S3`, `ESP32C... */
    variant: "ESP32" | "ESP32C2" | "ESP32C3" | "ESP32C5" | "ESP32C6" | "ESP32C61" | "ESP32H2" | "ESP32P4" | "ESP32S2" | "ESP32S3";
    /**
     * boolean: If enabled, the co-processor is active when reset is high. If disabled, the co-processor is active when rese...
     * @yamlKey active_high
     */
    activeHigh: boolean;
    /**
     * [Pin](/guides/configuration-types#pin): The SDIO clock pin.
     * @yamlKey clk_pin
     */
    clkPin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The SDIO command pin.
     * @yamlKey cmd_pin
     */
    cmdPin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The SDIO d0 pin.
     * @yamlKey d0_pin
     */
    d0Pin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The SDIO d1 pin.
     * @yamlKey d1_pin
     */
    d1Pin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The SDIO d2 pin.
     * @yamlKey d2_pin
     */
    d2Pin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The SDIO d3 pin.
     * @yamlKey d3_pin
     */
    d3Pin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The reset pin of the co-processor.
     * @yamlKey reset_pin
     */
    resetPin: Pin;
    /** int: The SDIO slot number. Defaults to 1. */
    slot?: number;
    /**
     * Set the speed of communication between the master and the slave. If you experience loss of communication, or reboots,...
     * @yamlKey sdio_frequency
     */
    sdioFrequency?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_hosted: Esp32HostedProps & ComponentProps;
        }
    }
}
