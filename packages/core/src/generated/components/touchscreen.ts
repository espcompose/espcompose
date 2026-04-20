// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _Touchscreen } from "../bases";
import type { __marker_axs15231_AXS15231Touchscreen, __marker_chsc6x_CHSC6XTouchscreen, __marker_cst226_CST226Touchscreen, __marker_cst816_CST816Touchscreen, __marker_display_Display, __marker_ektf2232_EKTF2232Touchscreen, __marker_ft5x06_FT5x06Touchscreen, __marker_ft63x6_FT63X6Touchscreen, __marker_gt911_GT911Touchscreen, __marker_i2c_I2CBus, __marker_lilygo_t5_47_LilygoT547Touchscreen, __marker_sdl_Sdl, __marker_sdl_SdlTouchscreen, __marker_spi_SPIComponent, __marker_tt21100_TT21100Touchscreen, __marker_xpt2046_XPT2046Component } from "../markers";
interface Axs15231CalibrationProps {
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
}
interface Axs15231TransformProps {
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
    /** @yamlKey swap_xy */
    swapXy?: boolean;
}
interface Chsc6xCalibrationProps {
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
}
interface Chsc6xTransformProps {
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
    /** @yamlKey swap_xy */
    swapXy?: boolean;
}
interface Cst226CalibrationProps {
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
}
interface Cst226TransformProps {
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
    /** @yamlKey swap_xy */
    swapXy?: boolean;
}
interface LilygoT547CalibrationProps {
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
}
interface LilygoT547TransformProps {
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
    /** @yamlKey swap_xy */
    swapXy?: boolean;
}
interface Xpt2046CalibrationProps {
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
}
interface Xpt2046TransformProps {
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
    /** @yamlKey swap_xy */
    swapXy?: boolean;
}
interface Axs15231Props extends _CoreComponent {
    address?: number;
    calibration?: Axs15231CalibrationProps;
    display?: RefProp<__marker_display_Display>;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    transform?: Axs15231TransformProps;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface Chsc6xProps extends _CoreComponent {
    address?: number;
    calibration?: Chsc6xCalibrationProps;
    display?: RefProp<__marker_display_Display>;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    transform?: Chsc6xTransformProps;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface Cst226Props extends _CoreComponent {
    address?: number;
    calibration?: Cst226CalibrationProps;
    display?: RefProp<__marker_display_Display>;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The chip reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    transform?: Cst226TransformProps;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface Cst816Props extends _Touchscreen {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The chip reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * boolean: Skip reading the chip ID on startup. May be required for some variants (e.g. CST816S) that do not respond to...
     * @yamlKey skip_probe
     */
    skipProbe?: boolean;
}
interface Ektf2232Props extends _Touchscreen {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The reset pin of the controller.
     * @yamlKey reset_pin
     */
    resetPin: Pin;
}
interface Ft5x06Props extends _Touchscreen {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The GPIO pin to use as the interrupt pin. Thi...
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
}
interface Ft63x6Props extends _Touchscreen {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The reset pin of the controller.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    threshold?: number;
}
interface Gt911Props extends _Touchscreen {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin if run to an on-MCU pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
}
interface LilygoT547Props extends _CoreComponent {
    address?: number;
    calibration?: LilygoT547CalibrationProps;
    display?: RefProp<__marker_display_Display>;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin. Must be `GPIO13`.
     * @yamlKey interrupt_pin
     */
    interruptPin: Pin;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    transform?: LilygoT547TransformProps;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface SdlProps extends _Touchscreen {
    /** @yamlKey sdl_id */
    sdlId?: RefProp<__marker_sdl_Sdl>;
}
interface Tt21100Props extends _Touchscreen {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The reset pin of the controller.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
}
interface Xpt2046Props extends _CoreComponent {
    /** The XPT2046 is a resistive touch screen and it will require calibration on a per-device basis. */
    calibration: Xpt2046CalibrationProps;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The chip select pin. Often marked `T_CS` on t...
     * @yamlKey cs_pin
     */
    csPin?: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    display?: RefProp<__marker_display_Display>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The touch detection pin. Often marked `T_IRQ`...
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** int: The value to detect the touch or release. Defaults to `400`. */
    threshold?: number;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    transform?: Xpt2046TransformProps;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to check the sensor. If `interrupt_pin` is s...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
export type TouchscreenProps = ({
    platform: "axs15231";
} & Axs15231Props & ComponentProps<__marker_axs15231_AXS15231Touchscreen>) | ({
    platform: "chsc6x";
} & Chsc6xProps & ComponentProps<__marker_chsc6x_CHSC6XTouchscreen>) | ({
    platform: "cst226";
} & Cst226Props & ComponentProps<__marker_cst226_CST226Touchscreen>) | ({
    platform: "cst816";
} & Cst816Props & ComponentProps<__marker_cst816_CST816Touchscreen>) | ({
    platform: "ektf2232";
} & Ektf2232Props & ComponentProps<__marker_ektf2232_EKTF2232Touchscreen>) | ({
    platform: "ft5x06";
} & Ft5x06Props & ComponentProps<__marker_ft5x06_FT5x06Touchscreen>) | ({
    platform: "ft63x6";
} & Ft63x6Props & ComponentProps<__marker_ft63x6_FT63X6Touchscreen>) | ({
    platform: "gt911";
} & Gt911Props & ComponentProps<__marker_gt911_GT911Touchscreen>) | ({
    platform: "lilygo_t5_47";
} & LilygoT547Props & ComponentProps<__marker_lilygo_t5_47_LilygoT547Touchscreen>) | ({
    platform: "sdl";
} & SdlProps & ComponentProps<__marker_sdl_SdlTouchscreen>) | ({
    platform: "tt21100";
} & Tt21100Props & ComponentProps<__marker_tt21100_TT21100Touchscreen>) | ({
    platform: "xpt2046";
} & Xpt2046Props & ComponentProps<__marker_xpt2046_XPT2046Component>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            touchscreen: TouchscreenProps;
        }
    }
}
