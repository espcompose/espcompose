// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { mdns_MDNSComponent, openthread_OpenThreadComponent } from "../markers";
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
    forceDataset?: boolean | EmbedValue<boolean>;
    /** string: dataset TLVs from the Thread information in Home Assistant */
    tlv?: string | EmbedValue<string>;
    /**
     * string: Manually override what address to use to connect to the ESP. Defaults to auto-generated value.
     * @yamlKey use_address
     */
    useAddress?: string | EmbedValue<string>;
    /**
     * [Time](/guides/configuration-types#config-time): When Poll_Period is set on an MTD device, the parent router will enq...
     * @yamlKey poll_period
     */
    pollPeriod?: TimePeriod;
    /**
     * integer: The amount of TX power for the Thread 802.15.4 radio in dBm. Range depends on the chip variant: ESP32-C5/C6 ...
     * @yamlKey output_power
     */
    outputPower?: number;
    /**
     * string: 2-byte Personal Area Network ID (PAN ID)
     * @yamlKey pan_id
     */
    panId?: string;
    /** int: Channel number from 11 to 26 */
    channel?: number | EmbedValue<number>;
    /**
     * string: OpenThread network key
     * @yamlKey network_key
     */
    networkKey?: string;
    /**
     * string: 8-byte Extended Personal Area Network ID (XPAN ID)
     * @yamlKey ext_pan_id
     */
    extPanId?: string;
    /**
     * string: A human-readable Network Name
     * @yamlKey network_name
     */
    networkName?: string | EmbedValue<string>;
    /** string: PSKc is used to authenticate an external Thread Commissioner to a Thread network */
    pskc?: string;
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
