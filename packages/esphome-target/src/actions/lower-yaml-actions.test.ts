import { describe, it, expect } from 'vitest';
import type { SemanticIR, IRValue } from '@espcompose/core/internals';
import { brandArray } from '@espcompose/core/internals';
import { lowerToYamlConfig } from '../lower-yaml.js';

function makeIR(sections: Array<{ key: string; value: IRValue }>): SemanticIR {
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
  };
}

describe('lowerToYamlConfig action lowering', () => {
  it('resolves ref-bound id values for lvgl.page.show actions', () => {
    const ir = makeIR([
      {
        key: 'on_boot',
        value: {
          kind: 'action',
          actions: [
            {
              kind: 'action:native',
              domain: 'lvgl',
              operation: 'page.show',
              config: { id: 'mainScreen' },
            },
          ],
          refBindings: {
            mainScreen: 'main_screen_token',
          },
        },
      },
    ]);

    const yamlConfig = lowerToYamlConfig(ir, null);
    const onBoot = yamlConfig.on_boot as unknown[];

    expect(onBoot).toHaveLength(1);
    expect(onBoot[0]).toEqual({
      'lvgl.page.show': {
        id: 'main_screen_token',
      },
    });
  });
});
