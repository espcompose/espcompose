// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _Touchscreen } from "../bases";
import type { axs15231_AXS15231Touchscreen, chsc6x_CHSC6XTouchscreen, cst226_CST226Touchscreen, cst816_CST816Touchscreen, display_Display, ektf2232_EKTF2232Touchscreen, ft5x06_FT5x06Touchscreen, ft63x6_FT63X6Touchscreen, gt911_GT911Touchscreen, i2c_I2CBus, lilygo_t5_47_LilygoT547Touchscreen, sdl_Sdl, sdl_SdlTouchscreen, spi_SPIComponent, tt21100_TT21100Touchscreen, xpt2046_XPT2046Component } from "../markers";
interface Axs15231TransformProps {
    /** @yamlKey swap_xy */
    swapXy?: boolean;
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
}
interface Axs15231CalibrationProps {
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
}
interface Chsc6xTransformProps {
    /** @yamlKey swap_xy */
    swapXy?: boolean;
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
}
interface Chsc6xCalibrationProps {
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
}
interface LilygoT547TransformProps {
    /** @yamlKey swap_xy */
    swapXy?: boolean;
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
}
interface LilygoT547CalibrationProps {
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
}
interface Cst226TransformProps {
    /** @yamlKey swap_xy */
    swapXy?: boolean;
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
}
interface Cst226CalibrationProps {
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
}
interface Xpt2046TransformProps {
    /** @yamlKey swap_xy */
    swapXy?: boolean;
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
}
interface Xpt2046CalibrationProps {
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
}
interface Cst816Props extends _Touchscreen {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The chip reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * boolean: Skip reading the chip ID on startup. May be required for some variants (e.g. CST816S) that do not respond to...
     * @yamlKey skip_probe
     */
    skipProbe?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface Axs15231Props extends _CoreComponent {
    display?: RefProp<display_Display>;
    transform?: Axs15231TransformProps;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    calibration?: Axs15231CalibrationProps;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface Chsc6xProps extends _CoreComponent {
    display?: RefProp<display_Display>;
    transform?: Chsc6xTransformProps;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    calibration?: Chsc6xCalibrationProps;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface Ektf2232Props extends _Touchscreen {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The reset pin of the controller.
     * @yamlKey reset_pin
     */
    resetPin: Pin;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface Ft5x06Props extends _Touchscreen {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The GPIO pin to use as the interrupt pin. This pin is used to d...
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface Ft63x6Props extends _Touchscreen {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The reset pin of the controller.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    threshold?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface LilygoT547Props extends _CoreComponent {
    display?: RefProp<display_Display>;
    transform?: LilygoT547TransformProps;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    calibration?: LilygoT547CalibrationProps;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin. Must be `GPIO13`.
     * @yamlKey interrupt_pin
     */
    interruptPin: Pin;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface Cst226Props extends _CoreComponent {
    display?: RefProp<display_Display>;
    transform?: Cst226TransformProps;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    calibration?: Cst226CalibrationProps;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The chip reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface Gt911Props extends _Touchscreen {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin if run to an on-MCU pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface SdlProps extends _Touchscreen {
    /** @yamlKey sdl_id */
    sdlId?: RefProp<sdl_Sdl>;
}
interface Tt21100Props extends _Touchscreen {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The reset pin of the controller.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
interface Xpt2046Props extends _CoreComponent {
    display?: RefProp<display_Display>;
    transform?: Xpt2046TransformProps;
    /** @yamlKey touch_timeout */
    touchTimeout?: TimePeriod;
    calibration: Xpt2046CalibrationProps;
    /** @yamlKey on_touch */
    onTouch?: TriggerHandler;
    /** @yamlKey on_update */
    onUpdate?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey interrupt_pin */
    interruptPin?: Pin;
    threshold?: number;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey cs_pin */
    csPin: Pin;
}
export type TouchscreenProps = ({
    platform: "cst816";
} & Cst816Props & ComponentProps<cst816_CST816Touchscreen>) | ({
    platform: "axs15231";
} & Axs15231Props & ComponentProps<axs15231_AXS15231Touchscreen>) | ({
    platform: "chsc6x";
} & Chsc6xProps & ComponentProps<chsc6x_CHSC6XTouchscreen>) | ({
    platform: "ektf2232";
} & Ektf2232Props & ComponentProps<ektf2232_EKTF2232Touchscreen>) | ({
    platform: "ft5x06";
} & Ft5x06Props & ComponentProps<ft5x06_FT5x06Touchscreen>) | ({
    platform: "ft63x6";
} & Ft63x6Props & ComponentProps<ft63x6_FT63X6Touchscreen>) | ({
    platform: "lilygo_t5_47";
} & LilygoT547Props & ComponentProps<lilygo_t5_47_LilygoT547Touchscreen>) | ({
    platform: "cst226";
} & Cst226Props & ComponentProps<cst226_CST226Touchscreen>) | ({
    platform: "gt911";
} & Gt911Props & ComponentProps<gt911_GT911Touchscreen>) | ({
    platform: "sdl";
} & SdlProps & ComponentProps<sdl_SdlTouchscreen>) | ({
    platform: "tt21100";
} & Tt21100Props & ComponentProps<tt21100_TT21100Touchscreen>) | ({
    platform: "xpt2046";
} & Xpt2046Props & ComponentProps<xpt2046_XPT2046Component>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            touchscreen: TouchscreenProps;
        }
    }
}
