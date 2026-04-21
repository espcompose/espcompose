// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_cc1101_CC1101Component, __marker_spi_SPIComponent } from "../markers";
export interface Cc1101Props {
    /**
     * boolean: Only accept packets when carrier sense indicates a signal is present. Defaults to `false`.
     * @yamlKey carrier_sense_above_threshold
     */
    carrierSenseAboveThreshold?: boolean;
    /**
     * int: Absolute RSSI threshold for carrier sense. The radio considers a carrier present when RSSI exceeds this level. R...
     * @yamlKey carrier_sense_abs_thr
     */
    carrierSenseAbsThr?: number;
    /**
     * enum: Relative RSSI threshold for carrier sense, compared to the current noise floor. Options: `Default`, `+6dB`, `+1...
     * @yamlKey carrier_sense_rel_thr
     */
    carrierSenseRelThr?: "+10dB" | "+14dB" | "+6dB" | "Default";
    /** int: Channel number (added to base frequency). Defaults to `0`. */
    channel?: number;
    /**
     * frequency: Spacing between channels. Range: `25kHz` to `405kHz`. Defaults to `200kHz`.
     * @yamlKey channel_spacing
     */
    channelSpacing?: unknown;
    /**
     * boolean: Enable CRC-16 calculation and checking. The CC1101 uses CRC-16-IBM (polynomial 0x8005). Defaults to `false`.
     * @yamlKey crc_enable
     */
    crcEnable?: boolean;
    /**
     * [Pin](https://esphome.io/guides/configuration-types/#pin): The SPI Chip Select (CSN) pin connected to the module.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * boolean: Enable the digital DC blocking filter. Defaults to `true`.
     * @yamlKey dc_blocking_filter
     */
    dcBlockingFilter?: boolean;
    /**
     * frequency: The receive filter bandwidth. Range: `58kHz` to `812kHz`. Defaults to `203kHz`.
     * @yamlKey filter_bandwidth
     */
    filterBandwidth?: unknown;
    /**
     * enum: Averaging length for AGC in ASK/OOK modes. Longer values provide more stable gain but slower response. Options:...
     * @yamlKey filter_length_ask_ook
     */
    filterLengthAskOok?: "12dB" | "16dB" | "4dB" | "8dB";
    /**
     * enum: Averaging length for AGC in FSK/MSK modes. Longer values provide more stable gain but slower response. Options:...
     * @yamlKey filter_length_fsk_msk
     */
    filterLengthFskMsk?: "16" | "32" | "64" | "8";
    /** enum: Controls when AGC gain is frozen (held constant). Options: `Default`, `On Sync`, `Analog Only`, `Analog And Dig... */
    freeze?: "Analog And Digital" | "Analog Only" | "Default" | "On Sync";
    /** frequency: The operating frequency. Range: `300MHz` to `928MHz`. Defaults to `433.92MHz`. */
    frequency?: unknown;
    /**
     * frequency: Frequency deviation for FSK/GFSK modulation. Range: `1.5kHz` to `381kHz`.
     * @yamlKey fsk_deviation
     */
    fskDeviation?: unknown;
    /**
     * [Pin](https://esphome.io/guides/configuration-types/#pin): The GDO0 pin. Required when `packet_mode` is enabled, also...
     * @yamlKey gdo0_pin
     */
    gdo0Pin?: Pin;
    /**
     * enum: Hysteresis level to prevent gain oscillation on borderline signals. Options: `None`, `Low`, `Medium`, `High`.
     * @yamlKey hyst_level
     */
    hystLevel?: "High" | "Low" | "Medium" | "None";
    /**
     * frequency: Intermediate Frequency. Range: `25kHz` to `788kHz`. Defaults to `153kHz`.
     * @yamlKey if_frequency
     */
    ifFrequency?: unknown;
    /**
     * boolean: If true, reduce LNA gain before DVGA gain when decreasing overall gain. Useful for optimizing noise figure. ...
     * @yamlKey lna_priority
     */
    lnaPriority?: boolean;
    /**
     * dB: Target signal amplitude for the AGC loop. Higher values increase sensitivity but may cause clipping on strong sig...
     * @yamlKey magn_target
     */
    magnTarget?: "24dB" | "27dB" | "30dB" | "33dB" | "36dB" | "38dB" | "40dB" | "42dB";
    /** boolean: Enable Manchester encoding. Defaults to `false`. */
    manchester?: boolean;
    /**
     * enum: Limits the maximum DVGA (Digital Variable Gain Amplifier) gain. Options: `Default`, `-1`, `-2`, `-3`. Defaults ...
     * @yamlKey max_dvga_gain
     */
    maxDvgaGain?: "-1" | "-2" | "-3" | "Default";
    /**
     * dB: Limits the maximum LNA (Low Noise Amplifier) gain. Use to prevent saturation in high-signal environments. Default...
     * @yamlKey max_lna_gain
     */
    maxLnaGain?: "11.5dB" | "14.6dB" | "17.1dB" | "2.6dB" | "6.1dB" | "7.4dB" | "9.2dB" | "Default";
    /**
     * enum: The modulation format. Options: `ASK/OOK` (default), `2-FSK`, `4-FSK`, `GFSK`, `MSK`.
     * @yamlKey modulation_type
     */
    modulationType?: "2-FSK" | "4-FSK" | "ASK/OOK" | "GFSK" | "MSK";
    /**
     * int: Deviation index for MSK modulation. Range: `1` to `8`.
     * @yamlKey msk_deviation
     */
    mskDeviation?: number;
    /**
     * int: Number of preamble bytes to transmit. Range: `0` to `7` (maps to 2, 3, 4, 6, 8, 12, 16, 24 bytes). Defaults to `...
     * @yamlKey num_preamble
     */
    numPreamble?: number;
    /** @yamlKey on_packet */
    onPacket?: TriggerHandler;
    /**
     * float: The transmission power in dBm. Range: `-30` to `11`. Defaults to `10`.
     * @yamlKey output_power
     */
    outputPower?: number;
    /**
     * int: Packet length in bytes. Set to `0` for variable length packets (length byte prepended to data). Range: `0` to `6...
     * @yamlKey packet_length
     */
    packetLength?: number;
    /**
     * boolean: Enable FIFO packet mode. When enabled, `gdo0_pin` is required. Defaults to `false`.
     * @yamlKey packet_mode
     */
    packetMode?: boolean;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * enum: Internal RX attenuation. Options: `0dB`, `6dB`, `12dB`, `18dB`. Defaults to `0dB`.
     * @yamlKey rx_attenuation
     */
    rxAttenuation?: "0dB" | "12dB" | "18dB" | "6dB";
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /**
     * int: The symbol rate in Baud. Range: `600` to `500000`. Defaults to `5000`.
     * @yamlKey symbol_rate
     */
    symbolRate?: number;
    /**
     * enum: Sync word detection mode. Options: `None`, `15/16`, `16/16`, `30/32`. Defaults to `16/16`.
     * @yamlKey sync_mode
     */
    syncMode?: "15/16" | "16/16" | "30/32" | "None";
    /** hex: Lower sync word byte. Defaults to `0x91`. */
    sync0?: number;
    /** hex: Upper sync word byte. Defaults to `0xD3`. */
    sync1?: number;
    /**
     * enum: Time to wait after a gain change before allowing another adjustment. Options: `8`, `16`, `24`, `32`. Defaults t...
     * @yamlKey wait_time
     */
    waitTime?: "16" | "24" | "32" | "8";
    /** boolean: Enable data whitening to improve DC balance. Defaults to `false`. */
    whitening?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            cc1101: Cc1101Props & ComponentProps<__marker_cc1101_CC1101Component>;
        }
    }
}
