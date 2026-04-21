// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_sx1509_SX1509Component } from "../markers";
export interface Sx1509KeypadProps {
    /**
     * int: The debounce time is common to all IOs.
     * @yamlKey debounce_time
     */
    debounceTime?: number;
    /**
     * int: The number of keypad columns to use. This enables any number of the last 8 pins. So a value of 4 enables pins 8,...
     * @yamlKey key_columns
     */
    keyColumns: number;
    /**
     * int: The number of keypad rows to use. This enables any number of the first 8 pins. So a value of 3 enables pins 0,1,...
     * @yamlKey key_rows
     */
    keyRows: number;
    /** string: The keys present on the matrix, from top left to bottom right, row by row. Required for `key_collector`. */
    keys?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a key has been pressed. The key is in a v...
     * @yamlKey on_key
     */
    onKey?: TriggerHandler;
    /**
     * int: Scan time per row (must be set above debounce time).
     * @yamlKey scan_time
     */
    scanTime?: number;
    /**
     * int: No key press within this time will set keypad engine to sleep.
     * @yamlKey sleep_time
     */
    sleepTime?: number;
}
export interface Sx1509Props extends _CoreComponent {
    /** int: The I²C address of the driver. Defaults to `0x3E`. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** Add this to enable the keypad. */
    keypad?: Sx1509KeypadProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sx1509: Sx1509Props & ComponentProps<__marker_sx1509_SX1509Component>;
        }
    }
}
