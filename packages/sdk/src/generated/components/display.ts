// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _BleClient, _CoreComponent, _DisplayBasicDisplay, _DisplayFullDisplay, _QspiDbiDisplayBase } from "../bases";
import type { _esphome_hub75_HUB75Display, addressable_light_AddressableLightDisplay, i2c_I2CBus, ili9xxx_ILI9XXXDisplay, inkplate_Inkplate, lcd_gpio_GPIOLCDDisplay, lcd_pcf8574_PCF8574LCDDisplay, light_AddressableLightState, max7219_MAX7219Component, max7219digit_MAX7219Component, nextion_Nextion, pcd8544_PCD8544, power_supply_PowerSupply, pvvx_mithermometer_PVVXDisplay, rpi_dpi_rgb_RpiDpiRgb, sdl_Sdl, spi_SPIComponent, ssd1306_i2c_I2CSSD1306, ssd1306_spi_SPISSD1306, ssd1322_spi_SPISSD1322, ssd1325_spi_SPISSD1325, ssd1327_i2c_I2CSSD1327, ssd1327_spi_SPISSD1327, ssd1331_spi_SPISSD1331, ssd1351_spi_SPISSD1351, st7567_i2c_I2CST7567, st7567_spi_SPIST7567, st7701s_ST7701S, st7735_ST7735, st7789v_ST7789V, st7920_ST7920, time_RealTimeClock, tm1621_TM1621Display, tm1637_TM1637Display, tm1638_TM1638Component, uart_UARTComponent, waveshare_epaper_WaveshareEPaperBase } from "../markers";
interface Ili9xxxDimensionsProps {
    /** int: Specifies width of display. */
    width: number | EmbedValue<number>;
    /** int: Specifies height of display in pixels. */
    height: number | EmbedValue<number>;
    /**
     * int: Specify an offset for the y-direction of the display. Default is 0.
     * @yamlKey offset_height
     */
    offsetHeight?: number | EmbedValue<number>;
    /**
     * int: Specify an offset for the x-direction of the display, typically used when an LCD is smaller than the maximum sup...
     * @yamlKey offset_width
     */
    offsetWidth?: number | EmbedValue<number>;
}
interface Ili9xxxTransformProps {
    /**
     * boolean: If true, exchange the x and y axes.
     * @yamlKey swap_xy
     */
    swapXy?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean | EmbedValue<boolean>;
}
interface InkplateTransformProps {
    /** @yamlKey mirror_x */
    mirrorX?: boolean | EmbedValue<boolean>;
    /** @yamlKey mirror_y */
    mirrorY?: boolean | EmbedValue<boolean>;
}
interface QspiDbiRM67162TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, exchange the x and y axes. Not available for some chips
     * @yamlKey swap_xy
     */
    swapXy?: boolean | EmbedValue<boolean>;
}
interface QspiDbiRM690B0TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, exchange the x and y axes. Not available for some chips
     * @yamlKey swap_xy
     */
    swapXy?: boolean | EmbedValue<boolean>;
}
interface QspiDbiAXS15231TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean | EmbedValue<boolean>;
}
interface QspiDbiJC4832W535TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean | EmbedValue<boolean>;
}
interface QspiDbiJC3636W518TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, exchange the x and y axes. Not available for some chips
     * @yamlKey swap_xy
     */
    swapXy?: boolean | EmbedValue<boolean>;
}
interface QspiDbiCUSTOMTransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, exchange the x and y axes. Not available for some chips
     * @yamlKey swap_xy
     */
    swapXy?: boolean | EmbedValue<boolean>;
}
interface RpiDpiRgbDimensionsProps {
    /** int: Specifies width of display. */
    width: number | EmbedValue<number>;
    /** int: Specifies height of display in pixels. */
    height: number | EmbedValue<number>;
    /**
     * int: Specify an offset for the y-direction of the display. Default is 0.
     * @yamlKey offset_height
     */
    offsetHeight?: number | EmbedValue<number>;
    /**
     * int: Specify an offset for the x-direction of the display, typically used when an LCD is smaller than the maximum sup...
     * @yamlKey offset_width
     */
    offsetWidth?: number | EmbedValue<number>;
}
interface RpiDpiRgbDataPinsProps {
    /** [Pin Schema](/guides/configuration-types#pin-schema): Exactly 5 pin numbers for the red databits, listed from least t... */
    red: unknown;
    /** [Pin Schema](/guides/configuration-types#pin-schema): Exactly 6 pin numbers for the green databits, listed from least... */
    green: unknown;
    /** [Pin Schema](/guides/configuration-types#pin-schema): Exactly 5 pin numbers for the blue databits, listed from least ... */
    blue: unknown;
}
interface St7701sDimensionsProps {
    /** int: Specifies width of display. */
    width: number | EmbedValue<number>;
    /** int: Specifies height of display in pixels. */
    height: number | EmbedValue<number>;
    /**
     * int: Specify an offset for the y-direction of the display. Default is 0.
     * @yamlKey offset_height
     */
    offsetHeight?: number | EmbedValue<number>;
    /**
     * int: Specify an offset for the x-direction of the display, typically used when an LCD is smaller than the maximum sup...
     * @yamlKey offset_width
     */
    offsetWidth?: number | EmbedValue<number>;
}
interface St7701sTransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean | EmbedValue<boolean>;
}
interface St7701sDataPinsProps {
    /** [Pin Schema](/guides/configuration-types#pin-schema): Exactly 5 pin numbers for the red databits, listed from least t... */
    red: unknown;
    /** [Pin Schema](/guides/configuration-types#pin-schema): Exactly 6 pin numbers for the green databits, listed from least... */
    green: unknown;
    /** [Pin Schema](/guides/configuration-types#pin-schema): Exactly 5 pin numbers for the blue databits, listed from least ... */
    blue: unknown;
}
interface SdlDimensionsProps {
    width: number | EmbedValue<number>;
    height: number | EmbedValue<number>;
}
interface SdlWindowOptionsPropsPositionProps {
    x: number | EmbedValue<number>;
    y: number | EmbedValue<number>;
}
interface SdlWindowOptionsProps {
    position?: SdlWindowOptionsPropsPositionProps;
    /** boolean: Whether to draw the display window with or without borders */
    borderless?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Whether to always draw the display window above other windows or not
     * @yamlKey always_on_top
     */
    alwaysOnTop?: boolean | EmbedValue<boolean>;
    /** boolean: Whether to draw the display window in fullscreen or not. This may resize the resolution of the host display ... */
    fullscreen?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Whether to skip adding a taskbar icon for the display window or not
     * @yamlKey skip_taskbar
     */
    skipTaskbar?: boolean | EmbedValue<boolean>;
    /** boolean: Whether the display window can be manually resized */
    resizable?: boolean | EmbedValue<boolean>;
}
interface AddressableLightProps extends _DisplayFullDisplay {
    /**
     * [ID](/guides/configuration-types#id): The id of the addressable light component to use as a display.
     * @yamlKey addressable_light_id
     */
    addressableLightId: RefProp<light_AddressableLightState>;
    /** int: The width of the LED matrix in pixels. */
    width: number | EmbedValue<number>;
    /** int: The height of the LED matrix in pixels. */
    height: number | EmbedValue<number>;
    /**
     * [lambda](/automations/templates#config-lambda): A lambda that returns the integer address of the LED given the suppli...
     * @yamlKey pixel_mapper
     */
    pixelMapper?: unknown;
}
interface Hub75Props extends _DisplayFullDisplay {
    /** string: Board preset name. One of: `adafruit-matrix-portal-s3`, `apollo-automation-m1-rev4`, `apollo-automation-m1-re... */
    board?: "adafruit-matrix-portal-s3" | "apollo-automation-m1-rev4" | "apollo-automation-m1-rev6" | "huidu-hd-wf1" | "huidu-hd-wf2" | "esp32-trinity";
    /**
     * int: Width of a single panel in pixels (e.g., `64`).
     * @yamlKey panel_width
     */
    panelWidth: number | EmbedValue<number>;
    /**
     * int: Height of a single panel in pixels (e.g., `32`).
     * @yamlKey panel_height
     */
    panelHeight: number | EmbedValue<number>;
    /**
     * int: Number of panels arranged vertically. Defaults to `1`.
     * @yamlKey layout_rows
     */
    layoutRows?: number | EmbedValue<number>;
    /**
     * int: Number of panels arranged horizontally. Defaults to `1`.
     * @yamlKey layout_cols
     */
    layoutCols?: number | EmbedValue<number>;
    /** enum: Physical panel chaining pattern. Defaults to `HORIZONTAL`. One of: */
    layout?: "HORIZONTAL" | "TOP_LEFT_DOWN" | "TOP_RIGHT_DOWN" | "BOTTOM_LEFT_UP" | "BOTTOM_RIGHT_UP" | "TOP_LEFT_DOWN_ZIGZAG" | "TOP_RIGHT_DOWN_ZIGZAG" | "BOTTOM_LEFT_UP_ZIGZAG" | "BOTTOM_RIGHT_UP_ZIGZAG";
    /**
     * enum: Panel scan wiring pattern. Defaults to `STANDARD_TWO_SCAN`. One of:
     * @yamlKey scan_wiring
     */
    scanWiring?: unknown;
    /**
     * enum: LED shift register driver chip type. Defaults to `GENERIC`. One of:
     * @yamlKey shift_driver
     */
    shiftDriver?: "GENERIC" | "FM6126A" | "ICN2038S" | "FM6124" | "MBI5124" | "DP3246";
    /**
     * boolean: Enable double buffering to prevent tearing. Defaults to `false`. Set to `false` when using LVGL.
     * @yamlKey double_buffer
     */
    doubleBuffer?: boolean | EmbedValue<boolean>;
    /** int: Initial brightness level (0-255). Defaults to `128`. */
    brightness?: number | EmbedValue<number>;
    /**
     * int: Color bit depth (4-12). Higher values = better color accuracy but slower refresh. Defaults to `8`.
     * @yamlKey bit_depth
     */
    bitDepth?: number | EmbedValue<number>;
    /**
     * enum: Gamma correction mode. One of:
     * @yamlKey gamma_correct
     */
    gammaCorrect?: "LINEAR" | "CIE1931" | "GAMMA_2_2";
    /**
     * int: Minimum panel refresh rate in Hz (40-200). The panel may refresh faster than this, but won't go slower. Auto-cal...
     * @yamlKey min_refresh_rate
     */
    minRefreshRate?: number | EmbedValue<number>;
    /**
     * Red data pin for top half.
     * @yamlKey r1_pin
     */
    r1Pin?: Pin | EmbedValue<Pin>;
    /**
     * Green data pin for top half.
     * @yamlKey g1_pin
     */
    g1Pin?: Pin | EmbedValue<Pin>;
    /**
     * Blue data pin for top half.
     * @yamlKey b1_pin
     */
    b1Pin?: Pin | EmbedValue<Pin>;
    /**
     * Red data pin for bottom half.
     * @yamlKey r2_pin
     */
    r2Pin?: Pin | EmbedValue<Pin>;
    /**
     * Green data pin for bottom half.
     * @yamlKey g2_pin
     */
    g2Pin?: Pin | EmbedValue<Pin>;
    /**
     * Blue data pin for bottom half.
     * @yamlKey b2_pin
     */
    b2Pin?: Pin | EmbedValue<Pin>;
    /**
     * Row address bit 0.
     * @yamlKey a_pin
     */
    aPin?: Pin | EmbedValue<Pin>;
    /**
     * Row address bit 1.
     * @yamlKey b_pin
     */
    bPin?: Pin | EmbedValue<Pin>;
    /**
     * Row address bit 2.
     * @yamlKey c_pin
     */
    cPin?: Pin | EmbedValue<Pin>;
    /**
     * Row address bit 3.
     * @yamlKey d_pin
     */
    dPin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Row address bit 4. Required for 1/32 scan panels (32+ rows), om...
     * @yamlKey e_pin
     */
    ePin?: Pin | EmbedValue<Pin>;
    /**
     * Latch/strobe pin.
     * @yamlKey lat_pin
     */
    latPin?: Pin | EmbedValue<Pin>;
    /**
     * Output enable pin.
     * @yamlKey oe_pin
     */
    oePin?: Pin | EmbedValue<Pin>;
    /**
     * Clock pin.
     * @yamlKey clk_pin
     */
    clkPin?: Pin | EmbedValue<Pin>;
    /**
     * enum: Output clock speed. Defaults to `20MHZ`. One of:
     * @yamlKey clock_speed
     */
    clockSpeed?: "8MHZ" | "10MHZ" | "16MHZ" | "20MHZ";
    /**
     * int: Number of clock cycles OE is blanked during LAT pulse. Defaults to `1`.
     * @yamlKey latch_blanking
     */
    latchBlanking?: number | EmbedValue<number>;
    /**
     * boolean: Invert clock phase. Defaults to `false`. Required to be `true` for MBI5124 driver.
     * @yamlKey clock_phase
     */
    clockPhase?: boolean | EmbedValue<boolean>;
}
interface Ili9xxxProps extends _DisplayFullDisplay, _CoreComponent {
    /** The model of the display. Options are: */
    model: "GC9A01A" | "GC9D01N" | "M5STACK" | "M5CORE" | "TFT_2.4" | "TFT_2.4R" | "ILI9341" | "ILI9342" | "ILI9481" | "ILI9481-18" | "ILI9486" | "ILI9488" | "ILI9488_A" | "ST7735" | "ST7796" | "ST7789V" | "S3BOX" | "S3BOX_LITE" | "WAVESHARE_RES_3_5" | "CUSTOM";
    /**
     * Allows forcing the display into 18 or 16 bit mode. Options are `18bit` or `16bit`. If unspecified, the pixel mode wil...
     * @yamlKey pixel_mode
     */
    pixelMode?: "16bit" | "18bit";
    /** Dimensions of the screen, specified either as *width* x *height* (e.g `320x240` ) or with separate config keys. If no... */
    dimensions?: Ili9xxxDimensionsProps;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin | EmbedValue<Pin>;
    /**
     * When using 8 bit colors, this controls the type of color palette that will be used in the ESP's internal 8-bits-per-p...
     * @yamlKey color_palette
     */
    colorPalette?: "NONE" | "GRAYSCALE" | "IMAGE_ADAPTIVE" | "8BIT";
    /**
     * A list of image files that will be used to generate the color palette for the display. This should only be used in co...
     * @yamlKey color_palette_images
     */
    colorPaletteImages?: Array<unknown>;
    /**
     * Specifies whether the display colors should be inverted. Options are `true` or `false` - if you are unsure, use `fals...
     * @yamlKey invert_colors
     */
    invertColors: boolean | EmbedValue<boolean>;
    /**
     * Should be one of `bgr` (default) or `rgb`.
     * @yamlKey color_order
     */
    colorOrder?: "RGB" | "BGR";
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: Ili9xxxTransformProps;
    /**
     * Allows custom initialisation sequences to be added. See below for more information.
     * @yamlKey init_sequence
     */
    initSequence?: Array<unknown>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin?: Pin | EmbedValue<Pin>;
}
interface InkplateProps extends _DisplayFullDisplay, _CoreComponent {
    /** boolean: Makes the screen display 3 bit colors. Defaults to `false` */
    greyscale?: boolean | EmbedValue<boolean>;
    /**
     * int: Sets a custom predefined waveform for the display. Accepts values from 1 to 4. Useful if the greyscale of the im...
     * @yamlKey custom_waveform
     */
    customWaveform?: number | EmbedValue<number>;
    /** Transform the display presentation. */
    transform?: InkplateTransformProps;
    /**
     * boolean: Makes the screen update partially, which is faster, but leaves burnin. Defaults to `false`
     * @yamlKey partial_updating
     */
    partialUpdating?: boolean | EmbedValue<boolean>;
    /**
     * int: When partial updating is enabled, forces a full screen update after chosen number of updates. Defaults to `10`
     * @yamlKey full_update_every
     */
    fullUpdateEvery?: number | EmbedValue<number>;
    /** enum: Specify the model. Defaults to `inkplate_6`. */
    model?: "inkplate_6" | "inkplate_10" | "inkplate_6_plus" | "inkplate_6_v2" | "inkplate_5" | "inkplate_5_v2";
    /**
     * [Pin](/guides/configuration-types#pin): The CKV pin for the Inkplate display.
     * @yamlKey ckv_pin
     */
    ckvPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The GMOD pin for the Inkplate display.
     * @yamlKey gmod_pin
     */
    gmodPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The GPIO0 Enable pin for the Inkplate display.
     * @yamlKey gpio0_enable_pin
     */
    gpio0EnablePin: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The OE pin for the Inkplate display.
     * @yamlKey oe_pin
     */
    oePin: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The Powerup pin for the Inkplate display.
     * @yamlKey powerup_pin
     */
    powerupPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The SPH pin for the Inkplate display.
     * @yamlKey sph_pin
     */
    sphPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The SPV pin for the Inkplate display.
     * @yamlKey spv_pin
     */
    spvPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The VCOM pin for the Inkplate display.
     * @yamlKey vcom_pin
     */
    vcomPin: Pin | EmbedValue<Pin>;
    /** @yamlKey wakeup_pin */
    wakeupPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The CL pin for the Inkplate display. Defaults to GPIO0.
     * @yamlKey cl_pin
     */
    clPin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The LE pin for the Inkplate display. Defaults to GPIO2.
     * @yamlKey le_pin
     */
    lePin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The Data 0 pin for the Inkplate display. Defaults to GPIO4.
     * @yamlKey display_data_0_pin
     */
    displayData0Pin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The Data 1 pin for the Inkplate display. Defaults to GPIO5.
     * @yamlKey display_data_1_pin
     */
    displayData1Pin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The Data 2 pin for the Inkplate display. Defaults to GPIO18.
     * @yamlKey display_data_2_pin
     */
    displayData2Pin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The Data 3 pin for the Inkplate display. Defaults to GPIO19.
     * @yamlKey display_data_3_pin
     */
    displayData3Pin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The Data 4 pin for the Inkplate display. Defaults to GPIO23.
     * @yamlKey display_data_4_pin
     */
    displayData4Pin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The Data 5 pin for the Inkplate display. Defaults to GPIO25.
     * @yamlKey display_data_5_pin
     */
    displayData5Pin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The Data 6 pin for the Inkplate display. Defaults to GPIO26.
     * @yamlKey display_data_6_pin
     */
    displayData6Pin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin](/guides/configuration-types#pin): The Data 7 pin for the Inkplate display. Defaults to GPIO27.
     * @yamlKey display_data_7_pin
     */
    displayData7Pin?: Pin | EmbedValue<Pin>;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface LcdGpioProps {
    /**
     * list of [pins](/guides/configuration-types#pin-schema): A list of the data pins you have hooked up to the LCD. The li...
     * @yamlKey data_pins
     */
    dataPins: unknown;
    /**
     * [pin](/guides/configuration-types#pin-schema): The pin you have `E` (`06` ) hooked up to.
     * @yamlKey enable_pin
     */
    enablePin: Pin | EmbedValue<Pin>;
    /**
     * [pin](/guides/configuration-types#pin-schema): The pin you have `RS` (`04` ) hooked up to.
     * @yamlKey rs_pin
     */
    rsPin: Pin | EmbedValue<Pin>;
    /**
     * [pin](/guides/configuration-types#pin-schema): Optionally set the pin you have `R/W` (`05` ) hooked up to. You can al...
     * @yamlKey rw_pin
     */
    rwPin?: Pin | EmbedValue<Pin>;
}
interface LcdPcf8574Props {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The [I²C](/components/i2c) address of the PCF8574 chip, defaults to `0x3F`. */
    address?: number;
}
interface Max7219Props extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * int: The number of chips you wish to use for daisy chaining. Defaults to `1`.
     * @yamlKey num_chips
     */
    numChips?: number | EmbedValue<number>;
    /** int: The intensity with which the MAX7219 should drive the outputs. Range is from 0 (least intense) to 15 (the default). */
    intensity?: number | EmbedValue<number>;
    /**
     * boolean: For some displays the order of the chips is reversed so you'll see "56781234" instead of "12345678". This op...
     * @yamlKey reverse_enable
     */
    reverseEnable?: boolean | EmbedValue<boolean>;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [SPI Component](/components/spi) if you want to ...
     * @yamlKey spi_id
     */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the CS line hooked up to.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
}
interface Max7219digitProps extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * int: The number of chips you wish to use for daisy chaining. Defaults to `4`.
     * @yamlKey num_chips
     */
    numChips?: number | EmbedValue<number>;
    /**
     * int: Number of lines if you want to use the displays in Multiline Mode. Defaults to `1` Example: [https://github.com/...
     * @yamlKey num_chip_lines
     */
    numChipLines?: number | EmbedValue<number>;
    /**
     * How are the lines in Multiline Mode connected? Possible values are `zigzag` and `snake`. Defaults to `snake`
     * @yamlKey chip_lines_style
     */
    chipLinesStyle?: "ZIGZAG" | "SNAKE";
    /** int: The intensity with which the MAX7219 should drive the outputs. Range is from `0`, least intense to `15` the brig... */
    intensity?: number | EmbedValue<number>;
    /**
     * Rotates every 8x8 chip. Valid values are `0`, `90`, `180` and `270`. Defaults to `0`.
     * @yamlKey rotate_chip
     */
    rotateChip?: "0" | "90" | "180" | "270";
    /**
     * Set the scroll mode. One of `CONTINUOUS` or `STOP`. Defaults to `CONTINUOUS`
     * @yamlKey scroll_mode
     */
    scrollMode?: "CONTINUOUS" | "STOP";
    /**
     * boolean: Turn scroll mode on when content does not fit. Defaults to `true`.
     * @yamlKey scroll_enable
     */
    scrollEnable?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): Set scroll speed. Defaults to `250ms`
     * @yamlKey scroll_speed
     */
    scrollSpeed?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): Set delay time before scroll starts. Defaults to `1s`.
     * @yamlKey scroll_delay
     */
    scrollDelay?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): Sets the wait time at the end of the scroll before starting over. This is o...
     * @yamlKey scroll_dwell
     */
    scrollDwell?: TimePeriod;
    /**
     * boolean: For some displays the order of the displays is reversed ("DCBA"). This option will reverse the display to ("...
     * @yamlKey reverse_enable
     */
    reverseEnable?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Flip the horizontal axis on the screen. Defaults to `false`.
     * @yamlKey flip_x
     */
    flipX?: boolean | EmbedValue<boolean>;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [SPI Component](/components/spi) if you want to ...
     * @yamlKey spi_id
     */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the CS line hooked up to.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
}
interface Pcd8544Props extends _DisplayFullDisplay, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
    /** int: Set screen contrast (0-255). Defaults to `0x7f`. */
    contrast?: number | EmbedValue<number>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
}
interface PvvxMithermometerProps extends _DisplayBasicDisplay, _BleClient, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): ID of a [Time](/components/time/). If set, the time will be synchronized with e...
     * @yamlKey time_id
     */
    timeId?: RefProp<time_RealTimeClock>;
    /**
     * boolean: Whether to automatically clear the display data before each lambda call, or to keep the existing display con...
     * @yamlKey auto_clear_enabled
     */
    autoClearEnabled?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): The amount of time the BLE connection is maintained before being disconnect...
     * @yamlKey disconnect_delay
     */
    disconnectDelay?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The time periode for which the pvvx device should display the information. ...
     * @yamlKey validity_period
     */
    validityPeriod?: TimePeriod;
}
interface QspiDbiRM67162Props extends _QspiDbiDisplayBase {
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean | EmbedValue<boolean>;
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "RGB" | "BGR";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiRM67162TransformProps;
}
interface QspiDbiRM690B0Props extends _QspiDbiDisplayBase {
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean | EmbedValue<boolean>;
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "RGB" | "BGR";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiRM690B0TransformProps;
}
interface QspiDbiAXS15231Props extends _QspiDbiDisplayBase {
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean | EmbedValue<boolean>;
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "RGB" | "BGR";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiAXS15231TransformProps;
}
interface QspiDbiJC4832W535Props extends _QspiDbiDisplayBase {
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean | EmbedValue<boolean>;
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "RGB" | "BGR";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiJC4832W535TransformProps;
}
interface QspiDbiJC3636W518Props extends _QspiDbiDisplayBase {
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean | EmbedValue<boolean>;
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "RGB" | "BGR";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiJC3636W518TransformProps;
}
interface QspiDbiCUSTOMProps extends _QspiDbiDisplayBase {
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean | EmbedValue<boolean>;
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "RGB" | "BGR";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiCUSTOMTransformProps;
}
interface RpiDpiRgbProps extends _DisplayFullDisplay {
    /** Dimensions of the screen, specified either as *width* x *height* (e.g `320x240` ) or with separate config keys. */
    dimensions: RpiDpiRgbDimensionsProps;
    /**
     * Set the pixel clock speed. Default is 16MHz.
     * @yamlKey pclk_frequency
     */
    pclkFrequency?: unknown;
    /**
     * bool: If the pclk is active negative (default is True)
     * @yamlKey pclk_inverted
     */
    pclkInverted?: boolean | EmbedValue<boolean>;
    /**
     * A list of pins used for the databus. Specified in 3 groups:
     * @yamlKey data_pins
     */
    dataPins: RpiDpiRgbDataPinsProps;
    /**
     * Should be one of `bgr` (default) or `rgb`.
     * @yamlKey color_order
     */
    colorOrder?: "RGB" | "BGR";
    /**
     * With this boolean option you can invert the display colors. Note some of the displays have this option set automatica...
     * @yamlKey invert_colors
     */
    invertColors?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DE pin
     * @yamlKey de_pin
     */
    dePin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The PCLK pin.
     * @yamlKey pclk_pin
     */
    pclkPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The Horizontal sync pin.
     * @yamlKey hsync_pin
     */
    hsyncPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The Vertical sync pin.
     * @yamlKey vsync_pin
     */
    vsyncPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The ENABLE pin.
     * @yamlKey enable_pin
     */
    enablePin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin | EmbedValue<Pin>;
    /**
     * int: The horizontal sync pulse width.
     * @yamlKey hsync_pulse_width
     */
    hsyncPulseWidth?: number | EmbedValue<number>;
    /**
     * int: The horizontal back porch length.
     * @yamlKey hsync_back_porch
     */
    hsyncBackPorch?: number | EmbedValue<number>;
    /**
     * int: The horizontal front porch length.
     * @yamlKey hsync_front_porch
     */
    hsyncFrontPorch?: number | EmbedValue<number>;
    /**
     * int: The vertical sync pulse width.
     * @yamlKey vsync_pulse_width
     */
    vsyncPulseWidth?: number | EmbedValue<number>;
    /**
     * int: The vertical back porch length.
     * @yamlKey vsync_back_porch
     */
    vsyncBackPorch?: number | EmbedValue<number>;
    /**
     * int: The vertical front porch length.
     * @yamlKey vsync_front_porch
     */
    vsyncFrontPorch?: number | EmbedValue<number>;
}
interface Ssd1306I2cProps extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the [I²C](/components/i2c) address of the display. Defaults to 0x3C. */
    address?: number;
}
interface Ssd1306SpiProps extends _CoreComponent {
    /** @yamlKey dc_pin */
    dcPin: Pin | EmbedValue<Pin>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /** @yamlKey cs_pin */
    csPin: Pin | EmbedValue<Pin>;
}
interface Ssd1322SpiProps extends _DisplayFullDisplay, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin | EmbedValue<Pin>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin?: Pin | EmbedValue<Pin>;
    /** The model of the display. At present, only one option is available: */
    model: "SSD1322_256X64";
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin | EmbedValue<Pin>;
    brightness?: unknown;
    /** @yamlKey external_vcc */
    externalVcc?: boolean | EmbedValue<boolean>;
}
interface Ssd1325SpiProps extends _DisplayFullDisplay, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin | EmbedValue<Pin>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin on the ESP that the CS line is connected to. The CS lin...
     * @yamlKey cs_pin
     */
    csPin?: Pin | EmbedValue<Pin>;
    /** The model of the display. Options are: */
    model: "SSD1325_128X32" | "SSD1325_128X64" | "SSD1325_96X16" | "SSD1325_64X48" | "SSD1327_128X128";
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin | EmbedValue<Pin>;
    brightness?: unknown;
    /** @yamlKey external_vcc */
    externalVcc?: boolean | EmbedValue<boolean>;
}
interface Ssd1327I2cProps extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the [I²C](/components/i2c) address of the display. Defaults to 0x3D. */
    address?: number;
}
interface Ssd1327SpiProps extends _CoreComponent {
    /** @yamlKey dc_pin */
    dcPin: Pin | EmbedValue<Pin>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /** @yamlKey cs_pin */
    csPin?: Pin | EmbedValue<Pin>;
}
interface Ssd1331SpiProps extends _DisplayFullDisplay, _CoreComponent {
    /** @yamlKey dc_pin */
    dcPin: Pin | EmbedValue<Pin>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /** @yamlKey cs_pin */
    csPin: Pin | EmbedValue<Pin>;
    /** @yamlKey reset_pin */
    resetPin?: Pin | EmbedValue<Pin>;
    brightness?: unknown;
}
interface Ssd1351SpiProps extends _DisplayFullDisplay, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin | EmbedValue<Pin>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin on the ESP that the CS line is connected to.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
    /** The model of the display. Options are: */
    model: "SSD1351_128X96" | "SSD1351_128X128";
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin | EmbedValue<Pin>;
    brightness?: unknown;
}
interface St7567I2cProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [I²C Component](/components/i2c) if you want to ...
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the [I²C](/components/i2c) address of the display. Defaults to 0x3F. */
    address?: number;
}
interface St7567SpiProps extends _CoreComponent {
    /** @yamlKey dc_pin */
    dcPin: Pin | EmbedValue<Pin>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /** @yamlKey cs_pin */
    csPin: Pin | EmbedValue<Pin>;
}
interface St7701sProps extends _DisplayFullDisplay {
    /** Dimensions of the screen, specified either as *width* x *height* (e.g `320x240` ) or with separate config keys. */
    dimensions: St7701sDimensionsProps;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: St7701sTransformProps;
    /**
     * A list of pins used for the databus. Specified in 3 groups.
     * @yamlKey data_pins
     */
    dataPins: St7701sDataPinsProps;
    /**
     * A list of byte arrays: Specifies the init sequence for the display
     * @yamlKey init_sequence
     */
    initSequence?: Array<unknown>;
    /**
     * Should be one of `bgr` (default) or `rgb`.
     * @yamlKey color_order
     */
    colorOrder?: "RGB" | "BGR";
    /**
     * Set the pixel clock speed. Default is 8MHz.
     * @yamlKey pclk_frequency
     */
    pclkFrequency?: unknown;
    /**
     * bool: If the pclk is active negative (default is True)
     * @yamlKey pclk_inverted
     */
    pclkInverted?: boolean | EmbedValue<boolean>;
    /**
     * With this boolean option you can invert the display colors. Note some of the displays have this option set automatica...
     * @yamlKey invert_colors
     */
    invertColors?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DE pin.
     * @yamlKey de_pin
     */
    dePin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The PCLK pin.
     * @yamlKey pclk_pin
     */
    pclkPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The Horizontal sync pin.
     * @yamlKey hsync_pin
     */
    hsyncPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The Vertical sync pin.
     * @yamlKey vsync_pin
     */
    vsyncPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin?: Pin | EmbedValue<Pin>;
    /**
     * int: The horizontal sync pulse width.
     * @yamlKey hsync_pulse_width
     */
    hsyncPulseWidth?: number | EmbedValue<number>;
    /**
     * int: The horizontal back porch length.
     * @yamlKey hsync_back_porch
     */
    hsyncBackPorch?: number | EmbedValue<number>;
    /**
     * int: The horizontal front porch length.
     * @yamlKey hsync_front_porch
     */
    hsyncFrontPorch?: number | EmbedValue<number>;
    /**
     * int: The vertical sync pulse width.
     * @yamlKey vsync_pulse_width
     */
    vsyncPulseWidth?: number | EmbedValue<number>;
    /**
     * int: The vertical back porch length.
     * @yamlKey vsync_back_porch
     */
    vsyncBackPorch?: number | EmbedValue<number>;
    /**
     * int: The vertical front porch length.
     * @yamlKey vsync_front_porch
     */
    vsyncFrontPorch?: number | EmbedValue<number>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /**
     * Set the data rate of the SPI interface to the display. One of `80MHz`, `40MHz`, `20MHz`, `10MHz`, `5MHz`, `2MHz`, `1M...
     * @yamlKey data_rate
     */
    dataRate?: unknown;
    /**
     * Set the mode for the SPI interface to the display. Default is `MODE0` but some displays require `MODE3`.
     * @yamlKey spi_mode
     */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /** @yamlKey cs_pin */
    csPin?: Pin | EmbedValue<Pin>;
}
interface St7735Props extends _DisplayFullDisplay, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin | EmbedValue<Pin>;
    /**
     * int: The device width. 128 is default
     * @yamlKey device_width
     */
    deviceWidth: number | EmbedValue<number>;
    /**
     * int: The device height. 160 is default
     * @yamlKey device_height
     */
    deviceHeight: number | EmbedValue<number>;
    /**
     * int: The starting column offset. Default value depends on model.
     * @yamlKey col_start
     */
    colStart: number | EmbedValue<number>;
    /**
     * int: The starting row offset. Default value depends on model.
     * @yamlKey row_start
     */
    rowStart: number | EmbedValue<number>;
    /**
     * boolean: 8bit mode. Default is false. This saves 50% of the buffer required for the display.
     * @yamlKey eight_bit_color
     */
    eightBitColor?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Use BGR mode. Default is false.
     * @yamlKey use_bgr
     */
    useBgr?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Invert LCD colors. Default is false.
     * @yamlKey invert_colors
     */
    invertColors?: boolean | EmbedValue<boolean>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
    /** string: The model to use, one of the following options: */
    model: "INITR_GREENTAB" | "INITR_REDTAB" | "INITR_BLACKTAB" | "INITR_MINI160X80" | "INITR_18BLACKTAB" | "INITR_18REDTAB";
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin | EmbedValue<Pin>;
}
interface St7789vProps extends _DisplayFullDisplay, _CoreComponent {
    /** string: The display model to use. One of the following options: */
    model: "TTGO_TDISPLAY_135X240" | "ADAFRUIT_FUNHOUSE_240X240" | "ADAFRUIT_RR_280X240" | "ADAFRUIT_S2_TFT_FEATHER_240X135" | "LILYGO_T-EMBED_170X320" | "WAVESHARE_1.47IN_172X320" | "CUSTOM";
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin. Default depends on `model`.
     * @yamlKey reset_pin
     */
    resetPin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DC pin. Default depends on `model`.
     * @yamlKey dc_pin
     */
    dcPin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The display's backlight pin. May be required depending on the h...
     * @yamlKey backlight_pin
     */
    backlightPin?: Pin | EmbedValue<Pin>;
    /**
     * [ID](/guides/configuration-types#id): The [power supply](/components/power_supply/) to connect to this display if req...
     * @yamlKey power_supply
     */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    /** boolean: Limits the supported color depth to eight bits. May be useful on memory-constrained devices. Defaults to `fa... */
    eightbitcolor?: boolean | EmbedValue<boolean>;
    /** int: Sets height of display in pixels. Default depends on `model`. */
    height?: number | EmbedValue<number>;
    /** int: Sets width of display. Default depends on `model`. */
    width?: number | EmbedValue<number>;
    /**
     * int: When `model` is set to "Custom", use this to specify the display's vertical offset in pixels. This option may no...
     * @yamlKey offset_height
     */
    offsetHeight?: number | EmbedValue<number>;
    /**
     * int: When `model` is set to "Custom", use this to specify the display's horizontal offset in pixels. This option may ...
     * @yamlKey offset_width
     */
    offsetWidth?: number | EmbedValue<number>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /**
     * frequency: The SPI data rate (default 20MHz.) Can be reduced if required, e.g. to compensate for long data cables.
     * @yamlKey data_rate
     */
    dataRate?: unknown;
    /**
     * 0-3: The SPI clock mode to use (default: `mode0` .) The ST7789V datasheet specifies mode 0, but some displays appear ...
     * @yamlKey spi_mode
     */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The CS pin. Default depends on `model`.
     * @yamlKey cs_pin
     */
    csPin?: Pin | EmbedValue<Pin>;
}
interface St7920Props extends _DisplayFullDisplay, _CoreComponent {
    /** int: The "width" of a screen. Defaults to 128. */
    width: number | EmbedValue<number>;
    /** int: The "height" of a screen. Defaults to 64; */
    height: number | EmbedValue<number>;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Sometimes also called `RS`. For ST7920 should be inverted.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
}
interface Tm1621Props extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the CS line.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the DATA line.
     * @yamlKey data_pin
     */
    dataPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the READ line.
     * @yamlKey read_pin
     */
    readPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the WRITE line.
     * @yamlKey write_pin
     */
    writePin: Pin | EmbedValue<Pin>;
}
interface WaveshareEpaperProps extends _DisplayFullDisplay, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin | EmbedValue<Pin>;
    /** The model of the E-Paper display. Options are: */
    model: "1.54in" | "1.54inv2" | "1.54inv2-b" | "2.13in" | "2.13inv2" | "2.13in-ttgo" | "2.13in-ttgo-b1" | "2.13in-ttgo-b73" | "2.13in-ttgo-b74" | "2.90in" | "2.90inv2" | "gdew029t5" | "2.70in" | "2.70in-b" | "2.70in-bv2" | "2.70inv2" | "2.90in-b" | "2.90in-bv3" | "gdey029t94" | "2.90inv2-r2" | "2.90in-d" | "2.90in-dke" | "gdey042t81" | "4.20in" | "4.20in-bv2" | "4.20in-bv2-bwr" | "5.65in-f" | "5.83in" | "5.83inv2" | "gdey0583t81" | "7.30in-f" | "7.50in" | "7.50in-bv2" | "7.50in-bv3" | "7.50in-bv3-bwr" | "7.50in-bc" | "7.50inv2" | "7.50inv2alt" | "7.50inv2p" | "7.50in-hd-b" | "2.13in-ttgo-dke" | "2.13inv3" | "1.54in-m5coreink-m09" | "13.3in-k";
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin. Defaults to not connected. Make sure you pull th...
     * @yamlKey reset_pin
     */
    resetPin?: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The BUSY pin. Defaults to not connected.
     * @yamlKey busy_pin
     */
    busyPin?: Pin | EmbedValue<Pin>;
    /**
     * int: E-Paper displays have two modes of switching to the next image: A partial update that only changes the pixels th...
     * @yamlKey full_update_every
     */
    fullUpdateEvery?: number | EmbedValue<number>;
    /**
     * [Time](/guides/configuration-types#time): Duration for the display reset operation. Defaults to `200ms`. Setting this...
     * @yamlKey reset_duration
     */
    resetDuration?: TimePeriod;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [SPI Component](/components/spi) if you want to ...
     * @yamlKey spi_id
     */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean | EmbedValue<boolean>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin: Pin | EmbedValue<Pin>;
}
interface NextionProps extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * boolean: If set to `true`, the Nextion will be configured to wake from sleep when touched.
     * @yamlKey auto_wake_on_touch
     */
    autoWakeOnTouch?: boolean | EmbedValue<boolean>;
    /** percentage: When specified, the display brightness will be set to this value at boot. */
    brightness?: number;
    /**
     * [Time](/guides/configuration-types#time): Sets the minimum time between commands sent to the Nextion display. A highe...
     * @yamlKey command_spacing
     */
    commandSpacing?: TimePeriod;
    /**
     * boolean: Shows device information (model, firmware version, serial number, flash size) in the configuration dump. Whe...
     * @yamlKey dump_device_info
     */
    dumpDeviceInfo?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Request the Nextion exit Active Reparse Mode before setup of the display. Defaults to `false`.
     * @yamlKey exit_reparse_on_start
     */
    exitReparseOnStart?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): Maximum age in milliseconds for queued commands before they are automatical...
     * @yamlKey max_queue_age
     */
    maxQueueAge?: TimePeriod;
    /**
     * integer: Limits the number of commands processed per loop cycle. This helps prevent stack overflows when a large numb...
     * @yamlKey max_commands_per_loop
     */
    maxCommandsPerLoop?: number | EmbedValue<number>;
    /**
     * integer: Sets the maximum number of commands that can be queued at once. When the limit is reached, new commands will...
     * @yamlKey max_queue_size
     */
    maxQueueSize?: number | EmbedValue<number>;
    /**
     * [Action](/automations/actions#all-actions): An action to be performed when the Nextion reports a buffer overflow. See...
     * @yamlKey on_buffer_overflow
     */
    onBufferOverflow?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): An action to be performed after a page change. See [Nextion Automation](h...
     * @yamlKey on_page
     */
    onPage?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): An action to be performed after ESPHome connects to the Nextion. See [Nex...
     * @yamlKey on_setup
     */
    onSetup?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): An action to be performed when the Nextion goes to sleep. See [Nextion Au...
     * @yamlKey on_sleep
     */
    onSleep?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): An action to be performed after a touch event (press or release). See [Ne...
     * @yamlKey on_touch
     */
    onTouch?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): An action to be performed when the Nextion wakes up. See [Nextion Automat...
     * @yamlKey on_wake
     */
    onWake?: TriggerHandler;
    /**
     * boolean: Sets whether the initial display connection handshake process is skipped. When set to `true`, the connection...
     * @yamlKey skip_connection_handshake
     */
    skipConnectionHandshake?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): Time in milliseconds to wait before forcing the display to be marked as rea...
     * @yamlKey startup_override_ms
     */
    startupOverrideMs?: TimePeriod;
    /**
     * int: Sets the page to display when ESPHome connects to the Nextion. (Nextion shows page 0 on start-up by default).
     * @yamlKey start_up_page
     */
    startUpPage?: number | EmbedValue<number>;
    /**
     * int: Number of retries for transient HTTP failures during TFT upload. On Arduino, this applies to the initial connect...
     * @yamlKey tft_upload_http_retries
     */
    tftUploadHttpRetries?: number | EmbedValue<number>;
    /**
     * [Time](/guides/configuration-types#time): HTTP request timeout for TFT upload transfers. Applies to each individual H...
     * @yamlKey tft_upload_http_timeout
     */
    tftUploadHttpTimeout?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): Temporarily adjusts the system watchdog timeout for the duration of the TFT...
     * @yamlKey tft_upload_watchdog_timeout
     */
    tftUploadWatchdogTimeout?: TimePeriod;
    /**
     * string: The URL from which to download the TFT file for display firmware updates (Nextion OTA). See [Nextion Upload](...
     * @yamlKey tft_url
     */
    tftUrl?: string;
    /**
     * int: Sets internal No-touch-then-sleep timer in seconds. Range: 0 (disabled) or 3-65535 seconds (max: ~18 hours). Val...
     * @yamlKey touch_sleep_timeout
     */
    touchSleepTimeout?: number | EmbedValue<number>;
    /**
     * int: Sets the page to display after waking up
     * @yamlKey wake_up_page
     */
    wakeUpPage?: number | EmbedValue<number>;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [UART Bus](/components/uart) you wish to use for this display. Sp...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
