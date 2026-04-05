// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_logger_Logger } from "../markers";
export interface LoggerProps extends _CoreComponent {
    /**
     * int: The baud rate to use for the serial
     * @yamlKey baud_rate
     */
    baudRate?: number;
    /**
     * int: The size of the buffer used
     * @yamlKey tx_buffer_size
     */
    txBufferSize?: number;
    /**
     * boolean: Causes ESPHome to sequentially drive DTR and RTS false after opening
     * @yamlKey deassert_rts_dtr
     */
    deassertRtsDtr?: boolean;
    /**
     * int: ESP32, LibreTiny and nRF52 only: The size of the internal thread-safe ring buffer for task log messages.
     * @yamlKey task_log_buffer_size
     */
    taskLogBufferSize?: number;
    /**
     * string: The Hardware UART to use for logging. The default varies depending on
     * @yamlKey hardware_uart
     */
    hardwareUart?: string;
    /** string: The global log level. Any log message */
    level?: "NONE" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "VERBOSE" | "VERY_VERBOSE";
    /** mapping: Manually set the log level for a */
    logs?: Record<string, unknown>;
    /**
     * string: The initial log level, which may be varied at run time. Defaults to the same value as `level`.
     * @yamlKey initial_level
     */
    initialLevel?: "NONE" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "VERBOSE" | "VERY_VERBOSE";
    /**
     * boolean: Enable runtime per-tag log level changes. This is automatically enabled
     * @yamlKey runtime_tag_levels
     */
    runtimeTagLevels?: boolean;
    /**
     * [Automation](/automations): An action to be
     * @yamlKey on_message
     */
    onMessage?: TriggerHandler;
    /**
     * boolean: If set to false, disables storing
     * @yamlKey esp8266_store_log_strings_in_flash
     */
    esp8266StoreLogStringsInFlash?: boolean;
    /**
     * boolean: Waits for the CDC port before starting setup (10-second timeout).
     * @yamlKey wait_for_cdc
     */
    waitForCdc?: boolean;
    /**
     * boolean: Displays early debug information, such as the boot reason.
     * @yamlKey early_message
     */
    earlyMessage?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            logger: LoggerProps & ComponentProps<__marker_logger_Logger>;
        }
    }
}
