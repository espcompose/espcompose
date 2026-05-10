import { describe, it, expect } from 'vitest';
import type { SemanticIR, IRValue, IRUIRegistry } from '@espcompose/core/internals';
import { irScalar, irObject, irEntry, irArray, irRef, brandArray } from '@espcompose/core/internals';
import { transformIRForHost } from './host-ir-transform.js';

function makeIR(
  sections: Array<{ key: string; value: IRValue }>,
  ui?: IRUIRegistry,
): SemanticIR {
  return {
    kind: 'semantic_ir',
    sections: brandArray(sections.map(s => ({ kind: 'section' as const, ...s })), 'section_registry'),
    entities: brandArray([], 'entity_registry'),
    components: brandArray([], 'component_registry'),
    scripts: brandArray([], 'script_registry'),
    themes: brandArray([], 'theme_registry'),
    reactives: {
      kind: 'reactive_registry',
      bindings: [],
      memos: [],
      effects: [],
    },
    uis: ui ? [ui] : [],
  };
}

function makeUI(rotation?: number): IRUIRegistry {
  return {
    kind: 'ui_registry',
    lvgl: 'r_test_lvgl',
    config: {
      displays: irArray([irRef('r_disp')]),
      ...(rotation != null ? { rotation: irScalar(rotation) } : {}),
    },
    pages: [],
    widgets: [],
    overlays: [],
    animations: [],
    styleTransitions: [],
  };
}