interface SdlProps extends _DisplayFullDisplay {
    /**
     * string: Build arguments if required to specify include or library paths. Should not be required if SDL2 is properly i...
     * @yamlKey sdl_options
     */
    sdlOptions?: string;
    dimensions: SdlDimensionsProps;
    /**
     * Options that affect how the display renders on the host system. All default to false, except position, which defaults...
     * @yamlKey window_options
     */
    windowOptions?: SdlWindowOptionsProps;
}
interface Tm1637Props extends _DisplayBasicDisplay, _CoreComponent {
    /** int: The intensity with which the TM1637 should drive the outputs. Range is from 0 (least intense) to 7 (the default). */
    intensity?: number | EmbedValue<number>;
    /** bool: Invert character rendering to the TM1637 so you can physically flip the display around. */
    inverted?: boolean | EmbedValue<boolean>;
    /** int: The amount of digits your TM1637 is driving. Only used when `inverted: true` Range is from 1 to 6 (the default). */
    length?: number | EmbedValue<number>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the CLK line hooked up to.
     * @yamlKey clk_pin
     */
    clkPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the DIO line hooked up to.
     * @yamlKey dio_pin
     */
    dioPin: Pin | EmbedValue<Pin>;
}
interface Tm1638Props extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the CLK line hooked up to.
     * @yamlKey clk_pin
     */
    clkPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the STB line hooked up to.
     * @yamlKey stb_pin
     */
    stbPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin you have the DIO line hooked up to.
     * @yamlKey dio_pin
     */
    dioPin: Pin | EmbedValue<Pin>;
    /** int: The intensity with which the TM1638 should drive the outputs. Range is from 0 (least intense) to 7 (the default)... */
    intensity?: number | EmbedValue<number>;
}
export type DisplayProps = ({
    platform: "addressable_light";
} & AddressableLightProps & ComponentProps<addressable_light_AddressableLightDisplay>) | ({
    platform: "epaper_spi";
} & ComponentProps) | ({
    platform: "hub75";
} & Hub75Props & ComponentProps<_esphome_hub75_HUB75Display>) | ({
    platform: "ili9341";
} & ComponentProps) | ({
    platform: "ili9xxx";
} & Ili9xxxProps & ComponentProps<ili9xxx_ILI9XXXDisplay>) | ({
    platform: "inkplate";
} & InkplateProps & ComponentProps<inkplate_Inkplate>) | ({
    platform: "inkplate6";
} & ComponentProps) | ({
    platform: "lcd_gpio";
} & LcdGpioProps & ComponentProps<lcd_gpio_GPIOLCDDisplay>) | ({
    platform: "lcd_pcf8574";
} & LcdPcf8574Props & ComponentProps<lcd_pcf8574_PCF8574LCDDisplay>) | ({
    platform: "max7219";
} & Max7219Props & ComponentProps<max7219_MAX7219Component>) | ({
    platform: "max7219digit";
} & Max7219digitProps & ComponentProps<max7219digit_MAX7219Component>) | ({
    platform: "mipi_dsi";
} & ComponentProps) | ({
    platform: "mipi_rgb";
} & ComponentProps) | ({
    platform: "mipi_spi";
} & ComponentProps) | ({
    platform: "pcd8544";
} & Pcd8544Props & ComponentProps<pcd8544_PCD8544>) | ({
    platform: "pvvx_mithermometer";
} & PvvxMithermometerProps & ComponentProps<pvvx_mithermometer_PVVXDisplay>) | ({
    platform: "qspi_amoled";
} & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "RM67162";
} & QspiDbiRM67162Props & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "RM690B0";
} & QspiDbiRM690B0Props & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "AXS15231";
} & QspiDbiAXS15231Props & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "JC4832W535";
} & QspiDbiJC4832W535Props & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "JC3636W518";
} & QspiDbiJC3636W518Props & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "CUSTOM";
} & QspiDbiCUSTOMProps & ComponentProps) | ({
    platform: "rpi_dpi_rgb";
} & RpiDpiRgbProps & ComponentProps<rpi_dpi_rgb_RpiDpiRgb>) | ({
    platform: "ssd1306_i2c";
} & Ssd1306I2cProps & ComponentProps<ssd1306_i2c_I2CSSD1306>) | ({
    platform: "ssd1306_spi";
} & Ssd1306SpiProps & ComponentProps<ssd1306_spi_SPISSD1306>) | ({
    platform: "ssd1322_spi";
} & Ssd1322SpiProps & ComponentProps<ssd1322_spi_SPISSD1322>) | ({
    platform: "ssd1325_spi";
} & Ssd1325SpiProps & ComponentProps<ssd1325_spi_SPISSD1325>) | ({
    platform: "ssd1327_i2c";
} & Ssd1327I2cProps & ComponentProps<ssd1327_i2c_I2CSSD1327>) | ({
    platform: "ssd1327_spi";
} & Ssd1327SpiProps & ComponentProps<ssd1327_spi_SPISSD1327>) | ({
    platform: "ssd1331_spi";
} & Ssd1331SpiProps & ComponentProps<ssd1331_spi_SPISSD1331>) | ({
    platform: "ssd1351_spi";
} & Ssd1351SpiProps & ComponentProps<ssd1351_spi_SPISSD1351>) | ({
    platform: "st7567_i2c";
} & St7567I2cProps & ComponentProps<st7567_i2c_I2CST7567>) | ({
    platform: "st7567_spi";
} & St7567SpiProps & ComponentProps<st7567_spi_SPIST7567>) | ({
    platform: "st7701s";
} & St7701sProps & ComponentProps<st7701s_ST7701S>) | ({
    platform: "st7735";
} & St7735Props & ComponentProps<st7735_ST7735>) | ({
    platform: "st7789v";
} & St7789vProps & ComponentProps<st7789v_ST7789V>) | ({
    platform: "st7920";
} & St7920Props & ComponentProps<st7920_ST7920>) | ({
    platform: "tm1621";
} & Tm1621Props & ComponentProps<tm1621_TM1621Display>) | ({
    platform: "waveshare_epaper";
} & WaveshareEpaperProps & ComponentProps<waveshare_epaper_WaveshareEPaperBase>) | ({
    platform: "nextion";
} & NextionProps & ComponentProps<nextion_Nextion>) | ({
    platform: "sdl";
} & SdlProps & ComponentProps<sdl_Sdl>) | ({
    platform: "tm1637";
} & Tm1637Props & ComponentProps<tm1637_TM1637Display>) | ({
    platform: "tm1638";
} & Tm1638Props & ComponentProps<tm1638_TM1638Component>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            display: DisplayProps;
        }
    }
}
