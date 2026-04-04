// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase } from "../bases";
import type { ir_rf_proxy_IrRfProxy, remote_receiver_RemoteReceiverComponent, remote_transmitter_RemoteTransmitterComponent } from "../markers";
interface IrRfProxyProps extends _CoreEntityBase, _CoreComponent {
    frequency?: unknown;
    /** @yamlKey remote_receiver_id */
    remoteReceiverId?: RefProp<remote_receiver_RemoteReceiverComponent>;
    /** @yamlKey remote_transmitter_id */
    remoteTransmitterId?: RefProp<remote_transmitter_RemoteTransmitterComponent>;
}
export type InfraredProps = {
    platform: "ir_rf_proxy";
} & IrRfProxyProps & ComponentProps<ir_rf_proxy_IrRfProxy>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            infrared: InfraredProps;
        }
    }
}
