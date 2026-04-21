// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { __marker_mdns_MDNSComponent, __marker_openthread_OpenThreadComponent } from "../markers";
export interface OpenthreadProps {
    /** int: Channel number from 11 to 26 */
    channel?: number;
    /**
     * enum: OpenThread Device Type, either `FTD` or `MTD`. Defaults to `FTD`.
     * @yamlKey device_type
     */
    deviceType?: "FTD" | "MTD";
    /**
     * string: 8-byte Extended Personal Area Network ID (XPAN ID)
     * @yamlKey ext_pan_id
     */
    extPanId?: string;
    /**
     * bool: Forces ESPHome configuration to override any previously stored OpenThread network dataset on the device, ensuri...
     * @yamlKey force_dataset
     */
    forceDataset?: boolean;
    /** @yamlKey mdns_id */
    mdnsId?: RefProp<__marker_mdns_MDNSComponent>;
    /**
     * ipv6network: Used to build Mesh-Local IPv6 addresses (ML-EIDs), which are unique to each Thread device within the net...
     * @yamlKey mesh_local_prefix
     */
    meshLocalPrefix?: unknown;
    /**
     * string: OpenThread network key
     * @yamlKey network_key
     */
    networkKey?: string;
    /**
     * string: A human-readable Network Name
     * @yamlKey network_name
     */
    networkName?: string;
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
    /**
     * [Time](https://esphome.io/guides/configuration-types#config-time): When Poll_Period is set on an MTD device, the pare...
     * @yamlKey poll_period
     */
    pollPeriod?: TimePeriod;
    /** string: PSKc is used to authenticate an external Thread Commissioner to a Thread network */
    pskc?: string;
    /** string: dataset TLVs from the Thread information in Home Assistant */
    tlv?: string;
    /**
     * string: Manually override what address to use to connect to the ESP. Defaults to auto-generated value.
     * @yamlKey use_address
     */
    useAddress?: string;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            openthread: OpenthreadProps & ComponentProps<__marker_openthread_OpenThreadComponent>;
        }
    }
}