describe('transformIRForHost', () => {
  it('replaces esp32 section with host', () => {
    const ir = makeIR([
      { key: 'esphome', value: irObject([irEntry('name', irScalar('test'))]) },
      { key: 'esp32', value: irObject([irEntry('board', irScalar('esp32dev'))]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.sections.map(s => s.key);

    expect(keys).toContain('host');
    expect(keys).not.toContain('esp32');
    expect(keys).toContain('esphome');

    const hostSection = result.sections.find(s => s.key === 'host')!;
    expect(hostSection.value).toEqual(irObject([
      irEntry('mac_address', irScalar('AC:BC:32:89:0E:A1')),
    ]));
  });

  it('replaces esp8266 section with host', () => {
    const ir = makeIR([
      { key: 'esp8266', value: irObject([irEntry('board', irScalar('d1_mini'))]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.sections.map(s => s.key);

    expect(keys).toContain('host');
    expect(keys).not.toContain('esp8266');
  });

  it('appends "(simulator)" to the device name', () => {
    const ir = makeIR([
      { key: 'esphome', value: irObject([irEntry('name', irScalar('my-device'))]) },
      { key: 'esp32', value: irObject([]) },
    ]);

    const result = transformIRForHost(ir);
    const esphome = result.sections.find(s => s.key === 'esphome')!;
    const obj = esphome.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(obj.entries.find(e => e.key === 'name')?.value).toEqual(irScalar('my-device-simulator'));
  });

  it('replaces display with SDL using inferred dimensions from model', () => {
    const ir = makeIR([
      {
        key: 'display',
        value: irObject([
          irEntry('platform', irScalar('ili9xxx')),
          irEntry('model', irScalar('ILI9341')),
          irEntry('id', irRef('r_display123')),
          irEntry('cs_pin', irScalar(5)),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const display = result.sections.find(s => s.key === 'display')!;

    expect(display.value.kind).toBe('object');
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const platform = obj.entries.find(e => e.key === 'platform');
    expect(platform?.value).toEqual(irScalar('sdl'));

    const dims = obj.entries.find(e => e.key === 'dimensions');
    expect(dims?.value.kind).toBe('object');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(320));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(240));
  });

  it('preserves display id for LVGL reference integrity', () => {
    const ir = makeIR([
      {
        key: 'display',
        value: irObject([
          irEntry('platform', irScalar('ili9xxx')),
          irEntry('model', irScalar('ILI9341')),
          irEntry('id', irRef('r_display123')),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const display = result.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const idEntry = obj.entries.find(e => e.key === 'id');
    expect(idEntry?.value).toEqual(irRef('r_display123'));
  });

  it('swaps dimensions for 270° LVGL rotation and strips rotation from lvglTree', () => {
    const ir = makeIR(
      [
        {
          key: 'display',
          value: irObject([
            irEntry('platform', irScalar('ili9xxx')),
            irEntry('model', irScalar('ILI9341')),
            irEntry('updateInterval', irScalar('1s')),
            irEntry('csPin', irScalar(5)),
            irEntry('dcPin', irScalar(27)),
          ]),
        },
      ],
      makeUI(270),
    );

    const result = transformIRForHost(ir);
    const display = result.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    // LVGL rotation baked into swapped dimensions (ILI9341 is 320×240 → 240×320 after 270°)
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(240));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(320));
    // updateInterval IS carried over
    expect(obj.entries.find(e => e.key === 'updateInterval')?.value).toEqual(irScalar('1s'));
    // Hardware-specific pin entries should NOT be carried over
    expect(obj.entries.find(e => e.key === 'csPin')).toBeUndefined();
    expect(obj.entries.find(e => e.key === 'dcPin')).toBeUndefined();
    // rotation stripped from lvglTree (baked into SDL dimensions)
    expect(result.uis[0]?.config.rotation).toBeUndefined();
    // other lvglTree props preserved
    expect(result.uis[0]?.config.displays).toBeDefined();
  });

  it('swaps dimensions for 90° LVGL rotation', () => {
    const ir = makeIR(
      [
        {
          key: 'display',
          value: irObject([
            irEntry('platform', irScalar('ili9xxx')),
            irEntry('dimensions', irObject([
              irEntry('width', irScalar(800)),
              irEntry('height', irScalar(1280)),
            ])),
          ]),
        },
      ],
      makeUI(90),
    );

    const result = transformIRForHost(ir);
    const display = result.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(1280));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(800));
  });

  it('does not swap dimensions for 0° or 180° LVGL rotation', () => {
    const ir = makeIR(
      [
        {
          key: 'display',
          value: irObject([
            irEntry('platform', irScalar('ili9xxx')),
            irEntry('dimensions', irObject([
              irEntry('width', irScalar(800)),
              irEntry('height', irScalar(1280)),
            ])),
          ]),
        },
      ],
      makeUI(180),
    );

    const result = transformIRForHost(ir);
    const display = result.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(800));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(1280));
  });

  it('preserves explicit dimensions from display config', () => {
    const ir = makeIR([
      {
        key: 'display',
        value: irObject([
          irEntry('platform', irScalar('sdl')),
          irEntry('dimensions', irObject([
            irEntry('width', irScalar(800)),
            irEntry('height', irScalar(600)),
          ])),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const display = result.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(800));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(600));
  });

  it('CLI width/height override takes precedence', () => {
    const ir = makeIR([
      {
        key: 'display',
        value: irObject([
          irEntry('platform', irScalar('ili9xxx')),
          irEntry('model', irScalar('ILI9341')),
        ]),
      },
    ]);

    const result = transformIRForHost(ir, { width: 1024, height: 768 });
    const display = result.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(1024));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(768));
  });

  it('replaces touchscreen with SDL', () => {
    const ir = makeIR([
      {
        key: 'touchscreen',
        value: irObject([
          irEntry('platform', irScalar('gt911')),
          irEntry('i2c_id', irRef('r_i2c_bus')),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const ts = result.sections.find(s => s.key === 'touchscreen')!;
    const obj = ts.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(obj.entries.find(e => e.key === 'platform')?.value).toEqual(irScalar('sdl'));
    expect(obj.entries).toHaveLength(1);
  });

  it('drops non-whitelisted sections (hardware-only)', () => {
    const ir = makeIR([
      { key: 'esphome', value: irObject([irEntry('name', irScalar('test'))]) },
      { key: 'esp32', value: irObject([]) },
      { key: 'spi', value: irObject([irEntry('clk_pin', irScalar(18))]) },
      { key: 'i2c', value: irObject([irEntry('sda', irScalar(21))]) },
      { key: 'wifi', value: irObject([irEntry('ssid', irScalar('test'))]) },
      { key: 'output', value: irObject([irEntry('platform', irScalar('ledc'))]) },
      { key: 'light', value: irObject([irEntry('platform', irScalar('monochromatic'))]) },
      { key: 'audio_adc', value: irObject([irEntry('platform', irScalar('es7210'))]) },
      { key: 'api', value: irObject([]) },
      { key: 'logger', value: irObject([irEntry('level', irScalar('DEBUG'))]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.sections.map(s => s.key);

    expect(keys).toEqual(['esphome', 'host', 'api', 'logger']);
  });

  it('drops unknown sections not in whitelist', () => {
    const ir = makeIR([
      { key: 'esphome', value: irObject([irEntry('name', irScalar('test'))]) },
      { key: 'some_custom_hardware', value: irObject([]) },
      { key: 'api', value: irObject([]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.sections.map(s => s.key);
    // host injected at front since no device platform was present
    expect(keys).toEqual(['host', 'esphome', 'api']);
  });

  it('leaves lvglTree unchanged when it has no rotation', () => {
    const tree = makeUI();
    const ir = makeIR(
      [
        { key: 'esphome', value: irObject([irEntry('name', irScalar('test'))]) },
        { key: 'api', value: irObject([]) },
      ],
      tree,
    );

    const result = transformIRForHost(ir);
    // Tree is rebuilt (config spread) but rotation remains absent
    expect(result.uis[0]?.config.rotation).toBeUndefined();
    expect(result.uis[0]?.config.displays).toBeDefined();
  });

  it('injects host section even when no device platform exists', () => {
    const ir = makeIR([
      { key: 'esphome', value: irObject([irEntry('name', irScalar('test'))]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.sections.map(s => s.key);
    expect(keys[0]).toBe('host');
  });

  it('includes a fake mac_address in the injected host section', () => {
    const ir = makeIR([
      { key: 'esp32', value: irObject([irEntry('board', irScalar('esp32dev'))]) },
    ]);

    const result = transformIRForHost(ir);
    const hostSection = result.sections.find(s => s.key === 'host')!;
    const obj = hostSection.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const mac = obj.entries.find(e => e.key === 'mac_address');
    expect(mac).toBeDefined();
    expect(mac!.value).toEqual(irScalar('AC:BC:32:89:0E:A1'));
  });

  it('uses default dimensions when model is unknown', () => {
    const ir = makeIR([
      {
        key: 'display',
        value: irObject([
          irEntry('platform', irScalar('mipi_dsi')),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const display = result.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(320));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(240));
  });

  it('handles display inside an array (multiple displays)', () => {
    const ir = makeIR([
      {
        key: 'display',
        value: irArray([
          irObject([
            irEntry('platform', irScalar('ili9xxx')),
            irEntry('model', irScalar('ILI9488')),
            irEntry('id', irRef('r_main_display')),
          ]),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const display = result.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(480));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(320));

    // id preserved from the first display in array
    const idEntry = obj.entries.find(e => e.key === 'id');
    expect(idEntry?.value).toEqual(irRef('r_main_display'));
  });

  it('does not mutate the input IR', () => {
    const ir = makeIR([
      { key: 'esp32', value: irObject([irEntry('board', irScalar('esp32dev'))]) },
      { key: 'wifi', value: irObject([irEntry('ssid', irScalar('test'))]) },
    ]);

    const originalSectionCount = ir.sections.length;
    transformIRForHost(ir);

    expect(ir.sections).toHaveLength(originalSectionCount);
    expect(ir.sections[0].key).toBe('esp32');
  });

  it('strips device-adjacent sections (esp32_hosted, esp_ldo, psram)', () => {
    const ir = makeIR([
      { key: 'esp32', value: irObject([]) },
      { key: 'esp32_hosted', value: irObject([]) },
      { key: 'esp_ldo', value: irObject([]) },
      { key: 'psram', value: irObject([]) },
      { key: 'api', value: irObject([]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.sections.map(s => s.key);
    expect(keys).toEqual(['host', 'api']);
  });

  it('preserves theme data unchanged', () => {
    const themeItem = {
      kind: 'theme_scope' as const,
      scope: 'test',
      scopeId: 'abc12345',
      names: ['dark'],
      defaultIndex: 0,
      values: new Map(),
    };
    const ir = makeIR([
      { key: 'esp32', value: irObject([]) },
    ]);
    ir.themes = brandArray([themeItem], 'theme_registry');

    const result = transformIRForHost(ir);
    expect(result.themes).toHaveLength(1);
    expect(result.themes[0]).toBe(themeItem);
  });

  it('strips hardware_uart and baud_rate from logger section', () => {
    const ir = makeIR([
      {
        key: 'logger',
        value: irObject([
          irEntry('level', irScalar('DEBUG')),
          irEntry('hardwareUart', irScalar('UART0')),
          irEntry('baudRate', irScalar(115200)),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const logger = result.sections.find(s => s.key === 'logger')!;
    const obj = logger.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const keys = obj.entries.map(e => e.key);
    expect(keys).toEqual(['level']);
    expect(obj.entries[0].value).toEqual(irScalar('DEBUG'));
  });

  it('preserves logger when it has no hardware-specific entries', () => {
    const loggerValue = irObject([irEntry('level', irScalar('INFO'))]);
    const ir = makeIR([
      { key: 'logger', value: loggerValue },
    ]);

    const result = transformIRForHost(ir);
    const logger = result.sections.find(s => s.key === 'logger')!;
    // Same reference since no entries were stripped
    expect(logger.value).toBe(loggerValue);
  });

  it('infers rotation from lvglTree even when display dimensions are explicit', () => {
    const ir = makeIR(
      [
        {
          key: 'display',
          value: irObject([
            irEntry('platform', irScalar('mipi_dsi')),
            irEntry('dimensions', irObject([
              irEntry('width', irScalar(800)),
              irEntry('height', irScalar(1280)),
            ])),
          ]),
        },
      ],
      makeUI(270),
    );

    const result = transformIRForHost(ir);
    const display = result.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    // 270° swaps 800×1280 → 1280×800
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(1280));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(800));
  });
});
