// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _PacketTransportTransport, _UartDevice, _Udp } from "../bases";
import type { espnow_ESPNowComponent, espnow_ESPNowTransport, sx126x_SX126x, sx126x_SX126xTransport, sx127x_SX127x, sx127x_SX127xTransport, uart_UARTTransport, udp_UDPTransport } from "../markers";
interface EspnowProps extends _PacketTransportTransport {
    /** @yamlKey espnow_id */
    espnowId?: RefProp<espnow_ESPNowComponent>;
    /** @yamlKey peer_address */
    peerAddress?: unknown;
}
interface Sx126xProps extends _PacketTransportTransport {
    /** @yamlKey sx126x_id */
    sx126xId?: RefProp<sx126x_SX126x>;
}
interface Sx127xProps extends _PacketTransportTransport {
    /** @yamlKey sx127x_id */
    sx127xId?: RefProp<sx127x_SX127x>;
}
interface UartProps extends _PacketTransportTransport, _UartDevice {
}
interface UdpProps extends _PacketTransportTransport, _Udp {
}
export type PacketTransportProps = ({
    platform: "espnow";
} & EspnowProps & ComponentProps<espnow_ESPNowTransport>) | ({
    platform: "sx126x";
} & Sx126xProps & ComponentProps<sx126x_SX126xTransport>) | ({
    platform: "sx127x";
} & Sx127xProps & ComponentProps<sx127x_SX127xTransport>) | ({
    platform: "uart";
} & UartProps & ComponentProps<uart_UARTTransport>) | ({
    platform: "udp";
} & UdpProps & ComponentProps<udp_UDPTransport>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            packet_transport: PacketTransportProps;
        }
    }
}
