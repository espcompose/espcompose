// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, IPv4Address, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { __marker_wifi_WiFiComponent } from "../markers";
export interface WifiNetworksPropsManualIpProps {
    /** IPv4 address: The main DNS server to use. */
    dns1?: IPv4Address;
    /** IPv4 address: The backup DNS server to use. */
    dns2?: IPv4Address;
    /**
     * IPv4 address: The static IP of your node.
     * @yamlKey static_ip
     */
    staticIp: IPv4Address;
    /** IPv4 address: The gateway of the local network. */
    gateway: IPv4Address;
    /** IPv4 address: The subnet of the local network. */
    subnet: IPv4Address;
}
export interface WifiNetworksPropsEapProps {
    identity?: string;
    username?: string;
    password?: string;
    /** @yamlKey certificate_authority */
    certificateAuthority?: unknown;
    /** @yamlKey ttls_phase_2 */
    ttlsPhase2?: "pap" | "chap" | "mschap" | "mschapv2" | "eap";
    certificate?: unknown;
    key?: unknown;
}
export interface WifiNetworksProps {
    ssid?: unknown;
    password?: unknown;
    channel?: unknown;
    /** @yamlKey manual_ip */
    manualIp?: WifiNetworksPropsManualIpProps;
    bssid?: unknown;
    hidden?: boolean;
    priority?: number;
    eap?: WifiNetworksPropsEapProps;
}
export interface WifiManualIpProps {
    /** IPv4 address: The main DNS server to use. */
    dns1?: IPv4Address;
    /** IPv4 address: The backup DNS server to use. */
    dns2?: IPv4Address;
    /**
     * IPv4 address: The static IP of your node.
     * @yamlKey static_ip
     */
    staticIp: IPv4Address;
    /** IPv4 address: The gateway of the local network. */
    gateway: IPv4Address;
    /** IPv4 address: The subnet of the local network. */
    subnet: IPv4Address;
}
export interface WifiEapProps {
    identity?: string;
    username?: string;
    password?: string;
    /** @yamlKey certificate_authority */
    certificateAuthority?: unknown;
    /** @yamlKey ttls_phase_2 */
    ttlsPhase2?: "pap" | "chap" | "mschap" | "mschapv2" | "eap";
    certificate?: unknown;
    key?: unknown;
}
export interface WifiProps {
    /** Configure multiple WiFi networks to connect to, the best one that is reachable will be connected to. See [Connecting ... */
    networks?: Array<WifiNetworksProps>;
    /** string: The SSID or WiFi network name. */
    ssid?: string;
    /** string: The password to present to the authentication server. For EAP-TLS this password may be set to decrypt to priv... */
    password?: string;
    /**
     * Manually configure the static IP of the node when using this network. Note that when using different static IP addres...
     * @yamlKey manual_ip
     */
    manualIp?: WifiManualIpProps;
    /** See [Enterprise Authentication](https://esphome.io/components/wifi#eap). */
    eap?: WifiEapProps;
    /** Enable an access point mode on the node. */
    ap?: unknown;
    /** string: Set the domain of the node hostname used for uploading. For example, if it's set to `.local`, all uploads wil... */
    domain?: string;
    /**
     * [Time](/guides/configuration-types#time): The amount of time to wait before rebooting when no WiFi connection exists....
     * @yamlKey reboot_timeout
     */
    rebootTimeout?: TimePeriod;
    /**
     * string: The power save mode for the WiFi interface. See [Power Save Mode](https://esphome.io/components/wifi#wifi-pow...
     * @yamlKey power_save_mode
     */
    powerSaveMode?: "NONE" | "LIGHT" | "HIGH";
    /**
     * boolean: If enabled, directly connects to WiFi network without doing a full scan first. This can significantly improv...
     * @yamlKey fast_connect
     */
    fastConnect?: boolean;
    /**
     * string: Manually override what address to use to connect to the ESP. Defaults to auto-generated value. Example, if yo...
     * @yamlKey use_address
     */
    useAddress?: string;
    /**
     * string: Only on `esp32` and `esp8266`. Sets the minimum WiFi authentication mode that the device will accept when con...
     * @yamlKey min_auth_mode
     */
    minAuthMode?: "WPA" | "WPA2" | "WPA3";
    /**
     * string: The amount of TX power for the WiFi interface from 8.5dB to 20.5dB. Default for ESP8266 is 20dB, 20.5dB might...
     * @yamlKey output_power
     */
    outputPower?: string;
    /**
     * bool: Only on `esp32`. Enable 802.11v BSS Transition Management support.
     * @yamlKey enable_btm
     */
    enableBtm?: boolean;
    /**
     * bool: Only on `esp32`. Enable 802.11k Radio Resource Management support.
     * @yamlKey enable_rrm
     */
    enableRrm?: boolean;
    /**
     * string: Only on `esp32-c5`. Controls which WiFi frequency band the device uses. Possible values are `AUTO` (use both ...
     * @yamlKey band_mode
     */
    bandMode?: "AUTO" | "2.4GHZ" | "5GHZ";
    /**
     * boolean: If enabled, then the device will perform WiFi scans in a passive fashion. Defaults to `false`.
     * @yamlKey passive_scan
     */
    passiveScan?: boolean;
    /**
     * boolean: If enabled, the WiFi interface will be enabled on boot. Defaults to `true`.
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean;
    /**
     * bool: Enable basic post-connect roaming for stationary devices. After connecting to a non-hidden network, the device ...
     * @yamlKey post_connect_roaming
     */
    postConnectRoaming?: boolean;
    /**
     * [Automation](/automations): An action to be performed when a connection is established.
     * @yamlKey on_connect
     */
    onConnect?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when the connection is dropped.
     * @yamlKey on_disconnect
     */
    onDisconnect?: TriggerHandler;
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
