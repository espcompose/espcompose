// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_fingerprint_grow_FingerprintGrowComponent, __marker_uart_UARTComponent } from "../markers";
export interface FingerprintGrowProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The sensor idle period to wait before powering it off (sl...
     * @yamlKey idle_period_to_sleep
     */
    idlePeriodToSleep?: TimePeriod;
    /**
     * int: Sets a new password to use for authentication. See [Setting a New Password](https://esphome.io/components/finger...
     * @yamlKey new_password
     */
    newPassword?: number;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a fingerprint is enrolled. See [`on_enro...
     * @yamlKey on_enrollment_done
     */
    onEnrollmentDone?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a fingerprint enrollment failed. See [`o...
     * @yamlKey on_enrollment_failed
     */
    onEnrollmentFailed?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a fingerprint is scanned during enrollme...
     * @yamlKey on_enrollment_scan
     */
    onEnrollmentScan?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when the scan of a fingerprint failed. See [`...
     * @yamlKey on_finger_scan_invalid
     */
    onFingerScanInvalid?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when an enrolled fingerprint is scanned. See ...
     * @yamlKey on_finger_scan_matched
     */
    onFingerScanMatched?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when the finger is not entirely touching the ...
     * @yamlKey on_finger_scan_misplaced
     */
    onFingerScanMisplaced?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when the finger touches the sensor. See [`on_...
     * @yamlKey on_finger_scan_start
     */
    onFingerScanStart?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when an unknown fingerprint is scanned. See [...
     * @yamlKey on_finger_scan_unmatched
     */
    onFingerScanUnmatched?: TriggerHandler;
    /** int: Password to use for authentication. Defaults to `0x00`. */
    password?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Pin connected to the reader's finger detectio...
     * @yamlKey sensing_pin
     */
    sensingPin?: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Output pin responsible for toogling the senso...
     * @yamlKey sensor_power_pin
     */
    sensorPowerPin?: Pin;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            fingerprint_grow: FingerprintGrowProps & ComponentProps<__marker_fingerprint_grow_FingerprintGrowComponent>;
        }
    }
}
