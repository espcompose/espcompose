// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, IPv4Address, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_time_RealTimeClock, __marker_wireguard_Wireguard } from "../markers";
export interface WireguardProps extends _CoreComponent {
    /** IPv4 address: The local VPN address of the device. If you intend to upload firmwares through the VPN link you probabl... */
    address: IPv4Address;
    /** IPv4 address: The netmask for the configured address. Default to `255.255.255.255`. See section [Static routes and ou... */
    netmask?: IPv4Address;
    /**
     * list of IPv4 networks: A list of networks in CIDR notation (*IP/mask*) to be allowed through the tunnel. Any host (`0...
     * @yamlKey peer_allowed_ips
     */
    peerAllowedIps?: Array<unknown>;
    /**
     * string: The hostname of the remote peer.
     * @yamlKey peer_endpoint
     */
    peerEndpoint: string;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time after which a *keepalive* packet is se...
     * @yamlKey peer_persistent_keepalive
     */
    peerPersistentKeepalive?: TimePeriod;
    /**
     * UDP port: The port where remote peer is listening on. The WireGuard® default is `51820`.
     * @yamlKey peer_port
     */
    peerPort?: number;
    /**
     * string: The chosen pre-shared key between local device and remote peer.
     * @yamlKey peer_preshared_key
     */
    peerPresharedKey?: string;
    /**
     * string: The public key of the remote peer.
     * @yamlKey peer_public_key
     */
    peerPublicKey: string;
    /**
     * string: The private key of the device.
     * @yamlKey private_key
     */
    privateKey: string;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time to wait before rebooting the device wh...
     * @yamlKey reboot_timeout
     */
    rebootTimeout?: TimePeriod;
    /**
     * boolean: Set to `true` to wait for the remote peer to be up before continuing to boot the device. Default to `false`....
     * @yamlKey require_connection_to_proceed
     */
    requireConnectionToProceed?: boolean;
    /** @yamlKey time_id */
    timeId?: RefProp<__marker_time_RealTimeClock>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): How often to check the connection status and the latest h...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            wireguard: WireguardProps & ComponentProps<__marker_wireguard_Wireguard>;
        }
    }
}
