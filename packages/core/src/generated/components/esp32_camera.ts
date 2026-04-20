// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase } from "../bases";
import type { __marker_esp32_camera_ESP32Camera, __marker_i2c_InternalI2CBus } from "../markers";
export interface Esp32CameraExternalClockProps {
    /** frequency: The frequency of the external clock, must be between `8MHz` and `20MHz`. Defaults to `20MHz`. */
    frequency?: unknown;
    /** pin: The pin the external clock line is connected to. */
    pin: Pin;
}
export interface Esp32CameraI2cPinsProps {
    scl: Pin;
    sda: Pin;
}
export interface Esp32CameraProps extends _CoreEntityBase, _CoreComponent {
    /**
     * int: The auto exposure level to apply to the picture (when aec_mode is set to `auto` ), from -2 to 2. Defaults to `0`.
     * @yamlKey ae_level
     */
    aeLevel?: number;
    /**
     * enum: The mode of exposure module. Defaults to `auto` (leave camera to automatically adjust exposure).
     * @yamlKey aec_mode
     */
    aecMode?: "AUTO" | "MANUAL";
    /**
     * int: The Exposure value to apply to the picture (when aec_mode is set to `manual` ), from 0 to 1200. Defaults to `300`.
     * @yamlKey aec_value
     */
    aecValue?: number;
    /** boolean: Whether to enable Auto Exposure Control 2. Seems to change computation method of automatic exposure. Default... */
    aec2?: boolean;
    /**
     * enum: The maximum gain allowed, when agc_mode is set to `auto`. This parameter seems act as "ISO" setting. Defaults t...
     * @yamlKey agc_gain_ceiling
     */
    agcGainCeiling?: "128X" | "16X" | "2X" | "32X" | "4X" | "64X" | "8X";
    /**
     * enum: The mode of gain control module. Defaults to `auto` (leave camera to automatically adjust sensor gain).
     * @yamlKey agc_mode
     */
    agcMode?: "AUTO" | "MANUAL";
    /**
     * int: The gain value to apply to the picture (when aec_mode is set to `manual` ), from 0 to 30. Defaults to `0`.
     * @yamlKey agc_value
     */
    agcValue?: number;
    /** int: The brightness to apply to the picture, from -2 to 2. Defaults to `0`. */
    brightness?: number;
    /** int: The contrast to apply to the picture, from -2 to 2. Defaults to `0`. */
    contrast?: number;
    /**
     * list of pins: The data lanes of the camera, this must be a list of 8 GPIO pins.
     * @yamlKey data_pins
     */
    dataPins: unknown;
    /**
     * The configuration of the external clock to drive the camera.
     * @yamlKey external_clock
     */
    externalClock: Esp32CameraExternalClockProps;
    /**
     * int: The number of frame buffers to use when reading from the camera sensor. Must be between 1 and 2. Defaults to `1`.
     * @yamlKey frame_buffer_count
     */
    frameBufferCount?: number;
    /**
     * enum: The memory area used for storing the frame buffers. Defaults to `PSRAM`.
     * @yamlKey frame_buffer_location
     */
    frameBufferLocation?: unknown;
    /**
     * boolean: Whether to mirror the image horizontally. Defaults to `true`.
     * @yamlKey horizontal_mirror
     */
    horizontalMirror?: boolean;
    /**
     * pin: The pin the HREF line of the camera is connected to.
     * @yamlKey href_pin
     */
    hrefPin: Pin;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [I²C bus](https://esphome.io/components/i2c) th...
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_InternalI2CBus>;
    /** @yamlKey i2c_pins */
    i2cPins?: Esp32CameraI2cPinsProps;
    /**
     * float: The framerate to capture images at when no client is requesting a full stream. Defaults to `0.1 fps`.
     * @yamlKey idle_framerate
     */
    idleFramerate?: number;
    /**
     * int: The JPEG quality that the camera should encode images with. From 6 (best) to 63 (worst). Defaults to `10`. Set t...
     * @yamlKey jpeg_quality
     */
    jpegQuality?: number;
    /**
     * float: The maximum framerate the camera will generate images at. Up to 60Hz is possible (with reduced frame sizes), b...
     * @yamlKey max_framerate
     */
    maxFramerate?: number;
    /**
     * [Automation](https://esphome.io/automations): An automation called when image taken. Image is available as `image` va...
     * @yamlKey on_image
     */
    onImage?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a stream starts.
     * @yamlKey on_stream_start
     */
    onStreamStart?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a stream stops.
     * @yamlKey on_stream_stop
     */
    onStreamStop?: TriggerHandler;
    /**
     * pin: The pin the pixel clock line of the camera is connected to.
     * @yamlKey pixel_clock_pin
     */
    pixelClockPin: Pin;
    /**
     * enum: The pixel format to use for the images. Defaults to ``jpeg`` (JPEG compressed image) which may not be supported...
     * @yamlKey pixel_format
     */
    pixelFormat?: "GRAYSCALE" | "JPEG" | "RAW" | "RGB444" | "RGB555" | "RGB565" | "RGB888" | "YUV420" | "YUV422";
    /**
     * pin: The ESP pin to power down the camera. If set, this will power down the camera while it is inactive.
     * @yamlKey power_down_pin
     */
    powerDownPin?: Pin;
    /**
     * pin: The ESP pin the reset pin of the camera is connected to. If set, this will reset the camera before the ESP boots.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** enum: The resolution the camera will capture images at. Higher resolutions require more memory, if there's not enough... */
    resolution?: "1024X768" | "1080X1920" | "1280X1024" | "1600X1200" | "160X120" | "176X144" | "1920X1080" | "2048X1536" | "240X176" | "2560X1440" | "2560X1600" | "2560X1920" | "320X240" | "400X296" | "640X480" | "720X1280" | "800X600" | "864X1536" | "CIF" | "FHD" | "HQVGA" | "P3MP" | "PFHD" | "PHD" | "QCIF" | "QHD" | "QQVGA" | "QSXGA" | "QVGA" | "QXGA" | "SVGA" | "SXGA" | "UXGA" | "VGA" | "WQXGA" | "XGA";
    /** int: The saturation to apply to the picture, from -2 to 2. Defaults to `0`. */
    saturation?: number;
    /**
     * enum: The effect to apply to the picture. Defaults to `none` (picture without effect).
     * @yamlKey special_effect
     */
    specialEffect?: "BLUE_TINT" | "GRAYSCALE" | "GREEN_TINT" | "NEGATIVE" | "NONE" | "RED_TINT" | "SEPIA";
    /**
     * boolean: For tests purposes, it's possible to replace picture get from sensor by a test color pattern. Defaults to `f...
     * @yamlKey test_pattern
     */
    testPattern?: boolean;
    /**
     * boolean: Whether to flip the image vertically. Defaults to `true`.
     * @yamlKey vertical_flip
     */
    verticalFlip?: boolean;
    /**
     * pin: The pin the VSYNC line of the camera is connected to.
     * @yamlKey vsync_pin
     */
    vsyncPin: Pin;
    /**
     * enum: The mode of white balace module. Defaults to `auto`.
     * @yamlKey wb_mode
     */
    wbMode?: "AUTO" | "CLOUDY" | "HOME" | "OFFICE" | "SUNNY";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_camera: Esp32CameraProps & ComponentProps<__marker_esp32_camera_ESP32Camera>;
        }
    }
}
