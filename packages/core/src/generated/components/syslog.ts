// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_syslog_Syslog, __marker_time_RealTimeClock, __marker_udp_UDPComponent } from "../markers";
export interface SyslogProps {
    /** int: The syslog facility to use. Defaults to `16` (corresponding to `local0` ). */
    facility?: number;
    /** string: The highest log level to send to the syslog server. Defaults to `DEBUG`. */
    level?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** int: The port to send logs to. Defaults to `514`. */
    port?: number;
    strip?: boolean;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the time client to use for time-stamping logs. May ...
     * @yamlKey time_id
     */
    timeId?: RefProp<__marker_time_RealTimeClock>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the UDP client to use for sending logs. May be omit...
     * @yamlKey udp_id
     */
    udpId?: RefProp<__marker_udp_UDPComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            syslog: SyslogProps & ComponentProps<__marker_syslog_Syslog>;
        }
    }
}
