import { describe, it, expect } from 'vitest';
import type { SemanticIR, IRValue } from '@espcompose/core/internals';
import { irScalar, irObject, irEntry, irArray, irRef } from '@espcompose/core/internals';
import { transformIRForHost } from './host-ir-transform.js';

function makeIR(sections: Array<{ key: string; value: IRValue }>): SemanticIR {
  return {
    kind: 'semantic_ir',
    esphome: {
      kind: 'esphome_data',
      sections: sections.map(s => ({ kind: 'section' as const, ...s })),
      haEntities: [],
      components: [],
      scripts: [],
    },
    espcompose: {
      kind: 'espcompose_data',
      reactive: {
        kind: 'reactive_data',
        bindings: [],
        memos: [],
        effects: [],
      },
    },
  };
}

describe('transformIRForHost', () => {
  it('replaces esp32 section with host', () => {
    const ir = makeIR([
      { key: 'esphome', value: irObject([irEntry('name', irScalar('test'))]) },
      { key: 'esp32', value: irObject([irEntry('board', irScalar('esp32dev'))]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.esphome.sections.map(s => s.key);

    expect(keys).toContain('host');
    expect(keys).not.toContain('esp32');
    expect(keys).toContain('esphome');

    const hostSection = result.esphome.sections.find(s => s.key === 'host')!;
    expect(hostSection.value).toEqual(irObject([]));
  });

  it('replaces esp8266 section with host', () => {
    const ir = makeIR([
      { key: 'esp8266', value: irObject([irEntry('board', irScalar('d1_mini'))]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.esphome.sections.map(s => s.key);

    expect(keys).toContain('host');
    expect(keys).not.toContain('esp8266');
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
    const display = result.esphome.sections.find(s => s.key === 'display')!;

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
    const display = result.esphome.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const idEntry = obj.entries.find(e => e.key === 'id');
    expect(idEntry?.value).toEqual(irRef('r_display123'));
  });

  it('swaps dimensions for 270° rotation and omits rotation from SDL', () => {
    const ir = makeIR([
      {
        key: 'display',
        value: irObject([
          irEntry('platform', irScalar('ili9xxx')),
          irEntry('model', irScalar('ILI9341')),
          irEntry('rotation', irScalar(270)),
          irEntry('update_interval', irScalar('1s')),
          irEntry('cs_pin', irScalar(5)),
          irEntry('dc_pin', irScalar(27)),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const display = result.esphome.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    // Rotation baked into swapped dimensions (ILI9341 is 320×240 → 240×320 after 270°)
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(240));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(320));
    // rotation NOT carried over to SDL
    expect(obj.entries.find(e => e.key === 'rotation')).toBeUndefined();
    // update_interval IS carried over
    expect(obj.entries.find(e => e.key === 'update_interval')?.value).toEqual(irScalar('1s'));
    // Hardware-specific pin entries should NOT be carried over
    expect(obj.entries.find(e => e.key === 'cs_pin')).toBeUndefined();
    expect(obj.entries.find(e => e.key === 'dc_pin')).toBeUndefined();
  });

  it('swaps dimensions for 90° rotation', () => {
    const ir = makeIR([
      {
        key: 'display',
        value: irObject([
          irEntry('platform', irScalar('ili9xxx')),
          irEntry('dimensions', irObject([
            irEntry('width', irScalar(800)),
            irEntry('height', irScalar(1280)),
          ])),
          irEntry('rotation', irScalar(90)),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const display = result.esphome.sections.find(s => s.key === 'display')!;
    const obj = display.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    const dims = obj.entries.find(e => e.key === 'dimensions');
    const dimsObj = dims!.value as { kind: 'object'; entries: Array<{ key: string; value: IRValue }> };
    expect(dimsObj.entries.find(e => e.key === 'width')?.value).toEqual(irScalar(1280));
    expect(dimsObj.entries.find(e => e.key === 'height')?.value).toEqual(irScalar(800));
  });

  it('does not swap dimensions for 0° or 180° rotation', () => {
    const ir = makeIR([
      {
        key: 'display',
        value: irObject([
          irEntry('platform', irScalar('ili9xxx')),
          irEntry('dimensions', irObject([
            irEntry('width', irScalar(800)),
            irEntry('height', irScalar(1280)),
          ])),
          irEntry('rotation', irScalar(180)),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const display = result.esphome.sections.find(s => s.key === 'display')!;
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
    const display = result.esphome.sections.find(s => s.key === 'display')!;
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
    const display = result.esphome.sections.find(s => s.key === 'display')!;
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
    const ts = result.esphome.sections.find(s => s.key === 'touchscreen')!;
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
    const keys = result.esphome.sections.map(s => s.key);

    expect(keys).toEqual(['esphome', 'host', 'api', 'logger']);
  });

  it('drops unknown sections not in whitelist', () => {
    const ir = makeIR([
      { key: 'esphome', value: irObject([irEntry('name', irScalar('test'))]) },
      { key: 'some_custom_hardware', value: irObject([]) },
      { key: 'api', value: irObject([]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.esphome.sections.map(s => s.key);
    // host injected at front since no device platform was present
    expect(keys).toEqual(['host', 'esphome', 'api']);
  });

  it('preserves non-hardware sections unchanged', () => {
    const lvglValue = irObject([
      irEntry('displays', irArray([irRef('r_disp')])),
      irEntry('pages', irArray([])),
    ]);
    const ir = makeIR([
      { key: 'esphome', value: irObject([irEntry('name', irScalar('test'))]) },
      { key: 'api', value: irObject([]) },
      { key: 'logger', value: irObject([irEntry('level', irScalar('DEBUG'))]) },
      { key: 'lvgl', value: lvglValue },
    ]);

    const result = transformIRForHost(ir);
    const lvgl = result.esphome.sections.find(s => s.key === 'lvgl')!;
    expect(lvgl.value).toBe(lvglValue);
  });

  it('injects host section even when no device platform exists', () => {
    const ir = makeIR([
      { key: 'esphome', value: irObject([irEntry('name', irScalar('test'))]) },
    ]);

    const result = transformIRForHost(ir);
    const keys = result.esphome.sections.map(s => s.key);
    expect(keys[0]).toBe('host');
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
    const display = result.esphome.sections.find(s => s.key === 'display')!;
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
    const display = result.esphome.sections.find(s => s.key === 'display')!;
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

    const originalSectionCount = ir.esphome.sections.length;
    transformIRForHost(ir);

    expect(ir.esphome.sections).toHaveLength(originalSectionCount);
    expect(ir.esphome.sections[0].key).toBe('esp32');
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
    const keys = result.esphome.sections.map(s => s.key);
    expect(keys).toEqual(['host', 'api']);
  });

  it('preserves espcompose data unchanged', () => {
    const ir = makeIR([
      { key: 'esp32', value: irObject([]) },
    ]);
    ir.espcompose = {
      kind: 'espcompose_data',
      reactive: {
        kind: 'reactive_data',
        bindings: [],
        memos: [],
        effects: [],
      },
      themeScopes: [{
        kind: 'theme_scope_data',
        scope: 'test',
        scopeId: 'abc12345',
        themeNames: ['dark'],
        defaultIndex: 0,
        leafData: new Map(),
      }],
    };

    const result = transformIRForHost(ir);
    expect(result.espcompose).toBe(ir.espcompose);
  });

  it('strips hardware_uart and baud_rate from logger section', () => {
    const ir = makeIR([
      {
        key: 'logger',
        value: irObject([
          irEntry('level', irScalar('DEBUG')),
          irEntry('hardware_uart', irScalar('UART0')),
          irEntry('baud_rate', irScalar(115200)),
        ]),
      },
    ]);

    const result = transformIRForHost(ir);
    const logger = result.esphome.sections.find(s => s.key === 'logger')!;
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
    const logger = result.esphome.sections.find(s => s.key === 'logger')!;
    // Same reference since no entries were stripped
    expect(logger.value).toBe(loggerValue);
  });
});
