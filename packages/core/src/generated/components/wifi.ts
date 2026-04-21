// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, IPv4Address, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { __marker_wifi_WiFiComponent } from "../markers";
export interface WifiEapProps {
    certificate?: unknown;
    /** @yamlKey certificate_authority */
    certificateAuthority?: unknown;
    identity?: string;
    key?: unknown;
    password?: string;
    /** @yamlKey ttls_phase_2 */
    ttlsPhase2?: "chap" | "eap" | "mschap" | "mschapv2" | "pap";
    username?: string;
}
export interface WifiManualIpProps {
    /** IPv4 address: The main DNS server to use. */
    dns1?: IPv4Address;
    /** IPv4 address: The backup DNS server to use. */
    dns2?: IPv4Address;
    /** IPv4 address: The gateway of the local network. */
    gateway: IPv4Address;
    /**
     * IPv4 address: The static IP of your node.
     * @yamlKey static_ip
     */
    staticIp: IPv4Address;
    /** IPv4 address: The subnet of the local network. */
    subnet: IPv4Address;
}
export interface WifiNetworksPropsEapProps {
    certificate?: unknown;
    /** @yamlKey certificate_authority */
    certificateAuthority?: unknown;
    identity?: string;
    key?: unknown;
    password?: string;
    /** @yamlKey ttls_phase_2 */
    ttlsPhase2?: "chap" | "eap" | "mschap" | "mschapv2" | "pap";
    username?: string;
}
export interface WifiNetworksPropsManualIpProps {
    /** IPv4 address: The main DNS server to use. */
    dns1?: IPv4Address;
    /** IPv4 address: The backup DNS server to use. */
    dns2?: IPv4Address;
    /** IPv4 address: The gateway of the local network. */
    gateway: IPv4Address;
    /**
     * IPv4 address: The static IP of your node.
     * @yamlKey static_ip
     */
    staticIp: IPv4Address;
    /** IPv4 address: The subnet of the local network. */
    subnet: IPv4Address;
}
export interface WifiNetworksProps {
    bssid?: unknown;
    channel?: unknown;
    eap?: WifiNetworksPropsEapProps;
    hidden?: boolean;
    /** @yamlKey manual_ip */
    manualIp?: WifiNetworksPropsManualIpProps;
    password?: unknown;
    priority?: number;
    ssid?: unknown;
}
export interface WifiProps {
    /** Enable an access point mode on the node. */
    ap?: unknown;
    /**
     * string: Only on `esp32-c5`. Controls which WiFi frequency band the device uses. Possible values are `AUTO` (use both ...
     * @yamlKey band_mode
     */
    bandMode?: "2.4GHZ" | "5GHZ" | "AUTO";
    /** string: Set the domain of the node hostname used for uploading. For example, if it's set to `.local`, all uploads wil... */
    domain?: string;
    /** See [Enterprise Authentication](https://esphome.io/components/wifi#eap). */
    eap?: WifiEapProps;
    /**
     * bool: Only on `esp32`. Enable 802.11v BSS Transition Management support.
     * @yamlKey enable_btm
     */
    enableBtm?: boolean;
    /**
     * boolean: If enabled, the WiFi interface will be enabled on boot. Defaults to `true`.
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean;
    /**
     * bool: Only on `esp32`. Enable 802.11k Radio Resource Management support.
     * @yamlKey enable_rrm
     */
    enableRrm?: boolean;
    /**
     * boolean: If enabled, directly connects to WiFi network without doing a full scan first. This can significantly improv...
     * @yamlKey fast_connect
     */
    fastConnect?: boolean;
    /**
     * Manually configure the static IP of the node when using this network. Note that when using different static IP addres...
     * @yamlKey manual_ip
     */
    manualIp?: WifiManualIpProps;
    /**
     * string: Only on `esp32` and `esp8266`. Sets the minimum WiFi authentication mode that the device will accept when con...
     * @yamlKey min_auth_mode
     */
    minAuthMode?: "WPA" | "WPA2" | "WPA3";
    /** Configure multiple WiFi networks to connect to, the best one that is reachable will be connected to. See [Connecting ... */
    networks?: Array<WifiNetworksProps>;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a connection is established.
     * @yamlKey on_connect
     */
    onConnect?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when the connection is dropped.
     * @yamlKey on_disconnect
     */
    onDisconnect?: TriggerHandler;
    /**
     * string: The amount of TX power for the WiFi interface from 8.5dB to 20.5dB. Default for ESP8266 is 20dB, 20.5dB might...
     * @yamlKey output_power
     */
    outputPower?: string;
    /**
     * boolean: If enabled, then the device will perform WiFi scans in a passive fashion. Defaults to `false`.
     * @yamlKey passive_scan
     */
    passiveScan?: boolean;
    /** string: The password to present to the authentication server. For EAP-TLS this password may be set to decrypt to priv... */
    password?: string;
    /**
     * bool: Enable basic post-connect roaming for stationary devices. After connecting to a non-hidden network, the device ...
     * @yamlKey post_connect_roaming
     */
    postConnectRoaming?: boolean;
    /**
     * string: The power save mode for the WiFi interface. See [Power Save Mode](https://esphome.io/components/wifi#wifi-pow...
     * @yamlKey power_save_mode
     */
    powerSaveMode?: "HIGH" | "LIGHT" | "NONE";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time to wait before rebooting when no WiFi ...
     * @yamlKey reboot_timeout
     */
    rebootTimeout?: TimePeriod;
    /** string: The SSID or WiFi network name. */
    ssid?: string;
    /**
     * string: Manually override what address to use to connect to the ESP. Defaults to auto-generated value. Example, if yo...
     * @yamlKey use_address
     */
    useAddress?: string;
    /**
     * boolean: For ESP32 only, requests that the WiFi libraries try to allocate memory from PSRAM. Defaults to `false`. Req...
     * @yamlKey use_psram
     */
    usePsram?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            wifi: WifiProps & ComponentProps<__marker_wifi_WiFiComponent>;
        }
    }
}
