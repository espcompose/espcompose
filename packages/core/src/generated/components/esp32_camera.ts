// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase } from "../bases";
import type { __marker_esp32_camera_ESP32Camera, __marker_i2c_InternalI2CBus } from "../markers";
export interface Esp32CameraExternalClockProps {
    /** pin: The pin the external clock line is connected to. */
    pin: Pin;
    /** frequency: The frequency of the external clock, must be between `8MHz` and `20MHz`. Defaults to `20MHz`. */
    frequency?: unknown;
}
export interface Esp32CameraI2cPinsProps {
    sda: Pin;
    scl: Pin;
}
export interface Esp32CameraProps extends _CoreEntityBase, _CoreComponent {
    /**
     * list of pins: The data lanes of the camera, this must be a list of 8 GPIO pins.
     * @yamlKey data_pins
     */
    dataPins: unknown;
    /**
     * pin: The pin the VSYNC line of the camera is connected to.
     * @yamlKey vsync_pin
     */
    vsyncPin: Pin;
    /**
     * pin: The pin the HREF line of the camera is connected to.
     * @yamlKey href_pin
     */
    hrefPin: Pin;
    /**
     * pin: The pin the pixel clock line of the camera is connected to.
     * @yamlKey pixel_clock_pin
     */
    pixelClockPin: Pin;
    /**
     * The configuration of the external clock to drive the camera.
     * @yamlKey external_clock
     */
    externalClock: Esp32CameraExternalClockProps;
    /** @yamlKey i2c_pins */
    i2cPins?: Esp32CameraI2cPinsProps;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [I²C bus](/components/i2c) the camera is connected to.
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_InternalI2CBus>;
    /**
     * pin: The ESP pin the reset pin of the camera is connected to. If set, this will reset the camera before the ESP boots.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * pin: The ESP pin to power down the camera. If set, this will power down the camera while it is inactive.
     * @yamlKey power_down_pin
     */
    powerDownPin?: Pin;
    /** enum: The resolution the camera will capture images at. Higher resolutions require more memory, if there's not enough... */
    resolution?: "160X120" | "QQVGA" | "176X144" | "QCIF" | "240X176" | "HQVGA" | "320X240" | "QVGA" | "400X296" | "CIF" | "640X480" | "VGA" | "800X600" | "SVGA" | "1024X768" | "XGA" | "1280X1024" | "SXGA" | "1600X1200" | "UXGA" | "1920X1080" | "FHD" | "720X1280" | "PHD" | "864X1536" | "P3MP" | "2048X1536" | "QXGA" | "2560X1440" | "QHD" | "2560X1600" | "WQXGA" | "1080X1920" | "PFHD" | "2560X1920" | "QSXGA";
    /**
     * enum: The pixel format to use for the images. Defaults to ``jpeg`` (JPEG compressed image) which may not be supported...
     * @yamlKey pixel_format
     */
    pixelFormat?: "RGB565" | "YUV422" | "YUV420" | "GRAYSCALE" | "JPEG" | "RGB888" | "RAW" | "RGB444" | "RGB555";
    /**
     * int: The JPEG quality that the camera should encode images with. From 6 (best) to 63 (worst). Defaults to `10`. Set t...
     * @yamlKey jpeg_quality
     */
    jpegQuality?: number;
    /** int: The contrast to apply to the picture, from -2 to 2. Defaults to `0`. */
    contrast?: number;
    /** int: The brightness to apply to the picture, from -2 to 2. Defaults to `0`. */
    brightness?: number;
    /** int: The saturation to apply to the picture, from -2 to 2. Defaults to `0`. */
    saturation?: number;
    /**
     * boolean: Whether to flip the image vertically. Defaults to `true`.
     * @yamlKey vertical_flip
     */
    verticalFlip?: boolean;
    /**
     * boolean: Whether to mirror the image horizontally. Defaults to `true`.
     * @yamlKey horizontal_mirror
     */
    horizontalMirror?: boolean;
    /**
     * enum: The effect to apply to the picture. Defaults to `none` (picture without effect).
     * @yamlKey special_effect
     */
    specialEffect?: "NONE" | "NEGATIVE" | "GRAYSCALE" | "RED_TINT" | "GREEN_TINT" | "BLUE_TINT" | "SEPIA";
    /**
     * enum: The mode of gain control module. Defaults to `auto` (leave camera to automatically adjust sensor gain).
     * @yamlKey agc_mode
     */
    agcMode?: "MANUAL" | "AUTO";
    /** boolean: Whether to enable Auto Exposure Control 2. Seems to change computation method of automatic exposure. Default... */
    aec2?: boolean;
    /**
     * int: The auto exposure level to apply to the picture (when aec_mode is set to `auto` ), from -2 to 2. Defaults to `0`.
     * @yamlKey ae_level
     */
    aeLevel?: number;
    /**
     * int: The Exposure value to apply to the picture (when aec_mode is set to `manual` ), from 0 to 1200. Defaults to `300`.
     * @yamlKey aec_value
     */
    aecValue?: number;
    /**
     * enum: The mode of exposure module. Defaults to `auto` (leave camera to automatically adjust exposure).
     * @yamlKey aec_mode
     */
    aecMode?: "MANUAL" | "AUTO";
    /**
     * int: The gain value to apply to the picture (when aec_mode is set to `manual` ), from 0 to 30. Defaults to `0`.
     * @yamlKey agc_value
     */
    agcValue?: number;
    /**
     * enum: The maximum gain allowed, when agc_mode is set to `auto`. This parameter seems act as "ISO" setting. Defaults t...
     * @yamlKey agc_gain_ceiling
     */
    agcGainCeiling?: "2X" | "4X" | "8X" | "16X" | "32X" | "64X" | "128X";
    /**
     * enum: The mode of white balace module. Defaults to `auto`.
     * @yamlKey wb_mode
     */
    wbMode?: "AUTO" | "SUNNY" | "CLOUDY" | "OFFICE" | "HOME";
    /**
     * boolean: For tests purposes, it's possible to replace picture get from sensor by a test color pattern. Defaults to `f...
     * @yamlKey test_pattern
     */
    testPattern?: boolean;
    /**
     * float: The maximum framerate the camera will generate images at. Up to 60Hz is possible (with reduced frame sizes), b...
     * @yamlKey max_framerate
     */
    maxFramerate?: number;
    /**
     * float: The framerate to capture images at when no client is requesting a full stream. Defaults to `0.1 fps`.
     * @yamlKey idle_framerate
     */
    idleFramerate?: number;
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
     * [Automation](/automations): An automation to perform when a stream starts.
     * @yamlKey on_stream_start
     */
    onStreamStart?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when a stream stops.
     * @yamlKey on_stream_stop
     */
    onStreamStop?: TriggerHandler;
    /**
     * [Automation](/automations): An automation called when image taken. Image is available as `image` variable of type <AP...
     * @yamlKey on_image
     */
    onImage?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_camera: Esp32CameraProps & ComponentProps<__marker_esp32_camera_ESP32Camera>;
        }
    }
}
