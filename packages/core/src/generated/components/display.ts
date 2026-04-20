// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _BleClient, _CoreComponent, _DisplayBasicDisplay, _DisplayFullDisplay, _QspiDbiDisplayBase } from "../bases";
import type { __marker_addressable_light_AddressableLightDisplay, __marker_esphome_hub75_HUB75Display, __marker_i2c_I2CBus, __marker_ili9xxx_ILI9XXXDisplay, __marker_inkplate_Inkplate, __marker_lcd_gpio_GPIOLCDDisplay, __marker_lcd_pcf8574_PCF8574LCDDisplay, __marker_light_AddressableLightState, __marker_max7219_MAX7219Component, __marker_max7219digit_MAX7219Component, __marker_nextion_Nextion, __marker_pcd8544_PCD8544, __marker_power_supply_PowerSupply, __marker_pvvx_mithermometer_PVVXDisplay, __marker_rpi_dpi_rgb_RpiDpiRgb, __marker_sdl_Sdl, __marker_spi_SPIComponent, __marker_ssd1306_i2c_I2CSSD1306, __marker_ssd1306_spi_SPISSD1306, __marker_ssd1322_spi_SPISSD1322, __marker_ssd1325_spi_SPISSD1325, __marker_ssd1327_i2c_I2CSSD1327, __marker_ssd1327_spi_SPISSD1327, __marker_ssd1331_spi_SPISSD1331, __marker_ssd1351_spi_SPISSD1351, __marker_st7567_i2c_I2CST7567, __marker_st7567_spi_SPIST7567, __marker_st7701s_ST7701S, __marker_st7735_ST7735, __marker_st7789v_ST7789V, __marker_st7920_ST7920, __marker_time_RealTimeClock, __marker_tm1621_TM1621Display, __marker_tm1637_TM1637Display, __marker_tm1638_TM1638Component, __marker_uart_UARTComponent, __marker_waveshare_epaper_WaveshareEPaperBase } from "../markers";
interface Ili9xxxDimensionsProps {
    /** int: Specifies height of display in pixels. */
    height: number;
    /**
     * int: Specify an offset for the y-direction of the display. Default is 0.
     * @yamlKey offset_height
     */
    offsetHeight?: number;
    /**
     * int: Specify an offset for the x-direction of the display, typically used when an LCD is smaller than the maximum sup...
     * @yamlKey offset_width
     */
    offsetWidth?: number;
    /** int: Specifies width of display. */
    width: number;
}
interface Ili9xxxTransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean;
    /**
     * boolean: If true, exchange the x and y axes.
     * @yamlKey swap_xy
     */
    swapXy?: boolean;
}
interface InkplateTransformProps {
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
}
interface QspiDbiAXS15231TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean;
}
interface QspiDbiCUSTOMTransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean;
    /**
     * boolean: If true, exchange the x and y axes. Not available for some chips
     * @yamlKey swap_xy
     */
    swapXy?: boolean;
}
interface QspiDbiJC3636W518TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean;
    /**
     * boolean: If true, exchange the x and y axes. Not available for some chips
     * @yamlKey swap_xy
     */
    swapXy?: boolean;
}
interface QspiDbiJC4832W535TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean;
}
interface QspiDbiRM67162TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean;
    /**
     * boolean: If true, exchange the x and y axes. Not available for some chips
     * @yamlKey swap_xy
     */
    swapXy?: boolean;
}
interface QspiDbiRM690B0TransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean;
    /**
     * boolean: If true, exchange the x and y axes. Not available for some chips
     * @yamlKey swap_xy
     */
    swapXy?: boolean;
}
interface RpiDpiRgbDataPinsProps {
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Exactly 5 pin numbers for the blue databits, ... */
    blue: unknown;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Exactly 6 pin numbers for the green databits,... */
    green: unknown;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Exactly 5 pin numbers for the red databits, l... */
    red: unknown;
}
interface RpiDpiRgbDimensionsProps {
    /** int: Specifies height of display in pixels. */
    height: number;
    /**
     * int: Specify an offset for the y-direction of the display. Default is 0.
     * @yamlKey offset_height
     */
    offsetHeight?: number;
    /**
     * int: Specify an offset for the x-direction of the display, typically used when an LCD is smaller than the maximum sup...
     * @yamlKey offset_width
     */
    offsetWidth?: number;
    /** int: Specifies width of display. */
    width: number;
}
interface SdlDimensionsProps {
    height: number;
    width: number;
}
interface SdlWindowOptionsPropsPositionProps {
    x: number;
    y: number;
}
interface SdlWindowOptionsProps {
    /**
     * boolean: Whether to always draw the display window above other windows or not
     * @yamlKey always_on_top
     */
    alwaysOnTop?: boolean;
    /** boolean: Whether to draw the display window with or without borders */
    borderless?: boolean;
    /** boolean: Whether to draw the display window in fullscreen or not. This may resize the resolution of the host display ... */
    fullscreen?: boolean;
    position?: SdlWindowOptionsPropsPositionProps;
    /** boolean: Whether the display window can be manually resized */
    resizable?: boolean;
    /**
     * boolean: Whether to skip adding a taskbar icon for the display window or not
     * @yamlKey skip_taskbar
     */
    skipTaskbar?: boolean;
}
interface St7701sDataPinsProps {
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Exactly 5 pin numbers for the blue databits, ... */
    blue: unknown;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Exactly 6 pin numbers for the green databits,... */
    green: unknown;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Exactly 5 pin numbers for the red databits, l... */
    red: unknown;
}
interface St7701sDimensionsProps {
    /** int: Specifies height of display in pixels. */
    height: number;
    /**
     * int: Specify an offset for the y-direction of the display. Default is 0.
     * @yamlKey offset_height
     */
    offsetHeight?: number;
    /**
     * int: Specify an offset for the x-direction of the display, typically used when an LCD is smaller than the maximum sup...
     * @yamlKey offset_width
     */
    offsetWidth?: number;
    /** int: Specifies width of display. */
    width: number;
}
interface St7701sTransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean;
}
interface AddressableLightProps extends _DisplayFullDisplay {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the addressable light component to use as a display.
     * @yamlKey addressable_light_id
     */
    addressableLightId: RefProp<__marker_light_AddressableLightState>;
    /** int: The height of the LED matrix in pixels. */
    height: number;
    /**
     * [lambda](https://esphome.io/automations/templates#config-lambda): A lambda that returns the integer address of the LE...
     * @yamlKey pixel_mapper
     */
    pixelMapper?: unknown;
    /** int: The width of the LED matrix in pixels. */
    width: number;
}
interface Hub75Props extends _DisplayFullDisplay {
    /**
     * Row address bit 0.
     * @yamlKey a_pin
     */
    aPin?: Pin;
    /**
     * Row address bit 1.
     * @yamlKey b_pin
     */
    bPin?: Pin;
    /**
     * Blue data pin for top half.
     * @yamlKey b1_pin
     */
    b1Pin?: Pin;
    /**
     * Blue data pin for bottom half.
     * @yamlKey b2_pin
     */
    b2Pin?: Pin;
    /**
     * int: Color bit depth (4-12). Higher values = better color accuracy but slower refresh. Defaults to `8`.
     * @yamlKey bit_depth
     */
    bitDepth?: number;
    /** string: Board preset name. One of: `adafruit-matrix-portal-s3`, `apollo-automation-m1-rev4`, `apollo-automation-m1-re... */
    board?: "adafruit-matrix-portal-s3" | "apollo-automation-m1-rev4" | "apollo-automation-m1-rev6" | "esp32-trinity" | "huidu-hd-wf1" | "huidu-hd-wf2";
    /** int: Initial brightness level (0-255). Defaults to `128`. */
    brightness?: number;
    /**
     * Row address bit 2.
     * @yamlKey c_pin
     */
    cPin?: Pin;
    /**
     * Clock pin.
     * @yamlKey clk_pin
     */
    clkPin?: Pin;
    /**
     * boolean: Invert clock phase. Defaults to `false`. Required to be `true` for MBI5124 driver.
     * @yamlKey clock_phase
     */
    clockPhase?: boolean;
    /**
     * enum: Output clock speed. Defaults to `20MHZ`. One of:
     * @yamlKey clock_speed
     */
    clockSpeed?: "10MHZ" | "16MHZ" | "20MHZ" | "8MHZ";
    /**
     * Row address bit 3.
     * @yamlKey d_pin
     */
    dPin?: Pin;
    /**
     * boolean: Enable double buffering to prevent tearing. Defaults to `false`. Set to `false` when using LVGL.
     * @yamlKey double_buffer
     */
    doubleBuffer?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Row address bit 4. Required for 1/32 scan pan...
     * @yamlKey e_pin
     */
    ePin?: Pin;
    /**
     * Green data pin for top half.
     * @yamlKey g1_pin
     */
    g1Pin?: Pin;
    /**
     * Green data pin for bottom half.
     * @yamlKey g2_pin
     */
    g2Pin?: Pin;
    /**
     * enum: Gamma correction mode. One of:
     * @yamlKey gamma_correct
     */
    gammaCorrect?: "CIE1931" | "GAMMA_2_2" | "LINEAR";
    /**
     * Latch/strobe pin.
     * @yamlKey lat_pin
     */
    latPin?: Pin;
    /**
     * int: Number of clock cycles OE is blanked during LAT pulse. Defaults to `1`.
     * @yamlKey latch_blanking
     */
    latchBlanking?: number;
    /** enum: Physical panel chaining pattern. Defaults to `HORIZONTAL`. One of: */
    layout?: "BOTTOM_LEFT_UP" | "BOTTOM_LEFT_UP_ZIGZAG" | "BOTTOM_RIGHT_UP" | "BOTTOM_RIGHT_UP_ZIGZAG" | "HORIZONTAL" | "TOP_LEFT_DOWN" | "TOP_LEFT_DOWN_ZIGZAG" | "TOP_RIGHT_DOWN" | "TOP_RIGHT_DOWN_ZIGZAG";
    /**
     * int: Number of panels arranged horizontally. Defaults to `1`.
     * @yamlKey layout_cols
     */
    layoutCols?: number;
    /**
     * int: Number of panels arranged vertically. Defaults to `1`.
     * @yamlKey layout_rows
     */
    layoutRows?: number;
    /**
     * int: Minimum panel refresh rate in Hz (40-200). The panel may refresh faster than this, but won't go slower. Auto-cal...
     * @yamlKey min_refresh_rate
     */
    minRefreshRate?: number;
    /**
     * Output enable pin.
     * @yamlKey oe_pin
     */
    oePin?: Pin;
    /**
     * int: Height of a single panel in pixels (e.g., `32`).
     * @yamlKey panel_height
     */
    panelHeight: number;
    /**
     * int: Width of a single panel in pixels (e.g., `64`).
     * @yamlKey panel_width
     */
    panelWidth: number;
    /**
     * Red data pin for top half.
     * @yamlKey r1_pin
     */
    r1Pin?: Pin;
    /**
     * Red data pin for bottom half.
     * @yamlKey r2_pin
     */
    r2Pin?: Pin;
    /**
     * enum: Panel scan wiring pattern. Defaults to `STANDARD_TWO_SCAN`. One of:
     * @yamlKey scan_wiring
     */
    scanWiring?: unknown;
    /**
     * enum: LED shift register driver chip type. Defaults to `GENERIC`. One of:
     * @yamlKey shift_driver
     */
    shiftDriver?: "DP3246" | "FM6124" | "FM6126A" | "GENERIC" | "ICN2038S" | "MBI5124";
}
interface Ili9xxxProps extends _DisplayFullDisplay, _CoreComponent {
    /**
     * Should be one of `bgr` (default) or `rgb`.
     * @yamlKey color_order
     */
    colorOrder?: "BGR" | "RGB";
    /**
     * When using 8 bit colors, this controls the type of color palette that will be used in the ESP's internal 8-bits-per-p...
     * @yamlKey color_palette
     */
    colorPalette?: "8BIT" | "GRAYSCALE" | "IMAGE_ADAPTIVE" | "NONE";
    /**
     * A list of image files that will be used to generate the color palette for the display. This should only be used in co...
     * @yamlKey color_palette_images
     */
    colorPaletteImages?: Array<unknown>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin?: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin;
    /** Dimensions of the screen, specified either as *width* x *height* (e.g `320x240` ) or with separate config keys. If no... */
    dimensions?: Ili9xxxDimensionsProps;
    /**
     * Allows custom initialisation sequences to be added. See below for more information.
     * @yamlKey init_sequence
     */
    initSequence?: Array<unknown>;
    /**
     * Specifies whether the display colors should be inverted. Options are `true` or `false` - if you are unsure, use `fals...
     * @yamlKey invert_colors
     */
    invertColors: boolean;
    /** The model of the display. Options are: */
    model: "CUSTOM" | "GC9A01A" | "GC9D01N" | "ILI9341" | "ILI9342" | "ILI9481" | "ILI9481-18" | "ILI9486" | "ILI9488" | "ILI9488_A" | "M5CORE" | "M5STACK" | "S3BOX" | "S3BOX_LITE" | "ST7735" | "ST7789V" | "ST7796" | "TFT_2.4" | "TFT_2.4R" | "WAVESHARE_RES_3_5";
    /**
     * Allows forcing the display into 18 or 16 bit mode. Options are `18bit` or `16bit`. If unspecified, the pixel mode wil...
     * @yamlKey pixel_mode
     */
    pixelMode?: "16bit" | "18bit";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: Ili9xxxTransformProps;
}
interface InkplateProps extends _DisplayFullDisplay, _CoreComponent {
    address?: number;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The CKV pin for the Inkplate display.
     * @yamlKey ckv_pin
     */
    ckvPin: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The CL pin for the Inkplate display. Defaults to GPIO0.
     * @yamlKey cl_pin
     */
    clPin?: Pin;
    /**
     * int: Sets a custom predefined waveform for the display. Accepts values from 1 to 4. Useful if the greyscale of the im...
     * @yamlKey custom_waveform
     */
    customWaveform?: number;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The Data 0 pin for the Inkplate display. Defaults to GPIO4.
     * @yamlKey display_data_0_pin
     */
    displayData0Pin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The Data 1 pin for the Inkplate display. Defaults to GPIO5.
     * @yamlKey display_data_1_pin
     */
    displayData1Pin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The Data 2 pin for the Inkplate display. Defaults to GPIO18.
     * @yamlKey display_data_2_pin
     */
    displayData2Pin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The Data 3 pin for the Inkplate display. Defaults to GPIO19.
     * @yamlKey display_data_3_pin
     */
    displayData3Pin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The Data 4 pin for the Inkplate display. Defaults to GPIO23.
     * @yamlKey display_data_4_pin
     */
    displayData4Pin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The Data 5 pin for the Inkplate display. Defaults to GPIO25.
     * @yamlKey display_data_5_pin
     */
    displayData5Pin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The Data 6 pin for the Inkplate display. Defaults to GPIO26.
     * @yamlKey display_data_6_pin
     */
    displayData6Pin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The Data 7 pin for the Inkplate display. Defaults to GPIO27.
     * @yamlKey display_data_7_pin
     */
    displayData7Pin?: Pin;
    /**
     * int: When partial updating is enabled, forces a full screen update after chosen number of updates. Defaults to `10`
     * @yamlKey full_update_every
     */
    fullUpdateEvery?: number;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The GMOD pin for the Inkplate display.
     * @yamlKey gmod_pin
     */
    gmodPin: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The GPIO0 Enable pin for the Inkplate display.
     * @yamlKey gpio0_enable_pin
     */
    gpio0EnablePin: Pin;
    /** boolean: Makes the screen display 3 bit colors. Defaults to `false` */
    greyscale?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The LE pin for the Inkplate display. Defaults to GPIO2.
     * @yamlKey le_pin
     */
    lePin?: Pin;
    /** enum: Specify the model. Defaults to `inkplate_6`. */
    model?: "inkplate_10" | "inkplate_5" | "inkplate_5_v2" | "inkplate_6" | "inkplate_6_plus" | "inkplate_6_v2";
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The OE pin for the Inkplate display.
     * @yamlKey oe_pin
     */
    oePin: Pin;
    /**
     * boolean: Makes the screen update partially, which is faster, but leaves burnin. Defaults to `false`
     * @yamlKey partial_updating
     */
    partialUpdating?: boolean;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The Powerup pin for the Inkplate display.
     * @yamlKey powerup_pin
     */
    powerupPin: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The SPH pin for the Inkplate display.
     * @yamlKey sph_pin
     */
    sphPin: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The SPV pin for the Inkplate display.
     * @yamlKey spv_pin
     */
    spvPin: Pin;
    /** Transform the display presentation. */
    transform?: InkplateTransformProps;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The VCOM pin for the Inkplate display.
     * @yamlKey vcom_pin
     */
    vcomPin: Pin;
    /** @yamlKey wakeup_pin */
    wakeupPin: Pin;
}
interface LcdGpioProps {
    /**
     * list of [pins](https://esphome.io/guides/configuration-types#pin-schema): A list of the data pins you have hooked up ...
     * @yamlKey data_pins
     */
    dataPins: unknown;
    /** string: The dimensions of the display with `COLUMNSxROWS`. If you're not sure, power the display on, turn contrast hi... */
    dimensions: string;
    /**
     * [pin](https://esphome.io/guides/configuration-types#pin-schema): The pin you have `E` (`06` ) hooked up to.
     * @yamlKey enable_pin
     */
    enablePin: Pin;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): The lambda to use for rendering the content on the ... */
    lambda?: unknown;
    /**
     * [pin](https://esphome.io/guides/configuration-types#pin-schema): The pin you have `RS` (`04` ) hooked up to.
     * @yamlKey rs_pin
     */
    rsPin: Pin;
    /**
     * [pin](https://esphome.io/guides/configuration-types#pin-schema): Optionally set the pin you have `R/W` (`05` ) hooked...
     * @yamlKey rw_pin
     */
    rwPin?: Pin;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to re-draw the screen. Defaults to `1s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface LcdPcf8574Props {
    /** int: The [I²C](https://esphome.io/components/i2c) address of the PCF8574 chip, defaults to `0x3F`. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): The lambda to use for rendering the content on the ... */
    lambda?: unknown;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to re-draw the screen. Defaults to `1s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface Max7219Props extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the CS line hooked up to.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** int: The intensity with which the MAX7219 should drive the outputs. Range is from 0 (least intense) to 15 (the default). */
    intensity?: number;
    /**
     * int: The number of chips you wish to use for daisy chaining. Defaults to `1`.
     * @yamlKey num_chips
     */
    numChips?: number;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * boolean: For some displays the order of the chips is reversed so you'll see "56781234" instead of "12345678". This op...
     * @yamlKey reverse_enable
     */
    reverseEnable?: boolean;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [SPI Component](https://esphom...
     * @yamlKey spi_id
     */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface Max7219digitProps extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * How are the lines in Multiline Mode connected? Possible values are `zigzag` and `snake`. Defaults to `snake`
     * @yamlKey chip_lines_style
     */
    chipLinesStyle?: "SNAKE" | "ZIGZAG";
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the CS line hooked up to.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * boolean: Flip the horizontal axis on the screen. Defaults to `false`.
     * @yamlKey flip_x
     */
    flipX?: boolean;
    /** int: The intensity with which the MAX7219 should drive the outputs. Range is from `0`, least intense to `15` the brig... */
    intensity?: number;
    /**
     * int: Number of lines if you want to use the displays in Multiline Mode. Defaults to `1` Example: [https://github.com/...
     * @yamlKey num_chip_lines
     */
    numChipLines?: number;
    /**
     * int: The number of chips you wish to use for daisy chaining. Defaults to `4`.
     * @yamlKey num_chips
     */
    numChips?: number;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * boolean: For some displays the order of the displays is reversed ("DCBA"). This option will reverse the display to ("...
     * @yamlKey reverse_enable
     */
    reverseEnable?: boolean;
    /**
     * Rotates every 8x8 chip. Valid values are `0`, `90`, `180` and `270`. Defaults to `0`.
     * @yamlKey rotate_chip
     */
    rotateChip?: "0" | "180" | "270" | "90";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Set delay time before scroll starts. Defaults to `1s`.
     * @yamlKey scroll_delay
     */
    scrollDelay?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Sets the wait time at the end of the scroll before starti...
     * @yamlKey scroll_dwell
     */
    scrollDwell?: TimePeriod;
    /**
     * boolean: Turn scroll mode on when content does not fit. Defaults to `true`.
     * @yamlKey scroll_enable
     */
    scrollEnable?: boolean;
    /**
     * Set the scroll mode. One of `CONTINUOUS` or `STOP`. Defaults to `CONTINUOUS`
     * @yamlKey scroll_mode
     */
    scrollMode?: "CONTINUOUS" | "STOP";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Set scroll speed. Defaults to `250ms`
     * @yamlKey scroll_speed
     */
    scrollSpeed?: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [SPI Component](https://esphom...
     * @yamlKey spi_id
     */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface NextionProps extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * boolean: If set to `true`, the Nextion will be configured to wake from sleep when touched.
     * @yamlKey auto_wake_on_touch
     */
    autoWakeOnTouch?: boolean;
    /** percentage: When specified, the display brightness will be set to this value at boot. */
    brightness?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Sets the minimum time between commands sent to the Nextio...
     * @yamlKey command_spacing
     */
    commandSpacing?: TimePeriod;
    /**
     * boolean: Shows device information (model, firmware version, serial number, flash size) in the configuration dump. Whe...
     * @yamlKey dump_device_info
     */
    dumpDeviceInfo?: boolean;
    /**
     * boolean: Request the Nextion exit Active Reparse Mode before setup of the display. Defaults to `false`.
     * @yamlKey exit_reparse_on_start
     */
    exitReparseOnStart?: boolean;
    /**
     * integer: Limits the number of commands processed per loop cycle. This helps prevent stack overflows when a large numb...
     * @yamlKey max_commands_per_loop
     */
    maxCommandsPerLoop?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Maximum age in milliseconds for queued commands before th...
     * @yamlKey max_queue_age
     */
    maxQueueAge?: TimePeriod;
    /**
     * integer: Sets the maximum number of commands that can be queued at once. When the limit is reached, new commands will...
     * @yamlKey max_queue_size
     */
    maxQueueSize?: number;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An action to be performed when the Nextion reports a bu...
     * @yamlKey on_buffer_overflow
     */
    onBufferOverflow?: TriggerHandler;
    /** @yamlKey on_custom_binary_sensor */
    onCustomBinarySensor?: TriggerHandler;
    /** @yamlKey on_custom_sensor */
    onCustomSensor?: TriggerHandler;
    /** @yamlKey on_custom_switch */
    onCustomSwitch?: TriggerHandler;
    /** @yamlKey on_custom_text_sensor */
    onCustomTextSensor?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An action to be performed after a page change. See [Nex...
     * @yamlKey on_page
     */
    onPage?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An action to be performed after ESPHome connects to the...
     * @yamlKey on_setup
     */
    onSetup?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An action to be performed when the Nextion goes to slee...
     * @yamlKey on_sleep
     */
    onSleep?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An action to be performed after a touch event (press or...
     * @yamlKey on_touch
     */
    onTouch?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An action to be performed when the Nextion wakes up. Se...
     * @yamlKey on_wake
     */
    onWake?: TriggerHandler;
    /**
     * boolean: Sets whether the initial display connection handshake process is skipped. When set to `true`, the connection...
     * @yamlKey skip_connection_handshake
     */
    skipConnectionHandshake?: boolean;
    /**
     * int: Sets the page to display when ESPHome connects to the Nextion. (Nextion shows page 0 on start-up by default).
     * @yamlKey start_up_page
     */
    startUpPage?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Time in milliseconds to wait before forcing the display t...
     * @yamlKey startup_override_ms
     */
    startupOverrideMs?: TimePeriod;
    /**
     * int: Number of retries for transient HTTP failures during TFT upload. On Arduino, this applies to the initial connect...
     * @yamlKey tft_upload_http_retries
     */
    tftUploadHttpRetries?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): HTTP request timeout for TFT upload transfers. Applies to...
     * @yamlKey tft_upload_http_timeout
     */
    tftUploadHttpTimeout?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Temporarily adjusts the system watchdog timeout for the d...
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
    touchSleepTimeout?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [UART Bus](https://esphome.io/components/uart) ...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /**
     * int: Sets the page to display after waking up
     * @yamlKey wake_up_page
     */
    wakeUpPage?: number;
}
interface Pcd8544Props extends _DisplayFullDisplay, _CoreComponent {
    /** int: Set screen contrast (0-255). Defaults to `0x7f`. */
    contrast?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin: Pin;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface PvvxMithermometerProps extends _DisplayBasicDisplay, _BleClient, _CoreComponent {
    /**
     * boolean: Whether to automatically clear the display data before each lambda call, or to keep the existing display con...
     * @yamlKey auto_clear_enabled
     */
    autoClearEnabled?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time the BLE connection is maintained befor...
     * @yamlKey disconnect_delay
     */
    disconnectDelay?: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): ID of a [Time](https://esphome.io/components/time/). If set, ...
     * @yamlKey time_id
     */
    timeId?: RefProp<__marker_time_RealTimeClock>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time periode for which the pvvx device should display...
     * @yamlKey validity_period
     */
    validityPeriod?: TimePeriod;
}
interface QspiDbiAXS15231Props extends _QspiDbiDisplayBase {
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "BGR" | "RGB";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiAXS15231TransformProps;
}
interface QspiDbiCUSTOMProps extends _QspiDbiDisplayBase {
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "BGR" | "RGB";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiCUSTOMTransformProps;
}
interface QspiDbiJC3636W518Props extends _QspiDbiDisplayBase {
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "BGR" | "RGB";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiJC3636W518TransformProps;
}
interface QspiDbiJC4832W535Props extends _QspiDbiDisplayBase {
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "BGR" | "RGB";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiJC4832W535TransformProps;
}
interface QspiDbiRM67162Props extends _QspiDbiDisplayBase {
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "BGR" | "RGB";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiRM67162TransformProps;
}
interface QspiDbiRM690B0Props extends _QspiDbiDisplayBase {
    /**
     * Should be one of `rgb` (default) or `bgr`.
     * @yamlKey color_order
     */
    colorOrder?: "BGR" | "RGB";
    /**
     * int: Caters for display chips that require partial drawing to be aligned to certain boundaries. Default is 2, must be...
     * @yamlKey draw_rounding
     */
    drawRounding?: number;
    /**
     * boolean: With this boolean option you can invert the display colors.
     * @yamlKey invert_colors
     */
    invertColors?: boolean;
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: QspiDbiRM690B0TransformProps;
}
interface RpiDpiRgbProps extends _DisplayFullDisplay {
    /**
     * Should be one of `bgr` (default) or `rgb`.
     * @yamlKey color_order
     */
    colorOrder?: "BGR" | "RGB";
    /**
     * A list of pins used for the databus. Specified in 3 groups:
     * @yamlKey data_pins
     */
    dataPins: RpiDpiRgbDataPinsProps;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DE pin
     * @yamlKey de_pin
     */
    dePin: Pin;
    /** Dimensions of the screen, specified either as *width* x *height* (e.g `320x240` ) or with separate config keys. */
    dimensions: RpiDpiRgbDimensionsProps;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The ENABLE pin.
     * @yamlKey enable_pin
     */
    enablePin?: Pin;
    /**
     * int: The horizontal back porch length.
     * @yamlKey hsync_back_porch
     */
    hsyncBackPorch?: number;
    /**
     * int: The horizontal front porch length.
     * @yamlKey hsync_front_porch
     */
    hsyncFrontPorch?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The Horizontal sync pin.
     * @yamlKey hsync_pin
     */
    hsyncPin: Pin;
    /**
     * int: The horizontal sync pulse width.
     * @yamlKey hsync_pulse_width
     */
    hsyncPulseWidth?: number;
    /**
     * With this boolean option you can invert the display colors. Note some of the displays have this option set automatica...
     * @yamlKey invert_colors
     */
    invertColors?: boolean;
    /**
     * Set the pixel clock speed. Default is 16MHz.
     * @yamlKey pclk_frequency
     */
    pclkFrequency?: unknown;
    /**
     * bool: If the pclk is active negative (default is True)
     * @yamlKey pclk_inverted
     */
    pclkInverted?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The PCLK pin.
     * @yamlKey pclk_pin
     */
    pclkPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * int: The vertical back porch length.
     * @yamlKey vsync_back_porch
     */
    vsyncBackPorch?: number;
    /**
     * int: The vertical front porch length.
     * @yamlKey vsync_front_porch
     */
    vsyncFrontPorch?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The Vertical sync pin.
     * @yamlKey vsync_pin
     */
    vsyncPin: Pin;
    /**
     * int: The vertical sync pulse width.
     * @yamlKey vsync_pulse_width
     */
    vsyncPulseWidth?: number;
}
interface SdlProps extends _DisplayFullDisplay {
    dimensions: SdlDimensionsProps;
    /**
     * string: Build arguments if required to specify include or library paths. Should not be required if SDL2 is properly i...
     * @yamlKey sdl_options
     */
    sdlOptions?: string;
    /**
     * Options that affect how the display renders on the host system. All default to false, except position, which defaults...
     * @yamlKey window_options
     */
    windowOptions?: SdlWindowOptionsProps;
}
interface Ssd1306I2cProps extends _CoreComponent {
    /** int: Manually specify the [I²C](https://esphome.io/components/i2c) address of the display. Defaults to 0x3C. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): The lambda to use for rendering the content on the ... */
    lambda?: unknown;
    /** list: Show pages instead of a single lambda. See [Display Pages](https://esphome.io/components/display#display-pages). */
    pages?: unknown;
    /** Set the rotation of the display. Everything you draw in `lambda:` will be rotated by this option. One of `0°` (defaul... */
    rotation?: unknown;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to re-draw the screen. Defaults to `1s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface Ssd1306SpiProps extends _CoreComponent {
    /** @yamlKey cs_pin */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey dc_pin */
    dcPin: Pin;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface Ssd1322SpiProps extends _DisplayFullDisplay, _CoreComponent {
    brightness?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin?: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin;
    /** @yamlKey external_vcc */
    externalVcc?: boolean;
    /** The model of the display. At present, only one option is available: */
    model: "SSD1322_256X64";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface Ssd1325SpiProps extends _DisplayFullDisplay, _CoreComponent {
    brightness?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin on the ESP that the CS line is connec...
     * @yamlKey cs_pin
     */
    csPin?: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin;
    /** @yamlKey external_vcc */
    externalVcc?: boolean;
    /** The model of the display. Options are: */
    model: "SSD1325_128X32" | "SSD1325_128X64" | "SSD1325_64X48" | "SSD1325_96X16" | "SSD1327_128X128";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface Ssd1327I2cProps extends _CoreComponent {
    /** int: Manually specify the [I²C](https://esphome.io/components/i2c) address of the display. Defaults to 0x3D. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): The lambda to use for rendering the content on the ... */
    lambda?: unknown;
    /** list: Show pages instead of a single lambda. See [Display Pages](https://esphome.io/components/display#display-pages). */
    pages?: unknown;
    /** Set the rotation of the display. Everything you draw in `lambda:` will be rotated by this option. One of `0°` (defaul... */
    rotation?: unknown;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to re-draw the screen. Defaults to `5s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface Ssd1327SpiProps extends _CoreComponent {
    /** @yamlKey cs_pin */
    csPin?: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey dc_pin */
    dcPin: Pin;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface Ssd1331SpiProps extends _DisplayFullDisplay, _CoreComponent {
    brightness?: unknown;
    /** @yamlKey cs_pin */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey dc_pin */
    dcPin: Pin;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey reset_pin */
    resetPin?: Pin;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface Ssd1351SpiProps extends _DisplayFullDisplay, _CoreComponent {
    brightness?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin on the ESP that the CS line is connec...
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin;
    /** The model of the display. Options are: */
    model: "SSD1351_128X128" | "SSD1351_128X96";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface St7567I2cProps extends _CoreComponent {
    /** int: Manually specify the [I²C](https://esphome.io/components/i2c) address of the display. Defaults to 0x3F. */
    address?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [I²C Component](https://esphom...
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): The lambda to use for rendering the content on the ... */
    lambda?: unknown;
    /** list: Show pages instead of a single lambda. See [Display Pages](https://esphome.io/components/display#display-pages). */
    pages?: unknown;
    /** Set the rotation of the display. Everything you draw in `lambda:` will be rotated by this option. One of `0°` (defaul... */
    rotation?: unknown;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to re-draw the screen. Defaults to `1s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface St7567SpiProps extends _CoreComponent {
    /** @yamlKey cs_pin */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey dc_pin */
    dcPin: Pin;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface St7701sProps extends _DisplayFullDisplay {
    /**
     * Should be one of `bgr` (default) or `rgb`.
     * @yamlKey color_order
     */
    colorOrder?: "BGR" | "RGB";
    /** @yamlKey cs_pin */
    csPin?: Pin;
    /**
     * A list of pins used for the databus. Specified in 3 groups.
     * @yamlKey data_pins
     */
    dataPins: St7701sDataPinsProps;
    /**
     * Set the data rate of the SPI interface to the display. One of `80MHz`, `40MHz`, `20MHz`, `10MHz`, `5MHz`, `2MHz`, `1M...
     * @yamlKey data_rate
     */
    dataRate?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin?: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DE pin.
     * @yamlKey de_pin
     */
    dePin: Pin;
    /** Dimensions of the screen, specified either as *width* x *height* (e.g `320x240` ) or with separate config keys. */
    dimensions: St7701sDimensionsProps;
    /**
     * int: The horizontal back porch length.
     * @yamlKey hsync_back_porch
     */
    hsyncBackPorch?: number;
    /**
     * int: The horizontal front porch length.
     * @yamlKey hsync_front_porch
     */
    hsyncFrontPorch?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The Horizontal sync pin.
     * @yamlKey hsync_pin
     */
    hsyncPin: Pin;
    /**
     * int: The horizontal sync pulse width.
     * @yamlKey hsync_pulse_width
     */
    hsyncPulseWidth?: number;
    /**
     * A list of byte arrays: Specifies the init sequence for the display
     * @yamlKey init_sequence
     */
    initSequence?: Array<unknown>;
    /**
     * With this boolean option you can invert the display colors. Note some of the displays have this option set automatica...
     * @yamlKey invert_colors
     */
    invertColors?: boolean;
    /**
     * Set the pixel clock speed. Default is 8MHz.
     * @yamlKey pclk_frequency
     */
    pclkFrequency?: unknown;
    /**
     * bool: If the pclk is active negative (default is True)
     * @yamlKey pclk_inverted
     */
    pclkInverted?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The PCLK pin.
     * @yamlKey pclk_pin
     */
    pclkPin: Pin;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /**
     * Set the mode for the SPI interface to the display. Default is `MODE0` but some displays require `MODE3`.
     * @yamlKey spi_mode
     */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** Transform the display presentation using hardware. All defaults are `false`. This option cannot be used with `rotation`. */
    transform?: St7701sTransformProps;
    /**
     * int: The vertical back porch length.
     * @yamlKey vsync_back_porch
     */
    vsyncBackPorch?: number;
    /**
     * int: The vertical front porch length.
     * @yamlKey vsync_front_porch
     */
    vsyncFrontPorch?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The Vertical sync pin.
     * @yamlKey vsync_pin
     */
    vsyncPin: Pin;
    /**
     * int: The vertical sync pulse width.
     * @yamlKey vsync_pulse_width
     */
    vsyncPulseWidth?: number;
}
interface St7735Props extends _DisplayFullDisplay, _CoreComponent {
    /**
     * int: The starting column offset. Default value depends on model.
     * @yamlKey col_start
     */
    colStart: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin;
    /**
     * int: The device height. 160 is default
     * @yamlKey device_height
     */
    deviceHeight: number;
    /**
     * int: The device width. 128 is default
     * @yamlKey device_width
     */
    deviceWidth: number;
    /**
     * boolean: 8bit mode. Default is false. This saves 50% of the buffer required for the display.
     * @yamlKey eight_bit_color
     */
    eightBitColor?: boolean;
    /**
     * boolean: Invert LCD colors. Default is false.
     * @yamlKey invert_colors
     */
    invertColors?: boolean;
    /** string: The model to use, one of the following options: */
    model: "INITR_18BLACKTAB" | "INITR_18REDTAB" | "INITR_BLACKTAB" | "INITR_GREENTAB" | "INITR_MINI160X80" | "INITR_REDTAB";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * int: The starting row offset. Default value depends on model.
     * @yamlKey row_start
     */
    rowStart: number;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /**
     * boolean: Use BGR mode. Default is false.
     * @yamlKey use_bgr
     */
    useBgr?: boolean;
}
interface St7789vProps extends _DisplayFullDisplay, _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The display's backlight pin. May be required ...
     * @yamlKey backlight_pin
     */
    backlightPin?: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The CS pin. Default depends on `model`.
     * @yamlKey cs_pin
     */
    csPin?: Pin;
    /**
     * frequency: The SPI data rate (default 20MHz.) Can be reduced if required, e.g. to compensate for long data cables.
     * @yamlKey data_rate
     */
    dataRate?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DC pin. Default depends on `model`.
     * @yamlKey dc_pin
     */
    dcPin?: Pin;
    /** boolean: Limits the supported color depth to eight bits. May be useful on memory-constrained devices. Defaults to `fa... */
    eightbitcolor?: boolean;
    /** int: Sets height of display in pixels. Default depends on `model`. */
    height?: number;
    /** string: The display model to use. One of the following options: */
    model: "ADAFRUIT_FUNHOUSE_240X240" | "ADAFRUIT_RR_280X240" | "ADAFRUIT_S2_TFT_FEATHER_240X135" | "CUSTOM" | "LILYGO_T-EMBED_170X320" | "TTGO_TDISPLAY_135X240" | "WAVESHARE_1.47IN_172X320";
    /**
     * int: When `model` is set to "Custom", use this to specify the display's vertical offset in pixels. This option may no...
     * @yamlKey offset_height
     */
    offsetHeight?: number;
    /**
     * int: When `model` is set to "Custom", use this to specify the display's horizontal offset in pixels. This option may ...
     * @yamlKey offset_width
     */
    offsetWidth?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The [power supply](https://esphome.io/components/power_supply...
     * @yamlKey power_supply
     */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin. Default depends on `model`.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /**
     * 0-3: The SPI clock mode to use (default: `mode0` .) The ST7789V datasheet specifies mode 0, but some displays appear ...
     * @yamlKey spi_mode
     */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** int: Sets width of display. Default depends on `model`. */
    width?: number;
}
interface St7920Props extends _DisplayFullDisplay, _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Sometimes also called `RS`. For ST7920 should...
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** int: The "height" of a screen. Defaults to 64; */
    height: number;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** int: The "width" of a screen. Defaults to 128. */
    width: number;
}
interface Tm1621Props extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the CS line.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the DATA line.
     * @yamlKey data_pin
     */
    dataPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the READ line.
     * @yamlKey read_pin
     */
    readPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the WRITE line.
     * @yamlKey write_pin
     */
    writePin: Pin;
}
interface Tm1637Props extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the CLK line hooked up to.
     * @yamlKey clk_pin
     */
    clkPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the DIO line hooked up to.
     * @yamlKey dio_pin
     */
    dioPin: Pin;
    /** int: The intensity with which the TM1637 should drive the outputs. Range is from 0 (least intense) to 7 (the default). */
    intensity?: number;
    /** bool: Invert character rendering to the TM1637 so you can physically flip the display around. */
    inverted?: boolean;
    /** int: The amount of digits your TM1637 is driving. Only used when `inverted: true` Range is from 1 to 6 (the default). */
    length?: number;
}
interface Tm1638Props extends _DisplayBasicDisplay, _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the CLK line hooked up to.
     * @yamlKey clk_pin
     */
    clkPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the DIO line hooked up to.
     * @yamlKey dio_pin
     */
    dioPin: Pin;
    /** int: The intensity with which the TM1638 should drive the outputs. Range is from 0 (least intense) to 7 (the default)... */
    intensity?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin you have the STB line hooked up to.
     * @yamlKey stb_pin
     */
    stbPin: Pin;
}
interface WaveshareEpaperProps extends _DisplayFullDisplay, _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The BUSY pin. Defaults to not connected.
     * @yamlKey busy_pin
     */
    busyPin?: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The CS pin.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The DC pin.
     * @yamlKey dc_pin
     */
    dcPin: Pin;
    /**
     * int: E-Paper displays have two modes of switching to the next image: A partial update that only changes the pixels th...
     * @yamlKey full_update_every
     */
    fullUpdateEvery?: number;
    /** The model of the E-Paper display. Options are: */
    model: "1.54in" | "1.54in-m5coreink-m09" | "1.54inv2" | "1.54inv2-b" | "13.3in-k" | "2.13in" | "2.13in-ttgo" | "2.13in-ttgo-b1" | "2.13in-ttgo-b73" | "2.13in-ttgo-b74" | "2.13in-ttgo-dke" | "2.13inv2" | "2.13inv3" | "2.70in" | "2.70in-b" | "2.70in-bv2" | "2.70inv2" | "2.90in" | "2.90in-b" | "2.90in-bv3" | "2.90in-d" | "2.90in-dke" | "2.90inv2" | "2.90inv2-r2" | "4.20in" | "4.20in-bv2" | "4.20in-bv2-bwr" | "5.65in-f" | "5.83in" | "5.83inv2" | "7.30in-f" | "7.50in" | "7.50in-bc" | "7.50in-bv2" | "7.50in-bv3" | "7.50in-bv3-bwr" | "7.50in-hd-b" | "7.50inv2" | "7.50inv2alt" | "7.50inv2p" | "gdew029t5" | "gdey029t94" | "gdey042t81" | "gdey0583t81";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Duration for the display reset operation. Defaults to `20...
     * @yamlKey reset_duration
     */
    resetDuration?: TimePeriod;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin. Defaults to not connected. Mak...
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [SPI Component](https://esphom...
     * @yamlKey spi_id
     */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
export type DisplayProps = ({
    platform: "addressable_light";
} & AddressableLightProps & ComponentProps<__marker_addressable_light_AddressableLightDisplay>) | ({
    platform: "epaper_spi";
} & ComponentProps) | ({
    platform: "hub75";
} & Hub75Props & ComponentProps<__marker_esphome_hub75_HUB75Display>) | ({
    platform: "ili9xxx";
} & Ili9xxxProps & ComponentProps<__marker_ili9xxx_ILI9XXXDisplay>) | ({
    platform: "inkplate";
} & InkplateProps & ComponentProps<__marker_inkplate_Inkplate>) | ({
    platform: "lcd_gpio";
} & LcdGpioProps & ComponentProps<__marker_lcd_gpio_GPIOLCDDisplay>) | ({
    platform: "lcd_pcf8574";
} & LcdPcf8574Props & ComponentProps<__marker_lcd_pcf8574_PCF8574LCDDisplay>) | ({
    platform: "max7219";
} & Max7219Props & ComponentProps<__marker_max7219_MAX7219Component>) | ({
    platform: "max7219digit";
} & Max7219digitProps & ComponentProps<__marker_max7219digit_MAX7219Component>) | ({
    platform: "mipi_dsi";
} & ComponentProps) | ({
    platform: "nextion";
} & NextionProps & ComponentProps<__marker_nextion_Nextion>) | ({
    platform: "pcd8544";
} & Pcd8544Props & ComponentProps<__marker_pcd8544_PCD8544>) | ({
    platform: "pvvx_mithermometer";
} & PvvxMithermometerProps & ComponentProps<__marker_pvvx_mithermometer_PVVXDisplay>) | ({
    platform: "qspi_dbi";
    model: "AXS15231";
} & QspiDbiAXS15231Props & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "CUSTOM";
} & QspiDbiCUSTOMProps & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "JC3636W518";
} & QspiDbiJC3636W518Props & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "JC4832W535";
} & QspiDbiJC4832W535Props & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "RM67162";
} & QspiDbiRM67162Props & ComponentProps) | ({
    platform: "qspi_dbi";
    model: "RM690B0";
} & QspiDbiRM690B0Props & ComponentProps) | ({
    platform: "rpi_dpi_rgb";
} & RpiDpiRgbProps & ComponentProps<__marker_rpi_dpi_rgb_RpiDpiRgb>) | ({
    platform: "sdl";
} & SdlProps & ComponentProps<__marker_sdl_Sdl>) | ({
    platform: "ssd1306_i2c";
} & Ssd1306I2cProps & ComponentProps<__marker_ssd1306_i2c_I2CSSD1306>) | ({
    platform: "ssd1306_spi";
} & Ssd1306SpiProps & ComponentProps<__marker_ssd1306_spi_SPISSD1306>) | ({
    platform: "ssd1322_spi";
} & Ssd1322SpiProps & ComponentProps<__marker_ssd1322_spi_SPISSD1322>) | ({
    platform: "ssd1325_spi";
} & Ssd1325SpiProps & ComponentProps<__marker_ssd1325_spi_SPISSD1325>) | ({
    platform: "ssd1327_i2c";
} & Ssd1327I2cProps & ComponentProps<__marker_ssd1327_i2c_I2CSSD1327>) | ({
    platform: "ssd1327_spi";
} & Ssd1327SpiProps & ComponentProps<__marker_ssd1327_spi_SPISSD1327>) | ({
    platform: "ssd1331_spi";
} & Ssd1331SpiProps & ComponentProps<__marker_ssd1331_spi_SPISSD1331>) | ({
    platform: "ssd1351_spi";
} & Ssd1351SpiProps & ComponentProps<__marker_ssd1351_spi_SPISSD1351>) | ({
    platform: "st7567_i2c";
} & St7567I2cProps & ComponentProps<__marker_st7567_i2c_I2CST7567>) | ({
    platform: "st7567_spi";
} & St7567SpiProps & ComponentProps<__marker_st7567_spi_SPIST7567>) | ({
    platform: "st7701s";
} & St7701sProps & ComponentProps<__marker_st7701s_ST7701S>) | ({
    platform: "st7735";
} & St7735Props & ComponentProps<__marker_st7735_ST7735>) | ({
    platform: "st7789v";
} & St7789vProps & ComponentProps<__marker_st7789v_ST7789V>) | ({
    platform: "st7920";
} & St7920Props & ComponentProps<__marker_st7920_ST7920>) | ({
    platform: "tm1621";
} & Tm1621Props & ComponentProps<__marker_tm1621_TM1621Display>) | ({
    platform: "tm1637";
} & Tm1637Props & ComponentProps<__marker_tm1637_TM1637Display>) | ({
    platform: "tm1638";
} & Tm1638Props & ComponentProps<__marker_tm1638_TM1638Component>) | ({
    platform: "waveshare_epaper";
} & WaveshareEpaperProps & ComponentProps<__marker_waveshare_epaper_WaveshareEPaperBase>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            display: DisplayProps;
        }
    }
}
