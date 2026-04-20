// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Reactive, RefProp, TriggerHandler } from "../../types";
import type { __marker_image_Image } from "../markers";
import type { CssStyleProps } from "../../style-types";
import type { HexColor } from "../../theme/hex-color";
/** Flat LVGL style properties (visual only). No state/part nesting, no layout props. */
//
export interface LvglStyleProps {
    /** @yamlKey anim_duration */
    animDuration?: number;
    /** @yamlKey anim_time */
    animTime?: Reactive<number>;
    /** @yamlKey arc_color */
    arcColor?: Reactive<HexColor>;
    /** @yamlKey arc_opa */
    arcOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey arc_rounded */
    arcRounded?: Reactive<boolean>;
    /** @yamlKey arc_width */
    arcWidth?: Reactive<number | string>;
    /** @yamlKey base_dir */
    baseDir?: "LTR" | "RTL" | "AUTO";
    /** @yamlKey bg_color */
    bgColor?: Reactive<HexColor>;
    /** @yamlKey bg_grad */
    bgGrad?: unknown;
    /** @yamlKey bg_grad_color */
    bgGradColor?: Reactive<HexColor>;
    /** @yamlKey bg_grad_dir */
    bgGradDir?: Reactive<string | ("NONE" | "HOR" | "VER")>;
    /** @yamlKey bg_grad_opa */
    bgGradOpa?: "TRANSP" | "COVER";
    /** @yamlKey bg_grad_stop */
    bgGradStop?: Reactive<unknown>;
    /** @yamlKey bg_image_opa */
    bgImageOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey bg_image_recolor */
    bgImageRecolor?: Reactive<HexColor>;
    /** @yamlKey bg_image_recolor_opa */
    bgImageRecolorOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey bg_image_src */
    bgImageSrc?: string | RefProp<__marker_image_Image>;
    /** @yamlKey bg_image_tiled */
    bgImageTiled?: Reactive<boolean>;
    /** @yamlKey bg_main_opa */
    bgMainOpa?: "TRANSP" | "COVER";
    /** @yamlKey bg_main_stop */
    bgMainStop?: Reactive<unknown>;
    /** @yamlKey bg_opa */
    bgOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey bitmap_mask_src */
    bitmapMaskSrc?: string | RefProp<__marker_image_Image>;
    /** @yamlKey blend_mode */
    blendMode?: "NORMAL" | "ADDITIVE" | "SUBTRACTIVE" | "MULTIPLY" | "DIFFERENCE";
    /** @yamlKey blur_backdrop */
    blurBackdrop?: boolean;
    /** @yamlKey blur_quality */
    blurQuality?: "AUTO" | "SPEED" | "PRECISION";
    /** @yamlKey blur_radius */
    blurRadius?: number;
    /** @yamlKey border_color */
    borderColor?: Reactive<HexColor>;
    /** @yamlKey border_opa */
    borderOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey border_post */
    borderPost?: Reactive<boolean>;
    /** @yamlKey border_side */
    borderSide?: Reactive<string | ("NONE" | "TOP" | "BOTTOM" | "LEFT" | "RIGHT" | "INTERNAL")>;
    /** @yamlKey border_width */
    borderWidth?: Reactive<number>;
    /** @yamlKey clip_corner */
    clipCorner?: Reactive<boolean>;
    /** @yamlKey color_filter_opa */
    colorFilterOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey drop_shadow_color */
    dropShadowColor?: HexColor;
    /** @yamlKey drop_shadow_offset_x */
    dropShadowOffsetX?: number;
    /** @yamlKey drop_shadow_offset_y */
    dropShadowOffsetY?: number;
    /** @yamlKey drop_shadow_opa */
    dropShadowOpa?: "TRANSP" | "COVER";
    /** @yamlKey drop_shadow_quality */
    dropShadowQuality?: "AUTO" | "SPEED" | "PRECISION";
    /** @yamlKey drop_shadow_radius */
    dropShadowRadius?: number;
    height?: Reactive<string | (number | string | "SIZE_CONTENT")>;
    /** @yamlKey image_opa */
    imageOpa?: "TRANSP" | "COVER";
    /** @yamlKey image_recolor */
    imageRecolor?: Reactive<HexColor>;
    /** @yamlKey image_recolor_opa */
    imageRecolorOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    length?: number | string;
    /** @yamlKey line_color */
    lineColor?: Reactive<HexColor>;
    /** @yamlKey line_dash_gap */
    lineDashGap?: Reactive<number>;
    /** @yamlKey line_dash_width */
    lineDashWidth?: Reactive<number>;
    /** @yamlKey line_opa */
    lineOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey line_rounded */
    lineRounded?: Reactive<boolean>;
    /** @yamlKey line_width */
    lineWidth?: Reactive<number>;
    /** @yamlKey margin_bottom */
    marginBottom?: number | string;
    /** @yamlKey margin_left */
    marginLeft?: number | string;
    /** @yamlKey margin_right */
    marginRight?: number | string;
    /** @yamlKey margin_top */
    marginTop?: number | string;
    /** @yamlKey max_height */
    maxHeight?: Reactive<number | string>;
    /** @yamlKey max_width */
    maxWidth?: Reactive<number | string>;
    /** @yamlKey min_height */
    minHeight?: Reactive<number | string>;
    /** @yamlKey min_width */
    minWidth?: Reactive<number | string>;
    opa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey opa_layered */
    opaLayered?: "TRANSP" | "COVER";
    /** @yamlKey outline_color */
    outlineColor?: Reactive<HexColor>;
    /** @yamlKey outline_opa */
    outlineOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey outline_pad */
    outlinePad?: Reactive<number | string>;
    /** @yamlKey outline_width */
    outlineWidth?: Reactive<number | string>;
    /** @yamlKey pad_all */
    padAll?: Reactive<number | string>;
    /** @yamlKey pad_bottom */
    padBottom?: Reactive<number | string>;
    /** @yamlKey pad_left */
    padLeft?: Reactive<number | string>;
    /** @yamlKey pad_radial */
    padRadial?: number | string;
    /** @yamlKey pad_right */
    padRight?: Reactive<number | string>;
    /** @yamlKey pad_top */
    padTop?: Reactive<number | string>;
    /** @yamlKey r_mod */
    rMod?: number | string;
    /** @yamlKey radial_offset */
    radialOffset?: number | string | "SIZE_CONTENT";
    radius?: Reactive<string | "CIRCLE">;
    recolor?: HexColor;
    /** @yamlKey recolor_opa */
    recolorOpa?: "TRANSP" | "COVER";
    /** @yamlKey rotary_sensitivity */
    rotarySensitivity?: number;
    /** @yamlKey shadow_color */
    shadowColor?: Reactive<HexColor>;
    /** @yamlKey shadow_offset_x */
    shadowOffsetX?: number;
    /** @yamlKey shadow_offset_y */
    shadowOffsetY?: number;
    /** @yamlKey shadow_ofs_x */
    shadowOfsX?: Reactive<number>;
    /** @yamlKey shadow_ofs_y */
    shadowOfsY?: Reactive<number>;
    /** @yamlKey shadow_opa */
    shadowOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey shadow_spread */
    shadowSpread?: Reactive<number>;
    /** @yamlKey shadow_width */
    shadowWidth?: Reactive<number>;
    /** @yamlKey text_align */
    textAlign?: Reactive<string | ("LEFT" | "CENTER" | "RIGHT" | "AUTO")>;
    /** @yamlKey text_color */
    textColor?: Reactive<HexColor>;
    /** @yamlKey text_decor */
    textDecor?: Reactive<string | ("NONE" | "UNDERLINE" | "STRIKETHROUGH")>;
    /** @yamlKey text_font */
    textFont?: Reactive<string | ("montserrat_8" | "montserrat_10" | "montserrat_12" | "montserrat_14" | "montserrat_16" | "montserrat_18" | "montserrat_20" | "montserrat_22" | "montserrat_24" | "montserrat_26" | "montserrat_28" | "montserrat_30" | "montserrat_32" | "montserrat_34" | "montserrat_36" | "montserrat_38" | "montserrat_40" | "montserrat_42" | "montserrat_44" | "montserrat_46" | "montserrat_48" | "dejavu_16_persian_hebrew" | "simsun_16_cjk" | "unscii_8" | "unscii_16")>;
    /** @yamlKey text_letter_space */
    textLetterSpace?: Reactive<number>;
    /** @yamlKey text_line_space */
    textLineSpace?: Reactive<number>;
    /** @yamlKey text_opa */
    textOpa?: Reactive<string | ("TRANSP" | "COVER")>;
    /** @yamlKey text_outline_stroke_color */
    textOutlineStrokeColor?: HexColor;
    /** @yamlKey text_outline_stroke_opa */
    textOutlineStrokeOpa?: "TRANSP" | "COVER";
    /** @yamlKey text_outline_stroke_width */
    textOutlineStrokeWidth?: number;
    /** @yamlKey transform_angle */
    transformAngle?: Reactive<number>;
    /** @yamlKey transform_height */
    transformHeight?: Reactive<number | string>;
    /** @yamlKey transform_pivot_x */
    transformPivotX?: number | string;
    /** @yamlKey transform_pivot_y */
    transformPivotY?: number | string;
    /** @yamlKey transform_rotation */
    transformRotation?: number;
    /** @yamlKey transform_scale */
    transformScale?: unknown;
    /** @yamlKey transform_scale_x */
    transformScaleX?: unknown;
    /** @yamlKey transform_scale_y */
    transformScaleY?: unknown;
    /** @yamlKey transform_skew_x */
    transformSkewX?: number;
    /** @yamlKey transform_skew_y */
    transformSkewY?: number;
    /** @yamlKey transform_width */
    transformWidth?: Reactive<number | string>;
    /** @yamlKey transform_zoom */
    transformZoom?: Reactive<unknown>;
    /** @yamlKey translate_radial */
    translateRadial?: number;
    /** @yamlKey translate_x */
    translateX?: Reactive<number | string>;
    /** @yamlKey translate_y */
    translateY?: Reactive<number | string>;
    width?: Reactive<string | (number | string | "SIZE_CONTENT")>;
    x?: Reactive<number | string>;
    y?: Reactive<number | string>;
}
/** All valid LVGL style property names in camelCase. Used for runtime validation. */
//
export const LVGL_STYLE_PROP_KEYS = new Set([
    "animDuration",
    "animTime",
    "arcColor",
    "arcOpa",
    "arcRounded",
    "arcWidth",
    "baseDir",
    "bgColor",
    "bgGrad",
    "bgGradColor",
    "bgGradDir",
    "bgGradOpa",
    "bgGradStop",
    "bgImageOpa",
    "bgImageRecolor",
    "bgImageRecolorOpa",
    "bgImageSrc",
    "bgImageTiled",
    "bgMainOpa",
    "bgMainStop",
    "bgOpa",
    "bitmapMaskSrc",
    "blendMode",
    "blurBackdrop",
    "blurQuality",
    "blurRadius",
    "borderColor",
    "borderOpa",
    "borderPost",
    "borderSide",
    "borderWidth",
    "clipCorner",
    "colorFilterOpa",
    "dropShadowColor",
    "dropShadowOffsetX",
    "dropShadowOffsetY",
    "dropShadowOpa",
    "dropShadowQuality",
    "dropShadowRadius",
    "height",
    "imageOpa",
    "imageRecolor",
    "imageRecolorOpa",
    "length",
    "lineColor",
    "lineDashGap",
    "lineDashWidth",
    "lineOpa",
    "lineRounded",
    "lineWidth",
    "marginBottom",
    "marginLeft",
    "marginRight",
    "marginTop",
    "maxHeight",
    "maxWidth",
    "minHeight",
    "minWidth",
    "opa",
    "opaLayered",
    "outlineColor",
    "outlineOpa",
    "outlinePad",
    "outlineWidth",
    "padAll",
    "padBottom",
    "padLeft",
    "padRadial",
    "padRight",
    "padTop",
    "rMod",
    "radialOffset",
    "radius",
    "recolor",
    "recolorOpa",
    "rotarySensitivity",
    "shadowColor",
    "shadowOffsetX",
    "shadowOffsetY",
    "shadowOfsX",
    "shadowOfsY",
    "shadowOpa",
    "shadowSpread",
    "shadowWidth",
    "textAlign",
    "textColor",
    "textDecor",
    "textFont",
    "textLetterSpace",
    "textLineSpace",
    "textOpa",
    "textOutlineStrokeColor",
    "textOutlineStrokeOpa",
    "textOutlineStrokeWidth",
    "transformAngle",
    "transformHeight",
    "transformPivotX",
    "transformPivotY",
    "transformRotation",
    "transformScale",
    "transformScaleX",
    "transformScaleY",
    "transformSkewX",
    "transformSkewY",
    "transformWidth",
    "transformZoom",
    "translateRadial",
    "translateX",
    "translateY",
    "width",
    "x",
    "y"
]) as ReadonlySet<string>;
//
export interface LvglAnimimgProps {
    /** @yamlKey auto_start */
    autoStart?: boolean;
    duration: number;
    /** @yamlKey repeat_count */
    repeatCount?: unknown;
    src: unknown;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglArcProps {
    adjustable?: boolean;
    /** @yamlKey change_rate */
    changeRate?: number;
    /** @yamlKey end_angle */
    endAngle?: number;
    /** @yamlKey max_value */
    maxValue?: Reactive<number>;
    /** @yamlKey min_value */
    minValue?: Reactive<number>;
    mode?: "NORMAL" | "REVERSE" | "SYMMETRICAL";
    rotation?: number;
    /** @yamlKey start_angle */
    startAngle?: number;
    value?: Reactive<number>;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `indicator`, `knob`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        indicator?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        knob?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: number;
    }>;
}
//
export interface LvglBarProps {
    animated?: "OFF" | "ON";
    /** @yamlKey max_value */
    maxValue?: Reactive<number>;
    /** @yamlKey min_value */
    minValue?: Reactive<number>;
    mode?: "NORMAL" | "SYMMETRICAL" | "RANGE";
    /** @yamlKey start_value */
    startValue?: number;
    value?: Reactive<number>;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `indicator`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        indicator?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: number;
    }>;
}
//
export interface LvglBtnmatrixBtnProps {
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: boolean;
    }>;
}
//
export interface LvglButtonProps {
    text?: Reactive<string | number>;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: boolean;
    }>;
}
//
export interface LvglButtonmatrixProps {
    /** @yamlKey button_text_list_id */
    buttonTextListId?: unknown;
    /** @yamlKey one_checked */
    oneChecked?: boolean;
    /** @yamlKey pad_column */
    padColumn?: number | string;
    /** @yamlKey pad_row */
    padRow?: number | string;
    rows: unknown;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `items`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        items?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: number;
    }>;
}
//
export interface LvglCanvasProps {
    /** @yamlKey draw_buf_id */
    drawBufId?: unknown;
    height: number | string | "SIZE_CONTENT";
    transparent?: boolean;
    width: number | string | "SIZE_CONTENT";
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglCheckboxProps {
    /** @yamlKey pad_column */
    padColumn?: number | string;
    text?: Reactive<string | number>;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `indicator`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        indicator?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: boolean;
    }>;
}
//
export interface LvglContainerProps {
    height?: number | string | "SIZE_CONTENT";
    width?: number | string | "SIZE_CONTENT";
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `scrollbar`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        scrollbar?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglDropdownProps {
    dir?: "LEFT" | "RIGHT" | "BOTTOM" | "TOP";
    /** @yamlKey dropdown_list */
    dropdownList?: unknown;
    options: Reactive<unknown>;
    /** @yamlKey selected_index */
    selectedIndex?: number;
    /** @yamlKey selected_text */
    selectedText?: string;
    symbol?: unknown;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `indicator`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        indicator?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: number;
        text: string;
    }>;
}
//
export interface LvglDropdownListProps {
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `selected`, `scrollbar`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        selected?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        scrollbar?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglImageProps {
    angle?: number;
    antialias?: boolean;
    mode?: unknown;
    /** @yamlKey offset_x */
    offsetX?: number | string | "SIZE_CONTENT";
    /** @yamlKey offset_y */
    offsetY?: number | string | "SIZE_CONTENT";
    /** @yamlKey pivot_x */
    pivotX?: number | string | "SIZE_CONTENT";
    /** @yamlKey pivot_y */
    pivotY?: number | string | "SIZE_CONTENT";
    rotation?: number;
    scale?: unknown;
    src: string | RefProp<__marker_image_Image>;
    zoom?: unknown;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglKeyboardProps {
    mode?: "TEXT_LOWER" | "TEXT_UPPER" | "SPECIAL" | "NUMBER";
    textarea?: unknown;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `items`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        items?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        text: string;
    }>;
}
//
export interface LvglLabelProps {
    /** @yamlKey long_mode */
    longMode?: "WRAP" | "DOT" | "SCROLL" | "SCROLL_CIRCULAR" | "CLIP";
    recolor?: boolean;
    text?: Reactive<string | number>;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `scrollbar`, `selected`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        scrollbar?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        selected?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        text: string;
    }>;
}
//
export interface LvglLedProps {
    brightness?: Reactive<unknown>;
    color?: Reactive<HexColor>;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglLineProps {
    points: unknown;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglLvTileviewTileTProps {
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglMeterProps {
    indicator?: unknown;
    pivot?: unknown;
    scales?: unknown;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `indicator`, `ticks`, `items`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        indicator?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        ticks?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        items?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglObjProps {
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `scrollbar`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        scrollbar?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglPageProps {
    /** @yamlKey on_load */
    onLoad?: unknown;
    /** @yamlKey on_unload */
    onUnload?: unknown;
    skip?: boolean;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglQrcodeProps {
    /** @yamlKey dark_color */
    darkColor?: HexColor;
    /** @yamlKey light_color */
    lightColor?: HexColor;
    size: number;
    text?: string | number;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglRollerProps {
    mode?: "NORMAL" | "INFINITE";
    options: unknown;
    /** @yamlKey selected_index */
    selectedIndex?: number;
    /** @yamlKey selected_text */
    selectedText?: string;
    /** @yamlKey visible_row_count */
    visibleRowCount?: number;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `selected`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        selected?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: number;
        text: string;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: number;
        text: string;
    }>;
}
//
export interface LvglSliderProps {
    animated?: "OFF" | "ON";
    /** @yamlKey max_value */
    maxValue?: Reactive<number>;
    /** @yamlKey min_value */
    minValue?: Reactive<number>;
    mode?: "NORMAL" | "SYMMETRICAL" | "RANGE";
    value?: Reactive<number>;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `indicator`, `knob`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        indicator?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        knob?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: number;
    }>;
}
//
export interface LvglSpinboxProps {
    /** @yamlKey decimal_places */
    decimalPlaces?: unknown;
    digits?: unknown;
    /** @yamlKey range_from */
    rangeFrom?: number;
    /** @yamlKey range_to */
    rangeTo?: number;
    rollover?: boolean;
    /** @yamlKey selected_digit */
    selectedDigit?: number;
    step?: unknown;
    value?: Reactive<number>;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `scrollbar`, `selected`, `cursor`, `textareaPlaceholder`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        scrollbar?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        selected?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        cursor?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        textareaPlaceholder?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: number;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: number;
    }>;
}
//
export interface LvglSpinnerProps {
    /** @yamlKey arc_length */
    arcLength?: unknown;
    /** @yamlKey spin_time */
    spinTime?: number;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `indicator`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        indicator?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
}
//
export interface LvglSwitchProps {
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `indicator`, `knob`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        indicator?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        knob?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: boolean;
    }>;
}
//
export interface LvglTabviewProps {
    /** @yamlKey content_style */
    contentStyle?: unknown;
    position?: "LEFT" | "RIGHT" | "BOTTOM" | "TOP";
    size?: number | string | "SIZE_CONTENT";
    /** @yamlKey tab_style */
    tabStyle?: unknown;
    tabs: unknown;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * This widget has no sub-parts.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
}
//
export interface LvglTextareaProps {
    /** @yamlKey accepted_chars */
    acceptedChars?: string;
    /** @yamlKey max_length */
    maxLength?: number;
    /** @yamlKey one_line */
    oneLine?: boolean;
    /** @yamlKey password_mode */
    passwordMode?: boolean;
    /** @yamlKey placeholder_text */
    placeholderText?: string;
    text?: Reactive<string | number>;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `scrollbar`, `selected`, `cursor`, `textareaPlaceholder`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        scrollbar?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        selected?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        cursor?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
        textareaPlaceholder?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_change */
    onChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_click */
    onClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_press */
    onPress?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler<{
        text: string;
    }>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        text: string;
    }>;
}
//
export interface LvglTileviewProps {
    tiles: unknown;
    /**
     * CSS-like style object. All visual properties must be specified here.
     * Supports parts: `scrollbar`.
     */
    style?: CssStyleProps & {
        checked?: CssStyleProps;
        focused?: CssStyleProps;
        focusKey?: CssStyleProps;
        edited?: CssStyleProps;
        hovered?: CssStyleProps;
        pressed?: CssStyleProps;
        scrolled?: CssStyleProps;
        disabled?: CssStyleProps;
        user1?: CssStyleProps;
        user2?: CssStyleProps;
        user3?: CssStyleProps;
        user4?: CssStyleProps;
    } & {
        scrollbar?: CssStyleProps & {
            checked?: CssStyleProps;
            focused?: CssStyleProps;
            focusKey?: CssStyleProps;
            edited?: CssStyleProps;
            hovered?: CssStyleProps;
            pressed?: CssStyleProps;
            scrolled?: CssStyleProps;
            disabled?: CssStyleProps;
            user1?: CssStyleProps;
            user2?: CssStyleProps;
            user3?: CssStyleProps;
            user4?: CssStyleProps;
        };
    } & {
        styles?: string | string[];
    };
    /** @yamlKey on_all_events */
    onAllEvents?: TriggerHandler;
    /** @yamlKey on_cancel */
    onCancel?: TriggerHandler;
    /** @yamlKey on_change */
    onChange?: TriggerHandler;
    /** @yamlKey on_child_change */
    onChildChange?: TriggerHandler;
    /** @yamlKey on_child_create */
    onChildCreate?: TriggerHandler;
    /** @yamlKey on_child_delete */
    onChildDelete?: TriggerHandler;
    /** @yamlKey on_click */
    onClick?: TriggerHandler;
    /** @yamlKey on_color_format_change */
    onColorFormatChange?: TriggerHandler;
    /** @yamlKey on_cover_check */
    onCoverCheck?: TriggerHandler;
    /** @yamlKey on_create */
    onCreate?: TriggerHandler;
    /** @yamlKey on_defocus */
    onDefocus?: TriggerHandler;
    /** @yamlKey on_delete */
    onDelete?: TriggerHandler;
    /** @yamlKey on_double_click */
    onDoubleClick?: TriggerHandler;
    /** @yamlKey on_draw_main */
    onDrawMain?: TriggerHandler;
    /** @yamlKey on_draw_main_begin */
    onDrawMainBegin?: TriggerHandler;
    /** @yamlKey on_draw_main_end */
    onDrawMainEnd?: TriggerHandler;
    /** @yamlKey on_draw_post */
    onDrawPost?: TriggerHandler;
    /** @yamlKey on_draw_post_begin */
    onDrawPostBegin?: TriggerHandler;
    /** @yamlKey on_draw_post_end */
    onDrawPostEnd?: TriggerHandler;
    /** @yamlKey on_draw_task_add */
    onDrawTaskAdd?: TriggerHandler;
    /** @yamlKey on_focus */
    onFocus?: TriggerHandler;
    /** @yamlKey on_gesture */
    onGesture?: TriggerHandler;
    /** @yamlKey on_get_self_size */
    onGetSelfSize?: TriggerHandler;
    /** @yamlKey on_hit_test */
    onHitTest?: TriggerHandler;
    /** @yamlKey on_hover_leave */
    onHoverLeave?: TriggerHandler;
    /** @yamlKey on_hover_over */
    onHoverOver?: TriggerHandler;
    /** @yamlKey on_indev_reset */
    onIndevReset?: TriggerHandler;
    /** @yamlKey on_insert */
    onInsert?: TriggerHandler;
    /** @yamlKey on_invalidate_area */
    onInvalidateArea?: TriggerHandler;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** @yamlKey on_layout_change */
    onLayoutChange?: TriggerHandler;
    /** @yamlKey on_leave */
    onLeave?: TriggerHandler;
    /** @yamlKey on_long_press */
    onLongPress?: TriggerHandler;
    /** @yamlKey on_long_press_repeat */
    onLongPressRepeat?: TriggerHandler;
    /** @yamlKey on_press */
    onPress?: TriggerHandler;
    /** @yamlKey on_press_lost */
    onPressLost?: TriggerHandler;
    /** @yamlKey on_pressing */
    onPressing?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
    /** @yamlKey on_refresh */
    onRefresh?: TriggerHandler;
    /** @yamlKey on_refr_ext_draw_size */
    onRefrExtDrawSize?: TriggerHandler;
    /** @yamlKey on_release */
    onRelease?: TriggerHandler;
    /** @yamlKey on_rotary */
    onRotary?: TriggerHandler;
    /** @yamlKey on_scroll */
    onScroll?: TriggerHandler;
    /** @yamlKey on_scroll_begin */
    onScrollBegin?: TriggerHandler;
    /** @yamlKey on_scroll_end */
    onScrollEnd?: TriggerHandler;
    /** @yamlKey on_scroll_throw_begin */
    onScrollThrowBegin?: TriggerHandler;
    /** @yamlKey on_short_click */
    onShortClick?: TriggerHandler;
    /** @yamlKey on_single_click */
    onSingleClick?: TriggerHandler;
    /** @yamlKey on_size_change */
    onSizeChange?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey on_style_change */
    onStyleChange?: TriggerHandler;
    /** @yamlKey on_triple_click */
    onTripleClick?: TriggerHandler;
    /** @yamlKey on_swipe_left */
    onSwipeLeft?: TriggerHandler;
    /** @yamlKey on_swipe_right */
    onSwipeRight?: TriggerHandler;
    /** @yamlKey on_swipe_bottom */
    onSwipeBottom?: TriggerHandler;
    /** @yamlKey on_swipe_top */
    onSwipeTop?: TriggerHandler;
    /** @yamlKey on_swipe_up */
    onSwipeUp?: TriggerHandler;
    /** @yamlKey on_swipe_down */
    onSwipeDown?: TriggerHandler;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
}
/** Top-level <lvgl> component properties. */
//
export interface LvglProps {
    /** @yamlKey buffer_size */
    bufferSize?: unknown;
    /** @yamlKey byte_order */
    byteOrder?: "big_endian" | "little_endian";
    /** @yamlKey color_depth */
    colorDepth?: "16";
    /** @yamlKey default_font */
    defaultFont?: string;
    /** @yamlKey disp_bg_color */
    dispBgColor?: HexColor;
    /** @yamlKey disp_bg_image */
    dispBgImage?: string | RefProp<__marker_image_Image>;
    /** @yamlKey disp_bg_opa */
    dispBgOpa?: number | string;
    displays: unknown;
    /** @yamlKey draw_rounding */
    drawRounding?: number;
    encoders?: unknown;
    /** @yamlKey full_refresh */
    fullRefresh?: boolean;
    gradients?: unknown;
    keypads?: unknown;
    /** @yamlKey log_level */
    logLevel?: "VERBOSE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "NONE";
    msgboxes?: unknown;
    /** @yamlKey page_wrap */
    pageWrap?: boolean;
    pages?: unknown;
    /** @yamlKey resume_on_input */
    resumeOnInput?: boolean;
    /** @yamlKey style_definitions */
    styleDefinitions?: unknown;
    theme?: unknown;
    /** @yamlKey top_layer */
    topLayer?: unknown;
    touchscreens?: unknown;
    /** @yamlKey transparency_key */
    transparencyKey?: HexColor;
    /** @yamlKey update_when_display_idle */
    updateWhenDisplayIdle?: boolean;
}
//
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "lvgl-animimg": LvglAnimimgProps & ComponentProps;
            "lvgl-arc": LvglArcProps & ComponentProps;
            "lvgl-bar": LvglBarProps & ComponentProps;
            "lvgl-btnmatrix-btn": LvglBtnmatrixBtnProps & ComponentProps;
            "lvgl-button": LvglButtonProps & ComponentProps;
            "lvgl-buttonmatrix": LvglButtonmatrixProps & ComponentProps;
            "lvgl-canvas": LvglCanvasProps & ComponentProps;
            "lvgl-checkbox": LvglCheckboxProps & ComponentProps;
            "lvgl-container": LvglContainerProps & ComponentProps;
            "lvgl-dropdown": LvglDropdownProps & ComponentProps;
            "lvgl-dropdown-list": LvglDropdownListProps & ComponentProps;
            "lvgl-image": LvglImageProps & ComponentProps;
            "lvgl-keyboard": LvglKeyboardProps & ComponentProps;
            "lvgl-label": LvglLabelProps & ComponentProps;
            "lvgl-led": LvglLedProps & ComponentProps;
            "lvgl-line": LvglLineProps & ComponentProps;
            "lvgl-lv-tileview-tile-t": LvglLvTileviewTileTProps & ComponentProps;
            "lvgl-meter": LvglMeterProps & ComponentProps;
            "lvgl-obj": LvglObjProps & ComponentProps;
            "lvgl-page": LvglPageProps & ComponentProps;
            "lvgl-qrcode": LvglQrcodeProps & ComponentProps;
            "lvgl-roller": LvglRollerProps & ComponentProps;
            "lvgl-slider": LvglSliderProps & ComponentProps;
            "lvgl-spinbox": LvglSpinboxProps & ComponentProps;
            "lvgl-spinner": LvglSpinnerProps & ComponentProps;
            "lvgl-switch": LvglSwitchProps & ComponentProps;
            "lvgl-tabview": LvglTabviewProps & ComponentProps;
            "lvgl-textarea": LvglTextareaProps & ComponentProps;
            "lvgl-tileview": LvglTileviewProps & ComponentProps;
            lvgl: LvglProps & ComponentProps;
        }
    }
}
