export { lowerLvglWidgetTree, lowerLvglWidget } from './yaml-emitter';
export type { LvglValueLoweringContext } from './yaml-emitter';

export { LVGL_PART_FLAGS, LVGL_STATE_FLAGS } from './selector-flags';

export { LVGL_STYLE_PROP_TABLE, resolveLvglStyleConstant } from './style-prop-table';
export type { LvglStylePropDescriptor } from './style-prop-table';

export { translateLvglStyleValues } from './style-value-translate';

export { extractPaintScenesFromIR, transformEcCanvasWidgets, injectEcCanvasDrawActions } from './canvas-lowering';
export type { EcCanvasPaintScene, PaintPrimitive } from './canvas-lowering';
