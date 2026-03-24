// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { remote_receiver_RemoteReceiverComponent } from "../markers";
export interface RemoteReceiverFilterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface RemoteReceiverIdleProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface RemoteReceiverProps extends _CoreComponent {
    /** [Pin](/guides/configuration-types#pin): The pin to receive the remote signal on. */
    pin: Pin;
    /** list: Decode and dump these remote codes in the logs (at log.level=DEBUG). Set to `all` to dump all available codecs: */
    dump?: unknown;
    /** int: The percentage or time that the remote signal lengths can deviate in the decoding process. Defaults to `25%`. */
    tolerance?: unknown;
    /**
     * int: The size of the internal buffer for storing the remote codes. Defaults to `10kB` on the ESP32 and `1kB` on the E...
     * @yamlKey buffer_size
     */
    bufferSize?: unknown;
    /** [Time](/guides/configuration-types#time): Filter any pulses that are shorter than this. Useful for removing glitches ... */
    filter?: RemoteReceiverFilterProps;
    /**
     * int: The clock resolution used by the RMT peripheral in Hz. Defaults to `1000000`.
     * @yamlKey clock_resolution
     */
    clockResolution?: unknown;
    /** [Time](/guides/configuration-types#time): The amount of time that a signal should remain stable/unchanged for it to b... */
    idle?: RemoteReceiverIdleProps;
    /**
     * int: When `use_dma` is enabled, this sets the size of the driver's internal DMA buffer. When DMA is disabled, it spec...
     * @yamlKey rmt_symbols
     */
    rmtSymbols?: number;
    /**
     * int: Filter out any data received with a length in symbols less than `filter_symbols`. Useful for filtering out short...
     * @yamlKey filter_symbols
     */
    filterSymbols?: number;
    /**
     * int: Maximum receive length in symbols. On some variants the maximum receive is limited to `rmt_symbols`.
     * @yamlKey receive_symbols
     */
    receiveSymbols?: number;
    /**
     * boolean: Enable DMA on variants that support it. If enabled `rmt_symbols` controls the DMA buffer size and can be set...
     * @yamlKey use_dma
     */
    useDma?: boolean;
    /**
     * int: The carrier duty cycle for signal demodulation in the RMT peripheral in Hz. Defaults to `100`.
     * @yamlKey carrier_duty_percent
     */
    carrierDutyPercent?: unknown;
    /**
     * int: The carrier frequency for signal demodulation in the RMT peripheral in Hz. Defaults to `0Hz` (carrier demodulati...
     * @yamlKey carrier_frequency
     */
    carrierFrequency?: number;
    /**
     * [Automation](/automations): An automation to perform when a B&O Beo4 infrared remote code has been decoded. A variabl...
     * @yamlKey on_beo4
     */
    onBeo4?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Byron SX doorbell RF code has been decoded. A variable `x...
     * @yamlKey on_byronsx
     */
    onByronsx?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a CanalSat remote code has been decoded. A variable `x` of ...
     * @yamlKey on_canalsat
     */
    onCanalsat?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a CanalSatLD remote code has been decoded. A variable `x` o...
     * @yamlKey on_canalsatld
     */
    onCanalsatld?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Coolix remote code has been decoded. A variable `x` of ty...
     * @yamlKey on_coolix
     */
    onCoolix?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a dish network remote code has been decoded. A variable `x`...
     * @yamlKey on_dish
     */
    onDish?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Dooya RF remote code has been decoded. A variable `x` of ...
     * @yamlKey on_dooya
     */
    onDooya?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Dyson cool AM07 code has been decoded. A variable `x` of ...
     * @yamlKey on_dyson
     */
    onDyson?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a JVC remote code has been decoded. A variable `x` of type ...
     * @yamlKey on_jvc
     */
    onJvc?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a LG remote code has been decoded. A variable `x` of type <...
     * @yamlKey on_lg
     */
    onLg?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a MagiQuest wand remote code has been decoded. A variable `...
     * @yamlKey on_magiquest
     */
    onMagiquest?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a KeeLoq RF code has been decoded. A variable `x` of type <...
     * @yamlKey on_keeloq
     */
    onKeeloq?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a NEC remote code has been decoded. A variable `x` of type ...
     * @yamlKey on_nec
     */
    onNec?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a pioneer remote code has been decoded. A variable `x` of t...
     * @yamlKey on_pioneer
     */
    onPioneer?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Pronto remote code has been decoded. A variable `x` of ty...
     * @yamlKey on_pronto
     */
    onPronto?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Go-Box remote code has been decoded. A variable `x` of ty...
     * @yamlKey on_gobox
     */
    onGobox?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Roomba remote code has been decoded. A variable `x` of ty...
     * @yamlKey on_roomba
     */
    onRoomba?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Sony remote code has been decoded. A variable `x` of type...
     * @yamlKey on_sony
     */
    onSony?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Symphony remote code has been decoded. A variable `x` of ...
     * @yamlKey on_symphony
     */
    onSymphony?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a raw remote code has been decoded. A variable `x` of type ...
     * @yamlKey on_raw
     */
    onRaw?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Drayton Digistat RF code has been decoded. A variable `x`...
     * @yamlKey on_drayton
     */
    onDrayton?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a RC5 remote code has been decoded. A variable `x` of type ...
     * @yamlKey on_rc5
     */
    onRc5?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a RC6 remote code has been decoded. A variable `x` of type ...
     * @yamlKey on_rc6
     */
    onRc6?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a RCSwitch RF code has been decoded. A variable `x` of type...
     * @yamlKey on_rc_switch
     */
    onRcSwitch?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Samsung remote code has been decoded. A variable `x` of t...
     * @yamlKey on_samsung
     */
    onSamsung?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Samsung36 remote code has been decoded. A variable `x` of...
     * @yamlKey on_samsung36
     */
    onSamsung36?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Toshiba AC remote code has been decoded. A variable `x` o...
     * @yamlKey on_toshiba_ac
     */
    onToshibaAc?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Panasonic remote code has been decoded. A variable `x` of...
     * @yamlKey on_panasonic
     */
    onPanasonic?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Nexa RF code has been decoded. A variable `x` of type <AP...
     * @yamlKey on_nexa
     */
    onNexa?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Midea remote code has been decoded. A variable `x` of typ...
     * @yamlKey on_midea
     */
    onMidea?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a AEHA remote code has been decoded. A variable `x` of type...
     * @yamlKey on_aeha
     */
    onAeha?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Haier remote code has been decoded. A variable `x` of typ...
     * @yamlKey on_haier
     */
    onHaier?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a ABB-Welcome code has been decoded. A variable `x` of type...
     * @yamlKey on_abbwelcome
     */
    onAbbwelcome?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Mirage remote code has been decoded. A variable `x` of ty...
     * @yamlKey on_mirage
     */
    onMirage?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Toto remote code has been decoded. A variable `x` of type...
     * @yamlKey on_toto
     */
    onToto?: () => void;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            remote_receiver: RemoteReceiverProps & ComponentProps<remote_receiver_RemoteReceiverComponent>;
        }
    }
}
