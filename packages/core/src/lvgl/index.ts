export { buildLvglSection, isLvglElement, lvglWidgetToPlain } from './serialize';

export { LVGL_UPDATABLE_WIDGETS, LVGL_REACTIVE_STYLE_PROPS, LVGL_PART_NAMES, LVGL_STATE_NAMES } from './widget-tables';

export {
  setLvglYamlEmitter,
  setLvglWidgetEmitter,
  getLvglYamlEmitter,
  getLvglWidgetEmitter,
  clearLvglYamlEmitters,
  setYamlShaper,
  getYamlShaper,
  clearYamlShaper,
} from './yaml-hook';
export type { LvglWidgetTreeEmitter, LvglWidgetEmitter, YamlShaper } from './yaml-hook';

export * from './style/index';
export * from './canvas/index';
