// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _PacketTransportTransport, _UartDevice, _Udp } from "../bases";
import type { __marker_espnow_ESPNowComponent, __marker_espnow_ESPNowTransport, __marker_sx126x_SX126x, __marker_sx126x_SX126xTransport, __marker_sx127x_SX127x, __marker_sx127x_SX127xTransport, __marker_uart_UARTTransport, __marker_udp_UDPTransport } from "../markers";
interface EspnowProps extends _PacketTransportTransport {
    /** @yamlKey espnow_id */
    espnowId?: RefProp<__marker_espnow_ESPNowComponent>;
    /** @yamlKey peer_address */
    peerAddress?: unknown;
}
interface Sx126xProps extends _PacketTransportTransport {
    /** @yamlKey sx126x_id */
    sx126xId?: RefProp<__marker_sx126x_SX126x>;
}
interface Sx127xProps extends _PacketTransportTransport {
    /** @yamlKey sx127x_id */
    sx127xId?: RefProp<__marker_sx127x_SX127x>;
}
interface UartProps extends _PacketTransportTransport, _UartDevice {
}
interface UdpProps extends _PacketTransportTransport, _Udp {
}
export type PacketTransportProps = ({
    platform: "espnow";
} & EspnowProps & ComponentProps<__marker_espnow_ESPNowTransport>) | ({
    platform: "sx126x";
} & Sx126xProps & ComponentProps<__marker_sx126x_SX126xTransport>) | ({
    platform: "sx127x";
} & Sx127xProps & ComponentProps<__marker_sx127x_SX127xTransport>) | ({
    platform: "uart";
} & UartProps & ComponentProps<__marker_uart_UARTTransport>) | ({
    platform: "udp";
} & UdpProps & ComponentProps<__marker_udp_UDPTransport>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            packet_transport: PacketTransportProps;
        }
    }
}
