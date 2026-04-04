// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { remote_transmitter_RemoteTransmitterComponent } from "../markers";
export interface RemoteTransmitterProps extends _CoreComponent {
    /** [Pin](/guides/configuration-types#pin): The pin to transmit the remote signal on. */
    pin: Pin;
    /**
     * int: How much of the time the remote is on. For example, infrared protocols modulate the signal using a carrier signa...
     * @yamlKey carrier_duty_percent
     */
    carrierDutyPercent: number;
    /**
     * int: The clock resolution used by the RMT peripheral in Hz. Defaults to `1000000`.
     * @yamlKey clock_resolution
     */
    clockResolution?: number;
    /**
     * boolean: Overrides the default end of transmit level. Defaults to `false` unless `pin` is set to inverted or open-drain.
     * @yamlKey eot_level
     */
    eotLevel?: boolean;
    /**
     * boolean: Enable DMA on variants that support it. If enabled `rmt_symbols` controls the DMA buffer size and can be set...
     * @yamlKey use_dma
     */
    useDma?: boolean;
    /**
     * int: When `use_dma` is enabled, this sets the size of the driver's internal DMA buffer. When DMA is disabled, it spec...
     * @yamlKey rmt_symbols
     */
    rmtSymbols?: number;
    /**
     * boolean: If enabled, any transmit will return immediately and the RMT will run in the background. The `on_complete` a...
     * @yamlKey non_blocking
     */
    nonBlocking?: boolean;
    /**
     * [Automation](/automations): An automation to perform before data is sent. Useful if the radio / IR hardware needs to ...
     * @yamlKey on_transmit
     */
    onTransmit?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform after data has been sent. Useful if the radio / IR hardware need...
     * @yamlKey on_complete
     */
    onComplete?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            remote_transmitter: RemoteTransmitterProps & ComponentProps<remote_transmitter_RemoteTransmitterComponent>;
        }
    }
}
