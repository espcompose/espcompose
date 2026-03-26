// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { syslog_Syslog, time_RealTimeClock, udp_UDPComponent } from "../markers";
export interface SyslogProps {
    /**
     * [ID](/guides/configuration-types#id): The ID of the UDP client to use for sending logs. May be omitted if only one UD...
     * @yamlKey udp_id
     */
    udpId?: RefProp<udp_UDPComponent>;
    /**
     * [ID](/guides/configuration-types#id): The ID of the time client to use for time-stamping logs. May be omitted if only...
     * @yamlKey time_id
     */
    timeId?: RefProp<time_RealTimeClock>;
    /** int: The port to send logs to. Defaults to `514`. */
    port?: number;
    /** string: The highest log level to send to the syslog server. Defaults to `DEBUG`. */
    level?: "NONE" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "VERBOSE" | "VERY_VERBOSE";
    strip?: boolean;
    /** int: The syslog facility to use. Defaults to `16` (corresponding to `local0` ). */
    facility?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            syslog: SyslogProps & ComponentProps<syslog_Syslog>;
        }
    }
}
