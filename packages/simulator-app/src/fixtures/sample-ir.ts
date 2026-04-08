import type { SemanticIR } from '@espcompose/core/internals';

/**
 * Sample SemanticIR fixture for standalone React app development.
 *
 * When running `pnpm dev` in the simulator-app without a simulate server,
 * this fixture provides a realistic IR to render in the viewport.
 */
export const sampleIR: SemanticIR = {
  kind: 'semantic_ir',
  esphome: {
    kind: 'esphome_data',
    sections: [
      {
        platform: 'lvgl',
        config: {
          kind: 'object',
          entries: [
            {
              key: 'pages',
              value: {
                kind: 'array',
                items: [
                  {
                    kind: 'object',
                    entries: [
                      { key: 'id', value: { kind: 'scalar', value: 'main_page' } },
                      {
                        key: 'widgets',
                        value: {
                          kind: 'array',
                          items: [
                            {
                              kind: 'object',
                              entries: [
                                { key: 'label', value: { kind: 'object', entries: [
                                  { key: 'text', value: { kind: 'scalar', value: 'Hello Simulator' } },
                                  { key: 'align', value: { kind: 'scalar', value: 'TOP_MID' } },
                                  { key: 'y', value: { kind: 'scalar', value: 20 } },
                                ]}},
                              ],
                            },
                            {
                              kind: 'object',
                              entries: [
                                { key: 'button', value: { kind: 'object', entries: [
                                  { key: 'text', value: { kind: 'scalar', value: 'Toggle Light' } },
                                  { key: 'align', value: { kind: 'scalar', value: 'CENTER' } },
                                ]}},
                              ],
                            },
                            {
                              kind: 'object',
                              entries: [
                                { key: 'label', value: { kind: 'object', entries: [
                                  { key: 'text', value: { kind: 'scalar', value: 'Sensor: 22°C' } },
                                  { key: 'align', value: { kind: 'scalar', value: 'BOTTOM_MID' } },
                                  { key: 'y', value: { kind: 'scalar', value: -20 } },
                                ]}},
                              ],
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
    haEntities: [
      { entityId: 'light.kitchen', domain: 'light', name: 'Kitchen Light' },
      { entityId: 'sensor.temperature', domain: 'sensor', name: 'Temperature' },
    ],
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
