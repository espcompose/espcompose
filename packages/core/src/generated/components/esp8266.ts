// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
export interface Esp8266FrameworkProps {
    /**
     * string: The version of the [platformio/espressif8266](https://github.com/platformio/platform-espressif8266/releases/)...
     * @yamlKey platform_version
     */
    platformVersion?: string;
    /** string: The PlatformIO package or repository to use for the framework. This can be used to use a custom or patched ve... */
    source?: string;
    /** string: The base framework version number to use, from [esp8266 arduino releases](https://github.com/esp8266/Arduino/... */
    version?: string;
}
export interface Esp8266Props {
    /** string: The PlatformIO board ID that should be used. Choose the appropriate board from [this list](https://registry.p... */
    board: "agruminolemon" | "d1" | "d1_mini" | "d1_mini_lite" | "d1_mini_pro" | "eduinowifi" | "esp01" | "esp01_1m" | "esp07" | "esp07s" | "esp12e" | "esp210" | "esp8285" | "esp_wroom_02" | "espduino" | "espectro" | "espino" | "espinotee" | "espmxdevkit" | "espresso_lite_v1" | "espresso_lite_v2" | "gen4iod" | "heltec_wifi_kit_8" | "huzzah" | "inventone" | "modwifi" | "nodemcu" | "nodemcuv2" | "oak" | "phoenix_v1" | "phoenix_v2" | "sonoff_basic" | "sonoff_s20" | "sonoff_sv" | "sonoff_th" | "sparkfunBlynk" | "thing" | "thingdev" | "wifi_slot" | "wifiduino" | "wifinfo" | "wio_link" | "wio_node" | "xinabox_cw01";
    /**
     * string: The SPI mode of the flash chip. One of `qio`, `qout`, `dio` and `dout`. Defaults to `dout` for compatibility ...
     * @yamlKey board_flash_mode
     */
    boardFlashMode?: "dio" | "dout" | "qio" | "qout";
    /**
     * boolean: Specifies whether pins should be initialised as early as possible to known values. Recommended value is `fal...
     * @yamlKey early_pin_init
     */
    earlyPinInit?: boolean;
    /**
     * boolean: Enable full `FILE*`-based printf support. By default, ESPHome wraps `printf()`, `vprintf()`, and `fprintf()`...
     * @yamlKey enable_full_printf
     */
    enableFullPrintf?: boolean;
    /**
     * boolean: Enable float support for `scanf()`/`sscanf()`. By default, ESPHome removes the `-u _scanf_float` linker flag...
     * @yamlKey enable_scanf_float
     */
    enableScanfFloat?: boolean;
    /**
     * boolean: Force-enable the Arduino `Serial` object (UART0) for use in lambdas or external libraries. Most users will n...
     * @yamlKey enable_serial
     */
    enableSerial?: boolean;
    /**
     * boolean: Force-enable the Arduino `Serial1` object (UART1) for use in lambdas or external libraries. Most users will ...
     * @yamlKey enable_serial1
     */
    enableSerial1?: boolean;
    /** Options for the underlying framework used by ESPHome. */
    framework?: Esp8266FrameworkProps;
    /**
     * boolean: Whether to store some persistent preferences in flash memory. Defaults to `false`.
     * @yamlKey restore_from_flash
     */
    restoreFromFlash?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp8266: Esp8266Props & ComponentProps;
        }
    }
}
