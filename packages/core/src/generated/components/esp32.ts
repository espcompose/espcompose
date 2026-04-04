// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
export interface Esp32FrameworkPropsAdvancedProps {
    /** @yamlKey assertion_level */
    assertionLevel?: "DISABLE" | "ENABLE" | "SILENT";
    /** @yamlKey compiler_optimization */
    compilerOptimization?: "DEBUG" | "NONE" | "PERF" | "SIZE";
    /** @yamlKey enable_idf_experimental_features */
    enableIdfExperimentalFeatures?: boolean;
    /** @yamlKey enable_lwip_assert */
    enableLwipAssert?: boolean;
    /** @yamlKey ignore_efuse_custom_mac */
    ignoreEfuseCustomMac?: boolean;
    /** @yamlKey ignore_efuse_mac_crc */
    ignoreEfuseMacCrc?: boolean;
    /** @yamlKey minimum_chip_revision */
    minimumChipRevision?: "0.0" | "1.0" | "1.1" | "2.0" | "3.0" | "3.1";
    /** @yamlKey enable_lwip_dhcp_server */
    enableLwipDhcpServer?: boolean;
    /** @yamlKey enable_lwip_mdns_queries */
    enableLwipMdnsQueries?: boolean;
    /** @yamlKey enable_lwip_bridge_interface */
    enableLwipBridgeInterface?: boolean;
    /** @yamlKey enable_lwip_tcpip_core_locking */
    enableLwipTcpipCoreLocking?: boolean;
    /** @yamlKey enable_lwip_check_thread_safety */
    enableLwipCheckThreadSafety?: boolean;
    /** @yamlKey disable_libc_locks_in_iram */
    disableLibcLocksInIram?: boolean;
    /** @yamlKey disable_vfs_support_termios */
    disableVfsSupportTermios?: boolean;
    /** @yamlKey disable_vfs_support_select */
    disableVfsSupportSelect?: boolean;
    /** @yamlKey disable_vfs_support_dir */
    disableVfsSupportDir?: boolean;
    /** @yamlKey freertos_in_iram */
    freertosInIram?: boolean;
    /** @yamlKey ringbuf_in_iram */
    ringbufInIram?: boolean;
    /** @yamlKey heap_in_iram */
    heapInIram?: boolean;
    /** @yamlKey execute_from_psram */
    executeFromPsram?: boolean;
    /** @yamlKey loop_task_stack_size */
    loopTaskStackSize?: number;
    /** @yamlKey enable_ota_rollback */
    enableOtaRollback?: boolean;
    /** @yamlKey use_full_certificate_bundle */
    useFullCertificateBundle?: boolean;
    /** @yamlKey include_builtin_idf_components */
    includeBuiltinIdfComponents?: Array<string>;
    /** @yamlKey enable_full_printf */
    enableFullPrintf?: boolean;
    /** @yamlKey disable_debug_stubs */
    disableDebugStubs?: boolean;
    /** @yamlKey disable_ocd_aware */
    disableOcdAware?: boolean;
    /** @yamlKey disable_usb_serial_jtag_secondary */
    disableUsbSerialJtagSecondary?: boolean;
    /** @yamlKey disable_dev_null_vfs */
    disableDevNullVfs?: boolean;
    /** @yamlKey disable_mbedtls_peer_cert */
    disableMbedtlsPeerCert?: boolean;
    /** @yamlKey disable_mbedtls_pkcs7 */
    disableMbedtlsPkcs7?: boolean;
    /** @yamlKey disable_regi2c_in_iram */
    disableRegi2cInIram?: boolean;
    /** @yamlKey disable_fatfs */
    disableFatfs?: boolean;
}
export interface Esp32FrameworkPropsComponentsProps {
    name: string;
    source?: unknown;
    ref?: string;
    path?: string;
}
export interface Esp32FrameworkProps {
    type?: "esp-idf" | "arduino";
    version?: string;
    release?: string;
    source?: string;
    /** @yamlKey platform_version */
    platformVersion?: unknown;
    /** @yamlKey sdkconfig_options */
    sdkconfigOptions?: Record<string, string>;
    /** @yamlKey log_level */
    logLevel?: "NONE" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "VERBOSE";
    advanced?: Esp32FrameworkPropsAdvancedProps;
    components?: Array<Esp32FrameworkPropsComponentsProps>;
}
export interface Esp32Props {
    /** string: The PlatformIO board ID that should be used. Choose the appropriate board from [this list](https://registry.p... */
    board?: "4d_systems_esp32s3_gen4_r8n16" | "adafruit_camera_esp32s3" | "adafruit_feather_esp32_v2" | "adafruit_feather_esp32c6" | "adafruit_feather_esp32s2" | "adafruit_feather_esp32s2_reversetft" | "adafruit_feather_esp32s2_tft" | "adafruit_feather_esp32s3" | "adafruit_feather_esp32s3_nopsram" | "adafruit_feather_esp32s3_reversetft" | "adafruit_feather_esp32s3_tft" | "adafruit_funhouse_esp32s2" | "adafruit_itsybitsy_esp32" | "adafruit_magtag29_esp32s2" | "adafruit_matrixportal_esp32s3" | "adafruit_metro_esp32s2" | "adafruit_metro_esp32s3" | "adafruit_qtpy_esp32" | "adafruit_qtpy_esp32c3" | "adafruit_qtpy_esp32s2" | "adafruit_qtpy_esp32s3_n4r2" | "adafruit_qtpy_esp32s3_nopsram" | "adafruit_qualia_s3_rgb666" | "airm2m_core_esp32c3" | "alksesp32" | "arduino_nano_esp32" | "arduino_nesso_n1" | "atd147_s3" | "atmegazero_esp32s2" | "aventen_s3_sync" | "az-delivery-devkit-v4" | "bee_data_logger" | "bee_motion" | "bee_motion_mini" | "bee_motion_s3" | "bee_s3" | "bpi-bit" | "bpi-centi-s3" | "bpi_leaf_s3" | "cnrs_aw2eth" | "connaxio_espoir" | "cytron_maker_feather_aiot_s3" | "d-duino-32" | "deneyapkart" | "deneyapkart1A" | "deneyapkart1Av2" | "deneyapkartg" | "deneyapmini" | "deneyapminiv2" | "denky32" | "denky_d4" | "dfrobot_beetle_esp32c3" | "dfrobot_firebeetle2_esp32c6" | "dfrobot_firebeetle2_esp32e" | "dfrobot_firebeetle2_esp32s3" | "dfrobot_romeo_esp32s3" | "dpu_esp32" | "edgebox-esp-100" | "esp-wrover-kit" | "esp32-c2-devkitm-1" | "esp32-c3-devkitc-02" | "esp32-c3-devkitm-1" | "esp32-c3-m1i-kit" | "esp32-c5-devkitc-1" | "esp32-c5-devkitc1-n16r4" | "esp32-c5-devkitc1-n4" | "esp32-c5-devkitc1-n8r4" | "esp32-c6-devkitc-1" | "esp32-c6-devkitm-1" | "esp32-c61-devkitc1" | "esp32-c61-devkitc1-n8r2" | "esp32-devkitlipo" | "esp32-evb" | "esp32-gateway" | "esp32-h2-devkitm-1" | "esp32-p4" | "esp32-p4-evboard" | "esp32-p4_r3" | "esp32-p4_r3-evboard" | "esp32-pico-devkitm-2" | "esp32-poe" | "esp32-poe-iso" | "esp32-pro" | "esp32-s2-franzininho" | "esp32-s2-kaluga-1" | "esp32-s2-saola-1" | "esp32-s3-devkitc-1" | "esp32-s3-devkitc-1-n32r8v" | "esp32-s3-devkitc1-n16r16" | "esp32-s3-devkitc1-n16r2" | "esp32-s3-devkitc1-n16r8" | "esp32-s3-devkitc1-n4r2" | "esp32-s3-devkitc1-n4r8" | "esp32-s3-devkitc1-n8r2" | "esp32-s3-devkitc1-n8r8" | "esp32-s3-devkitm-1" | "esp32-s3-fh4r2" | "esp32-solo1" | "esp320" | "esp32cam" | "esp32dev" | "esp32doit-devkit-v1" | "esp32doit-espduino" | "esp32s3_120_16_8-qio_opi" | "esp32s3_powerfeather" | "esp32s3box" | "esp32s3camlcd" | "esp32s3usbotg" | "esp32thing" | "esp32thing_plus" | "esp32vn-iot-uno" | "espea32" | "espectro32" | "espino32" | "etboard" | "featheresp32" | "featheresp32-s2" | "firebeetle32" | "fm-devkit" | "franzininho_wifi_esp32s2" | "franzininho_wifi_msc_esp32s2" | "freenove-esp32-s3-n8r8" | "freenove_esp32_s3_wroom" | "freenove_esp32_wrover" | "frogboard" | "healthypi4" | "heltec_wifi_kit_32" | "heltec_wifi_kit_32_V3" | "heltec_wifi_kit_32_v2" | "heltec_wifi_lora_32" | "heltec_wifi_lora_32_V2" | "heltec_wifi_lora_32_V3" | "heltec_wireless_stick" | "heltec_wireless_stick_lite" | "honeylemon" | "hornbill32dev" | "hornbill32minima" | "huidu_hd_wf2" | "huidu_hd_wf4" | "imbrios-logsens-v1p1" | "inex_openkb" | "intorobot" | "iotaap_magnolia" | "iotbusio" | "iotbusproteus" | "ioxesp32" | "ioxesp32ps" | "jczn_2432s028r" | "kb32-ft" | "kits-edu" | "labplus_mpython" | "lilka_v2" | "lilygo-t-display" | "lilygo-t-display-s3" | "lilygo-t3-s3" | "lionbit" | "lionbits3" | "lolin32" | "lolin32_lite" | "lolin_c3_mini" | "lolin_d32" | "lolin_d32_pro" | "lolin_s2_mini" | "lolin_s2_pico" | "lolin_s3" | "lolin_s3_mini" | "lolin_s3_mini_pro" | "lolin_s3_pro" | "lopy" | "lopy4" | "m5stack-atom" | "m5stack-atoms3" | "m5stack-atoms3u" | "m5stack-core-esp32" | "m5stack-core-esp32-16M" | "m5stack-core2" | "m5stack-coreink" | "m5stack-cores3" | "m5stack-fire" | "m5stack-grey" | "m5stack-stamps3" | "m5stack-station" | "m5stack-tab5-p4" | "m5stack-timer-cam" | "m5stack_paper" | "m5stamp-pico" | "m5stick-c" | "magicbit" | "mgbot-iotik32a" | "mgbot-iotik32b" | "mhetesp32devkit" | "mhetesp32minikit" | "microduino-core-esp32" | "micros2" | "minimain_esp32s2" | "motorgo_mini_1" | "namino_arancio" | "namino_rosso" | "nano32" | "nebulas3" | "nina_w10" | "node32s" | "nodemcu-32s" | "nodemcu-32s2" | "nologo_esp32c3_super_mini" | "nscreen-32" | "odroid_esp32" | "onehorse32dev" | "oroca_edubot" | "pico32" | "piranha_esp32" | "pocket_32" | "pycom_gpy" | "qchip" | "quantum" | "redpill_esp32s3" | "roboheart_hercules" | "rymcu-esp32-s3-devkitc-1" | "s_odi_ultra" | "seeed_xiao_esp32c3" | "seeed_xiao_esp32c6" | "seeed_xiao_esp32s3" | "sensebox_mcu_esp32s2" | "sensesiot_weizen" | "sg-o_airMon" | "sparkfun_esp32_iot_redboard" | "sparkfun_esp32c6_thing_plus" | "sparkfun_esp32micromod" | "sparkfun_esp32s2_thing_plus" | "sparkfun_esp32s2_thing_plus_c" | "sparkfun_esp32s3_thing_plus" | "sparkfun_lora_gateway_1-channel" | "sparkfun_pro_micro_esp32c3" | "sparkfun_qwiic_pocket_esp32c6" | "tamc_termod_s3" | "tinypico" | "trueverit-iot-driver" | "trueverit-iot-driver-mk2" | "trueverit-iot-driver-mk3" | "ttgo-lora32-v1" | "ttgo-lora32-v2" | "ttgo-lora32-v21" | "ttgo-t-beam" | "ttgo-t-oi-plus" | "ttgo-t-watch" | "ttgo-t1" | "ttgo-t7-v13-mini32" | "ttgo-t7-v14-mini32" | "turta_iot_node" | "um_bling" | "um_edges3_d" | "um_feathers2" | "um_feathers2_neo" | "um_feathers3" | "um_feathers3_neo" | "um_nanos3" | "um_omgs3" | "um_pros3" | "um_rmp" | "um_squixl" | "um_tinyc6" | "um_tinys2" | "um_tinys3" | "unphone7" | "unphone8" | "unphone9" | "upesy_wroom" | "upesy_wrover" | "valtrack_v4_mfw_esp32_c3" | "valtrack_v4_vts_esp32_c3" | "vintlabs-devkit-v1" | "watchy" | "waveshare_esp32_s3_zero" | "waveshare_esp32s3_touch_lcd_128" | "weactstudio_esp32c3coreboard" | "wemos_d1_mini32" | "wemos_d1_uno32" | "wemosbat" | "wesp32" | "widora-air" | "wifiduino32" | "wifiduino32c3" | "wifiduino32s3" | "wipy3" | "ws_esp32_s3_matrix" | "wt32-eth01" | "wt32-sc01-plus" | "xinabox_cw02" | "yb_esp32s3_amp" | "yb_esp32s3_amp_v2" | "yb_esp32s3_amp_v3" | "yb_esp32s3_dac" | "yb_esp32s3_drv" | "yb_esp32s3_eth";
    /**
     * string: The CPU frequency to use. One of `40MHz`, `80MHz`, `160MHz`, `240MHz`, `360MHz` or `400MHz`. Defaults to `160...
     * @yamlKey cpu_frequency
     */
    cpuFrequency?: "96MHZ" | "80MHZ" | "16MHZ" | "400MHZ" | "240MHZ" | "120MHZ" | "40MHZ" | "32MHZ" | "360MHZ" | "48MHZ" | "160MHZ" | "64MHZ";
    /**
     * boolean: ESP32-P4 only. Set to `true` if your board has engineering sample silicon (rev < 3.0). When using `variant: ...
     * @yamlKey engineering_sample
     */
    engineeringSample?: boolean;
    /**
     * string: The amount of flash memory available on the ESP32 board/module. One of `2MB`, `4MB`, `8MB`, `16MB` or `32MB`....
     * @yamlKey flash_size
     */
    flashSize?: "2MB" | "4MB" | "8MB" | "16MB" | "32MB";
    /** filename: The name of (optionally including the path to) the file containing the partitioning scheme to be used. When... */
    partitions?: unknown;
    /** string: The ESP32 mcu/chip to use for this device configuration. One of `esp32`, `esp32s2`, `esp32s3`, `esp32c2`, `es... */
    variant?: "ESP32" | "ESP32C2" | "ESP32C3" | "ESP32C5" | "ESP32C6" | "ESP32C61" | "ESP32H2" | "ESP32P4" | "ESP32S2" | "ESP32S3";
    /** Options for the underlying framework used by ESPHome. See [Framework](https://esphome.io/components/esp32#esp32-frame... */
    framework?: Esp32FrameworkProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32: Esp32Props & ComponentProps;
        }
    }
}
