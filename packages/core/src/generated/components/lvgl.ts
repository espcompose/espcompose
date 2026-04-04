// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { BindProp, ComponentProps, RefProp } from "../../types";
import type { image_Image } from "../markers";
/** Shared style properties available on every LVGL widget and on per-part / per-state overrides. */
//
export interface LvglStyleProps {
    align?: "TOP_LEFT" | "TOP_MID" | "TOP_RIGHT" | "LEFT_MID" | "CENTER" | "RIGHT_MID" | "BOTTOM_LEFT" | "BOTTOM_MID" | "BOTTOM_RIGHT";
    /** @yamlKey arc_opa */
    arcOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey arc_color */
    arcColor?: BindProp<string | string>;
    /** @yamlKey arc_rounded */
    arcRounded?: BindProp<boolean>;
    /** @yamlKey arc_width */
    arcWidth?: BindProp<number | string>;
    /** @yamlKey anim_time */
    animTime?: BindProp<number>;
    /** @yamlKey bg_color */
    bgColor?: BindProp<string | string>;
    /** @yamlKey bg_grad */
    bgGrad?: unknown;
    /** @yamlKey bg_grad_color */
    bgGradColor?: BindProp<string | string>;
    /** @yamlKey bg_dither_mode */
    bgDitherMode?: "NONE" | "ORDERED" | "ERR_DIFF";
    /** @yamlKey bg_grad_dir */
    bgGradDir?: BindProp<string | ("NONE" | "HOR" | "VER")>;
    /** @yamlKey bg_grad_stop */
    bgGradStop?: BindProp<unknown>;
    /** @yamlKey bg_image_opa */
    bgImageOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey bg_image_recolor */
    bgImageRecolor?: BindProp<string | string>;
    /** @yamlKey bg_image_recolor_opa */
    bgImageRecolorOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey bg_image_src */
    bgImageSrc?: string | RefProp<image_Image>;
    /** @yamlKey bg_image_tiled */
    bgImageTiled?: BindProp<boolean>;
    /** @yamlKey bg_main_stop */
    bgMainStop?: BindProp<unknown>;
    /** @yamlKey bg_opa */
    bgOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey border_color */
    borderColor?: BindProp<string | string>;
    /** @yamlKey border_opa */
    borderOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey border_post */
    borderPost?: BindProp<boolean>;
    /** @yamlKey border_side */
    borderSide?: BindProp<string | ("NONE" | "TOP" | "BOTTOM" | "LEFT" | "RIGHT" | "INTERNAL")>;
    /** @yamlKey border_width */
    borderWidth?: BindProp<number>;
    /** @yamlKey clip_corner */
    clipCorner?: BindProp<boolean>;
    /** @yamlKey color_filter_opa */
    colorFilterOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    height?: BindProp<string | (number | string | "SIZE_CONTENT")>;
    /** @yamlKey image_recolor */
    imageRecolor?: BindProp<string | string>;
    /** @yamlKey image_recolor_opa */
    imageRecolorOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey line_width */
    lineWidth?: BindProp<number>;
    /** @yamlKey line_dash_width */
    lineDashWidth?: BindProp<number>;
    /** @yamlKey line_dash_gap */
    lineDashGap?: BindProp<number>;
    /** @yamlKey line_rounded */
    lineRounded?: BindProp<boolean>;
    /** @yamlKey line_color */
    lineColor?: BindProp<string | string>;
    opa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey opa_layered */
    opaLayered?: "TRANSP" | "COVER";
    /** @yamlKey outline_color */
    outlineColor?: BindProp<string | string>;
    /** @yamlKey outline_opa */
    outlineOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey outline_pad */
    outlinePad?: BindProp<number | string>;
    /** @yamlKey outline_width */
    outlineWidth?: BindProp<number | string>;
    /** @yamlKey pad_all */
    padAll?: BindProp<number | string>;
    /** @yamlKey pad_bottom */
    padBottom?: BindProp<number | string>;
    /** @yamlKey pad_left */
    padLeft?: BindProp<number | string>;
    /** @yamlKey pad_right */
    padRight?: BindProp<number | string>;
    /** @yamlKey pad_top */
    padTop?: BindProp<number | string>;
    /** @yamlKey shadow_color */
    shadowColor?: BindProp<string | string>;
    /** @yamlKey shadow_ofs_x */
    shadowOfsX?: BindProp<number>;
    /** @yamlKey shadow_ofs_y */
    shadowOfsY?: BindProp<number>;
    /** @yamlKey shadow_opa */
    shadowOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey shadow_spread */
    shadowSpread?: BindProp<number>;
    /** @yamlKey shadow_width */
    shadowWidth?: BindProp<number>;
    /** @yamlKey text_align */
    textAlign?: BindProp<string | ("LEFT" | "CENTER" | "RIGHT" | "AUTO")>;
    /** @yamlKey text_color */
    textColor?: BindProp<string | string>;
    /** @yamlKey text_decor */
    textDecor?: BindProp<string | ("NONE" | "UNDERLINE" | "STRIKETHROUGH")>;
    /** @yamlKey text_font */
    textFont?: BindProp<string | ("montserrat_8" | "montserrat_10" | "montserrat_12" | "montserrat_14" | "montserrat_16" | "montserrat_18" | "montserrat_20" | "montserrat_22" | "montserrat_24" | "montserrat_26" | "montserrat_28" | "montserrat_30" | "montserrat_32" | "montserrat_34" | "montserrat_36" | "montserrat_38" | "montserrat_40" | "montserrat_42" | "montserrat_44" | "montserrat_46" | "montserrat_48" | "dejavu_16_persian_hebrew" | "simsun_16_cjk" | "unscii_8" | "unscii_16")>;
    /** @yamlKey text_letter_space */
    textLetterSpace?: BindProp<number>;
    /** @yamlKey text_line_space */
    textLineSpace?: BindProp<number>;
    /** @yamlKey text_opa */
    textOpa?: BindProp<string | ("TRANSP" | "COVER")>;
    /** @yamlKey transform_angle */
    transformAngle?: BindProp<number>;
    /** @yamlKey transform_height */
    transformHeight?: BindProp<number | string>;
    /** @yamlKey transform_pivot_x */
    transformPivotX?: number | string;
    /** @yamlKey transform_pivot_y */
    transformPivotY?: number | string;
    /** @yamlKey transform_zoom */
    transformZoom?: BindProp<unknown>;
    /** @yamlKey translate_x */
    translateX?: BindProp<number | string>;
    /** @yamlKey translate_y */
    translateY?: BindProp<number | string>;
    /** @yamlKey max_height */
    maxHeight?: BindProp<number | string>;
    /** @yamlKey max_width */
    maxWidth?: BindProp<number | string>;
    /** @yamlKey min_height */
    minHeight?: BindProp<number | string>;
    /** @yamlKey min_width */
    minWidth?: BindProp<number | string>;
    radius?: BindProp<string | "CIRCLE">;
    width?: BindProp<string | (number | string | "SIZE_CONTENT")>;
    x?: BindProp<number | string>;
    y?: BindProp<number | string>;
    /** State-variant style override. */
    checked?: LvglStyleProps;
    /** State-variant style override. */
    focused?: LvglStyleProps;
    /**
     * State-variant style override.
     * @yamlKey focus_key
     */
    focusKey?: LvglStyleProps;
    /** State-variant style override. */
    edited?: LvglStyleProps;
    /** State-variant style override. */
    hovered?: LvglStyleProps;
    /** State-variant style override. */
    pressed?: LvglStyleProps;
    /** State-variant style override. */
    scrolled?: LvglStyleProps;
    /** State-variant style override. */
    disabled?: LvglStyleProps;
    /**
     * State-variant style override.
     * @yamlKey user_1
     */
    user1?: LvglStyleProps;
    /**
     * State-variant style override.
     * @yamlKey user_2
     */
    user2?: LvglStyleProps;
    /**
     * State-variant style override.
     * @yamlKey user_3
     */
    user3?: LvglStyleProps;
    /**
     * State-variant style override.
     * @yamlKey user_4
     */
    user4?: LvglStyleProps;
    /** Reference to one or more `style_definitions` IDs. */
    styles?: string | string[];
}
//
export interface LvglObjProps extends LvglStyleProps {
    /** Style overrides for the "scrollbar" part. */
    scrollbar?: LvglStyleProps;
}
//
export interface LvglLabelProps extends LvglStyleProps {
    text?: BindProp<string | number>;
    recolor?: boolean;
    /** @yamlKey long_mode */
    longMode?: "WRAP" | "DOT" | "SCROLL" | "SCROLL_CIRCULAR" | "CLIP";
    /** Style overrides for the "scrollbar" part. */
    scrollbar?: LvglStyleProps;
    /** Style overrides for the "selected" part. */
    selected?: LvglStyleProps;
}
//
export interface LvglButtonProps extends LvglStyleProps {
    text?: BindProp<string | number>;
}
//
export interface LvglBtnmatrixBtnProps extends LvglStyleProps {
}
//
export interface LvglButtonmatrixProps extends LvglStyleProps {
    /** @yamlKey one_checked */
    oneChecked?: boolean;
    /** @yamlKey pad_row */
    padRow?: number | string;
    /** @yamlKey pad_column */
    padColumn?: number | string;
    /** @yamlKey button_text_list_id */
    buttonTextListId?: unknown;
    rows: unknown;
    /** Style overrides for the "items" part. */
    items?: LvglStyleProps;
}
//
export interface LvglPageProps extends LvglStyleProps {
    skip?: boolean;
    /** @yamlKey on_load */
    onLoad?: unknown;
    /** @yamlKey on_unload */
    onUnload?: unknown;
}
//
export interface LvglImageProps extends LvglStyleProps {
    /** @yamlKey pivot_x */
    pivotX?: number | string | "SIZE_CONTENT";
    /** @yamlKey pivot_y */
    pivotY?: number | string | "SIZE_CONTENT";
    angle?: number;
    zoom?: unknown;
    /** @yamlKey offset_x */
    offsetX?: number | string | "SIZE_CONTENT";
    /** @yamlKey offset_y */
    offsetY?: number | string | "SIZE_CONTENT";
    antialias?: boolean;
    mode?: "VIRTUAL" | "REAL";
    src: string | RefProp<image_Image>;
}
//
export interface LvglAnimimgProps extends LvglStyleProps {
    /** @yamlKey repeat_count */
    repeatCount?: unknown;
    /** @yamlKey auto_start */
    autoStart?: boolean;
    duration: number;
    src: unknown;
}
//
export interface LvglArcProps extends LvglStyleProps {
    value?: BindProp<number>;
    /** @yamlKey min_value */
    minValue?: number;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey start_angle */
    startAngle?: number;
    /** @yamlKey end_angle */
    endAngle?: number;
    rotation?: number;
    adjustable?: boolean;
    mode?: "NORMAL" | "REVERSE" | "SYMMETRICAL";
    /** @yamlKey change_rate */
    changeRate?: number;
    /** Style overrides for the "indicator" part. */
    indicator?: LvglStyleProps;
    /** Style overrides for the "knob" part. */
    knob?: LvglStyleProps;
}
//
export interface LvglLineProps extends LvglStyleProps {
    points: unknown;
}
//
export interface LvglCanvasProps extends LvglStyleProps {
    width: number | string | "SIZE_CONTENT";
    height: number | string | "SIZE_CONTENT";
    transparent?: boolean;
}
//
export interface LvglCheckboxProps extends LvglStyleProps {
    text?: BindProp<string | number>;
    /** @yamlKey pad_column */
    padColumn?: number | string;
    /** Style overrides for the "indicator" part. */
    indicator?: LvglStyleProps;
}
//
export interface LvglContainerProps extends LvglStyleProps {
    height?: number | string | "SIZE_CONTENT";
    width?: number | string | "SIZE_CONTENT";
    /** Style overrides for the "scrollbar" part. */
    scrollbar?: LvglStyleProps;
}
//
export interface LvglDropdownListProps extends LvglStyleProps {
    /** Style overrides for the "selected" part. */
    selected?: LvglStyleProps;
    /** Style overrides for the "scrollbar" part. */
    scrollbar?: LvglStyleProps;
}
//
export interface LvglDropdownProps extends LvglStyleProps {
    symbol?: unknown;
    /** @yamlKey selected_index */
    selectedIndex?: number;
    /** @yamlKey selected_text */
    selectedText?: string;
    /** @yamlKey dropdown_list */
    dropdownList?: unknown;
    options: BindProp<unknown>;
    dir?: "LEFT" | "RIGHT" | "BOTTOM" | "TOP";
    /** Style overrides for the "indicator" part. */
    indicator?: LvglStyleProps;
}
//
export interface LvglTextareaProps extends LvglStyleProps {
    text?: BindProp<string | number>;
    /** @yamlKey placeholder_text */
    placeholderText?: string;
    /** @yamlKey accepted_chars */
    acceptedChars?: string;
    /** @yamlKey one_line */
    oneLine?: boolean;
    /** @yamlKey password_mode */
    passwordMode?: boolean;
    /** @yamlKey max_length */
    maxLength?: number;
    /** Style overrides for the "scrollbar" part. */
    scrollbar?: LvglStyleProps;
    /** Style overrides for the "selected" part. */
    selected?: LvglStyleProps;
    /** Style overrides for the "cursor" part. */
    cursor?: LvglStyleProps;
    /**
     * Style overrides for the "textarea_placeholder" part.
     * @yamlKey textarea_placeholder
     */
    textareaPlaceholder?: LvglStyleProps;
}
//
export interface LvglKeyboardProps extends LvglStyleProps {
    mode?: "TEXT_LOWER" | "TEXT_UPPER" | "SPECIAL" | "NUMBER";
    textarea?: unknown;
    /** Style overrides for the "items" part. */
    items?: LvglStyleProps;
}
//
export interface LvglLedProps extends LvglStyleProps {
    color?: BindProp<string | string>;
    brightness?: BindProp<unknown>;
}
//
export interface LvglBarProps extends LvglStyleProps {
    value?: BindProp<number>;
    /** @yamlKey start_value */
    startValue?: number;
    /** @yamlKey min_value */
    minValue?: number;
    /** @yamlKey max_value */
    maxValue?: number;
    mode?: "NORMAL" | "SYMMETRICAL" | "RANGE";
    animated?: "OFF" | "ON";
    /** Style overrides for the "indicator" part. */
    indicator?: LvglStyleProps;
}
//
export interface LvglMeterProps extends LvglStyleProps {
    scales?: unknown;
    /** Style overrides for the "indicator" part. */
    indicator?: LvglStyleProps;
    /** Style overrides for the "ticks" part. */
    ticks?: LvglStyleProps;
    /** Style overrides for the "items" part. */
    items?: LvglStyleProps;
}
//
export interface LvglQrcodeProps extends LvglStyleProps {
    text?: string | number;
    /** @yamlKey dark_color */
    darkColor?: string;
    /** @yamlKey light_color */
    lightColor?: string;
    size: number;
}
//
export interface LvglRollerProps extends LvglStyleProps {
    /** @yamlKey selected_index */
    selectedIndex?: number;
    /** @yamlKey selected_text */
    selectedText?: string;
    /** @yamlKey visible_row_count */
    visibleRowCount?: number;
    mode?: "NORMAL" | "INFINITE";
    options: unknown;
    /** Style overrides for the "selected" part. */
    selected?: LvglStyleProps;
}
//
export interface LvglSliderProps extends LvglStyleProps {
    value?: BindProp<number>;
    /** @yamlKey min_value */
    minValue?: number;
    /** @yamlKey max_value */
    maxValue?: number;
    mode?: "NORMAL" | "SYMMETRICAL" | "RANGE";
    animated?: "OFF" | "ON";
    /** Style overrides for the "indicator" part. */
    indicator?: LvglStyleProps;
    /** Style overrides for the "knob" part. */
    knob?: LvglStyleProps;
}
//
export interface LvglSpinboxProps extends LvglStyleProps {
    value?: BindProp<number>;
    /** @yamlKey range_from */
    rangeFrom?: number;
    /** @yamlKey range_to */
    rangeTo?: number;
    digits?: unknown;
    step?: unknown;
    /** @yamlKey selected_digit */
    selectedDigit?: number;
    /** @yamlKey decimal_places */
    decimalPlaces?: unknown;
    rollover?: boolean;
    /** Style overrides for the "scrollbar" part. */
    scrollbar?: LvglStyleProps;
    /** Style overrides for the "selected" part. */
    selected?: LvglStyleProps;
    /** Style overrides for the "cursor" part. */
    cursor?: LvglStyleProps;
    /**
     * Style overrides for the "textarea_placeholder" part.
     * @yamlKey textarea_placeholder
     */
    textareaPlaceholder?: LvglStyleProps;
}
//
export interface LvglSpinnerProps extends LvglStyleProps {
    /** @yamlKey arc_length */
    arcLength: number;
    /** @yamlKey spin_time */
    spinTime: number;
    /** Style overrides for the "indicator" part. */
    indicator?: LvglStyleProps;
}
//
export interface LvglSwitchProps extends LvglStyleProps {
    /** Style overrides for the "indicator" part. */
    indicator?: LvglStyleProps;
    /** Style overrides for the "knob" part. */
    knob?: LvglStyleProps;
}
//
export interface LvglTabviewProps extends LvglStyleProps {
    tabs: unknown;
    /** @yamlKey tab_style */
    tabStyle?: unknown;
    /** @yamlKey content_style */
    contentStyle?: unknown;
    position?: "LEFT" | "RIGHT" | "BOTTOM" | "TOP";
    size?: number | string | "SIZE_CONTENT";
}
//
export interface LvglLvTileviewTileTProps extends LvglStyleProps {
}
//
export interface LvglTileviewProps extends LvglStyleProps {
    tiles: unknown;
    /** Style overrides for the "scrollbar" part. */
    scrollbar?: LvglStyleProps;
}
/** Top-level <lvgl> component properties. */
//
export interface LvglProps {
    displays: unknown;
    /** @yamlKey color_depth */
    colorDepth?: "16";
    /** @yamlKey default_font */
    defaultFont?: string;
    /** @yamlKey full_refresh */
    fullRefresh?: boolean;
    /** @yamlKey update_when_display_idle */
    updateWhenDisplayIdle?: boolean;
    /** @yamlKey draw_rounding */
    drawRounding?: number;
    /** @yamlKey buffer_size */
    bufferSize?: unknown;
    /** @yamlKey log_level */
    logLevel?: "VERBOSE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "NONE";
    /** @yamlKey byte_order */
    byteOrder?: "big_endian" | "little_endian";
    /** @yamlKey style_definitions */
    styleDefinitions?: unknown;
    pages?: unknown;
    msgboxes?: unknown;
    /** @yamlKey page_wrap */
    pageWrap?: boolean;
    /** @yamlKey top_layer */
    topLayer?: unknown;
    /** @yamlKey transparency_key */
    transparencyKey?: string;
    theme?: unknown;
    gradients?: unknown;
    touchscreens?: unknown;
    encoders?: unknown;
    keypads?: unknown;
    /** @yamlKey resume_on_input */
    resumeOnInput?: boolean;
    /** @yamlKey disp_bg_image */
    dispBgImage?: string | RefProp<image_Image>;
    /** @yamlKey disp_bg_color */
    dispBgColor?: string;
    /** @yamlKey disp_bg_opa */
    dispBgOpa?: number | string;
}
//
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "lvgl-obj": LvglObjProps & ComponentProps;
            "lvgl-label": LvglLabelProps & ComponentProps;
            "lvgl-button": LvglButtonProps & ComponentProps;
            "lvgl-btnmatrix-btn": LvglBtnmatrixBtnProps & ComponentProps;
            "lvgl-buttonmatrix": LvglButtonmatrixProps & ComponentProps;
            "lvgl-page": LvglPageProps & ComponentProps;
            "lvgl-image": LvglImageProps & ComponentProps;
            "lvgl-animimg": LvglAnimimgProps & ComponentProps;
            "lvgl-arc": LvglArcProps & ComponentProps;
            "lvgl-line": LvglLineProps & ComponentProps;
            "lvgl-canvas": LvglCanvasProps & ComponentProps;
            "lvgl-checkbox": LvglCheckboxProps & ComponentProps;
            "lvgl-container": LvglContainerProps & ComponentProps;
            "lvgl-dropdown-list": LvglDropdownListProps & ComponentProps;
            "lvgl-dropdown": LvglDropdownProps & ComponentProps;
            "lvgl-textarea": LvglTextareaProps & ComponentProps;
            "lvgl-keyboard": LvglKeyboardProps & ComponentProps;
            "lvgl-led": LvglLedProps & ComponentProps;
            "lvgl-bar": LvglBarProps & ComponentProps;
            "lvgl-meter": LvglMeterProps & ComponentProps;
            "lvgl-qrcode": LvglQrcodeProps & ComponentProps;
            "lvgl-roller": LvglRollerProps & ComponentProps;
            "lvgl-slider": LvglSliderProps & ComponentProps;
            "lvgl-spinbox": LvglSpinboxProps & ComponentProps;
            "lvgl-spinner": LvglSpinnerProps & ComponentProps;
            "lvgl-switch": LvglSwitchProps & ComponentProps;
            "lvgl-tabview": LvglTabviewProps & ComponentProps;
            "lvgl-lv-tileview-tile-t": LvglLvTileviewTileTProps & ComponentProps;
            "lvgl-tileview": LvglTileviewProps & ComponentProps;
            lvgl: LvglProps & ComponentProps;
        }
    }
}
