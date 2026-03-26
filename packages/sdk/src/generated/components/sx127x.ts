// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { spi_SPIComponent, sx127x_SX127x } from "../markers";
export interface Sx127xProps extends _CoreComponent {
    /**
     * bool: Enable automatic image calibration on temperature changes. Defaults to `true`.
     * @yamlKey auto_cal
     */
    autoCal?: boolean;
    /** enum: Bandwidth can be `2_6kHz`, `3_1kHz`, `3_9kHz`, `5_2kHz`, `6_3kHz`, `7_8kHz`, `10_4kHz`, `12_5kHz`, `15_6kHz`, `... */
    bandwidth?: "2_6kHz" | "3_1kHz" | "3_9kHz" | "5_2kHz" | "6_3kHz" | "7_8kHz" | "10_4kHz" | "12_5kHz" | "15_6kHz" | "20_8kHz" | "25_0kHz" | "31_3kHz" | "41_7kHz" | "50_0kHz" | "62_5kHz" | "83_3kHz" | "100_0kHz" | "125_0kHz" | "166_7kHz" | "200_0kHz" | "250_0kHz" | "500_0kHz";
    /** int: Bit rate of the signal. Required in packet mode and recommended in continuous mode. Normally the inverse of the ... */
    bitrate?: number;
    /** bool: Enables the receive bit synchronizer. Required in packet mode. Recommended in continuous mode, however if there... */
    bitsync?: boolean;
    /**
     * enum: Coding rate, values can be `CR_4_5`, `CR_4_6`, `CR_4_7` or `CR_4_8`. Defaults to `CR_4_5`.
     * @yamlKey coding_rate
     */
    codingRate?: "CR_4_5" | "CR_4_6" | "CR_4_7" | "CR_4_8";
    /**
     * bool: Enables a 16 bit CRC calculation/check in packet mode.
     * @yamlKey crc_enable
     */
    crcEnable?: boolean;
    /** frequency: Transmitter FSK frequency deviation, values range from 0 to 100 kHz. Defaults to `5kHz`. */
    deviation?: unknown;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Digital IO pin 0.
     * @yamlKey dio0_pin
     */
    dio0Pin?: Pin;
    /** frequency: Frequency in Hz of the transceiver. */
    frequency: unknown;
    /** enum: Modulation can be `OOK`, `FSK` or `LORA` `. */
    modulation: "LORA" | "FSK" | "OOK";
    /**
     * [Automation](/automations): An automation to perform in packet mode when a packet has been decoded. A variable x of t...
     * @yamlKey on_packet
     */
    onPacket?: TriggerHandler;
    /**
     * enum: Transmitter output pin, can be `BOOST` or `RFO`.
     * @yamlKey pa_pin
     */
    paPin?: "RFO" | "BOOST";
    /**
     * int: Transmitter power, range is from 2 to 17 dBm when `pa_pin` is `BOOST` and 0 to 15 dBm when using `RFO`.
     * @yamlKey pa_power
     */
    paPower?: number;
    /**
     * enum: Transmitter PA ramp, can be `10us`, `12us`, `15us`, `20us`, `25us`, `31us`, `40us`, `50us`, `62us`, `100us`, `1...
     * @yamlKey pa_ramp
     */
    paRamp?: "10us" | "12us" | "15us" | "20us" | "25us" | "31us" | "40us" | "50us" | "62us" | "100us" | "125us" | "250us" | "500us" | "1000us" | "2000us" | "3400us";
    /**
     * bool: In packet mode bytes are sent via the `send_packet` automation and received with the `on_packet` trigger. If no...
     * @yamlKey packet_mode
     */
    packetMode?: boolean;
    /**
     * int: Length of the payload in packet mode. If not configured then the variable length packet format is used. Maximum ...
     * @yamlKey payload_length
     */
    payloadLength?: number;
    /**
     * int: Minimum length of the preamble in bytes required by the receiver. Preamble detector is disabled if the size is 0...
     * @yamlKey preamble_detect
     */
    preambleDetect?: number;
    /**
     * int: Number of chip errors tolerated in the receiver.
     * @yamlKey preamble_errors
     */
    preambleErrors?: number;
    /**
     * int: Polarity of the preamble, either 0xAA or 0x55.
     * @yamlKey preamble_polarity
     */
    preamblePolarity?: "85" | "170";
    /**
     * int: Length of the preamble, in bytes, to be sent by the transmitter. This value should be larger than `preamble_dete...
     * @yamlKey preamble_size
     */
    preambleSize?: number;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Reset pin.
     * @yamlKey rst_pin
     */
    rstPin: Pin;
    /**
     * float: When receiving OOK `rx_floor` should be set appropriately for your environment. If set too high (ie closer to ...
     * @yamlKey rx_floor
     */
    rxFloor?: number;
    /**
     * bool: Start the receiver automatically on boot or after transmitting.
     * @yamlKey rx_start
     */
    rxStart?: boolean;
    /** enum: Transmitter data shaping. In OOK can be `CUTOFF_BR_X_2`, `CUTOFF_BR_X_1` or `NONE`. In FSK can be `GAUSSIAN_BT_... */
    shaping?: "CUTOFF_BR_X_2" | "CUTOFF_BR_X_1" | "GAUSSIAN_BT_0_3" | "GAUSSIAN_BT_0_5" | "GAUSSIAN_BT_1_0" | "NONE";
    /**
     * int: Spreading factor, values range from 6 to 12. Defaults to 7.
     * @yamlKey spreading_factor
     */
    spreadingFactor?: number;
    /**
     * list: Synchronization bytes, list of 1 to 8 bytes, found after the preamble and before the payload.
     * @yamlKey sync_value
     */
    syncValue?: Array<number>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): SPI chip select pin.
     * @yamlKey cs_pin
     */
    csPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sx127x: Sx127xProps & ComponentProps<sx127x_SX127x>;
        }
    }
}
