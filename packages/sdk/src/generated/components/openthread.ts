// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { mdns_MDNSComponent, openthread_OpenThreadComponent } from "../markers";
export interface OpenthreadPollPeriodProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface OpenthreadProps {
    /** @yamlKey mdns_id */
    mdnsId?: RefProp<mdns_MDNSComponent>;
    /**
     * enum: OpenThread Device Type, either `FTD` or `MTD`. Defaults to `FTD`.
     * @yamlKey device_type
     */
    deviceType?: "FTD" | "MTD";
    /**
     * bool: Forces ESPHome configuration to override any previously stored OpenThread network dataset on the device, ensuri...
     * @yamlKey force_dataset
     */
    forceDataset?: boolean;
    /** string: dataset TLVs from the Thread information in Home Assistant */
    tlv?: string;
    /**
     * string: Manually override what address to use to connect to the ESP. Defaults to auto-generated value.
     * @yamlKey use_address
     */
    useAddress?: string;
    /**
     * [Time](/guides/configuration-types#config-time): When Poll_Period is set on an MTD device, the parent router will enq...
     * @yamlKey poll_period
     */
    pollPeriod?: OpenthreadPollPeriodProps;
    /**
     * integer: The amount of TX power for the Thread 802.15.4 radio in dBm. Range depends on the chip variant: ESP32-C5/C6 ...
     * @yamlKey output_power
     */
    outputPower?: unknown;
    /**
     * string: 2-byte Personal Area Network ID (PAN ID)
     * @yamlKey pan_id
     */
    panId?: unknown;
    /** int: Channel number from 11 to 26 */
    channel?: number;
    /**
     * string: OpenThread network key
     * @yamlKey network_key
     */
    networkKey?: unknown;
    /**
     * string: 8-byte Extended Personal Area Network ID (XPAN ID)
     * @yamlKey ext_pan_id
     */
    extPanId?: unknown;
    /**
     * string: A human-readable Network Name
     * @yamlKey network_name
     */
    networkName?: string;
    /** string: PSKc is used to authenticate an external Thread Commissioner to a Thread network */
    pskc?: unknown;
    /**
     * ipv6network: Used to build Mesh-Local IPv6 addresses (ML-EIDs), which are unique to each Thread device within the net...
     * @yamlKey mesh_local_prefix
     */
    meshLocalPrefix?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            openthread: OpenthreadProps & ComponentProps<openthread_OpenThreadComponent>;
        }
    }
}
