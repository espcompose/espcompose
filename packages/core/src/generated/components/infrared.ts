// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase } from "../bases";
import type { __marker_ir_rf_proxy_IrRfProxy, __marker_remote_receiver_RemoteReceiverComponent, __marker_remote_transmitter_RemoteTransmitterComponent } from "../markers";
interface IrRfProxyProps extends _CoreEntityBase, _CoreComponent {
    frequency?: unknown;
    /** @yamlKey receiver_frequency */
    receiverFrequency?: unknown;
    /** @yamlKey remote_receiver_id */
    remoteReceiverId?: RefProp<__marker_remote_receiver_RemoteReceiverComponent>;
    /** @yamlKey remote_transmitter_id */
    remoteTransmitterId?: RefProp<__marker_remote_transmitter_RemoteTransmitterComponent>;
}
export type InfraredProps = {
    platform: "ir_rf_proxy";
} & IrRfProxyProps & ComponentProps<__marker_ir_rf_proxy_IrRfProxy>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            infrared: InfraredProps;
        }
    }
}
