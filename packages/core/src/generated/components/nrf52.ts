// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_zephyr_CdcAcm } from "../markers";
export interface Nrf52DfuProps {
    /** @yamlKey reset_pin */
    resetPin: Pin;
}
export interface Nrf52FrameworkPropsAdvancedProps {
    /** @yamlKey enable_ota_rollback */
    enableOtaRollback?: boolean;
}
export interface Nrf52FrameworkProps {
    advanced?: Nrf52FrameworkPropsAdvancedProps;
    version?: string;
}
export interface Nrf52Reg0Props {
    /** @yamlKey uicr_erase */
    uicrErase?: boolean;
    voltage: "1.8" | "2.1" | "2.4" | "2.7" | "3.0" | "3.3";
}
export interface Nrf52Props {
    /** string: The board type. Valid options are `adafruit_feather_nrf52840`, `adafruit_itsybitsy_nrf52840`, `xiao_ble`. Oth... */
    board: string;
    /** string: Bootloader type. Valid options are `mcuboot`, `adafruit`, `adafruit_nrf52_sd132`, `adafruit_nrf52_sd140_v6`, ... */
    bootloader?: "adafruit" | "adafruit_nrf52_sd132" | "adafruit_nrf52_sd140_v6" | "adafruit_nrf52_sd140_v7" | "mcuboot";
    /** boolean: Enable DC/DC converter for REG1 stage. Defaults to `true`. */
    dcdc?: boolean;
    dfu?: Nrf52DfuProps;
    framework?: Nrf52FrameworkProps;
    reg0?: Nrf52Reg0Props;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            nrf52: Nrf52Props & ComponentProps<__marker_zephyr_CdcAcm>;
        }
    }
}
