import type { SemanticIR } from '@espcompose/core/internals';

function entry(key: string, value: Exclude<SemanticIR['esphome']['sections'][number]['value'], never>): { kind: 'entry'; key: string; value: typeof value } {
  return { kind: 'entry', key, value };
}

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
        kind: 'section',
        key: 'lvgl',
        value: {
          kind: 'object',
          entries: [
            entry('pages', {
                kind: 'array',
                items: [
                  {
                    kind: 'object',
                    entries: [
                      entry('id', { kind: 'scalar', value: 'main_page' }),
                      entry('widgets', {
                          kind: 'array',
                          items: [
                            {
                              kind: 'object',
                              entries: [
                                entry('label', { kind: 'object', entries: [
                                  entry('text', { kind: 'scalar', value: 'Hello Simulator' }),
                                  entry('align', { kind: 'scalar', value: 'TOP_MID' }),
                                  entry('y', { kind: 'scalar', value: 20 }),
                                ]}),
                              ],
                            },
                            {
                              kind: 'object',
                              entries: [
                                entry('button', { kind: 'object', entries: [
                                  entry('text', { kind: 'scalar', value: 'Toggle Light' }),
                                  entry('align', { kind: 'scalar', value: 'CENTER' }),
                                ]}),
                              ],
                            },
                            {
                              kind: 'object',
                              entries: [
                                entry('label', { kind: 'object', entries: [
                                  entry('text', { kind: 'scalar', value: 'Sensor: 22°C' }),
                                  entry('align', { kind: 'scalar', value: 'BOTTOM_MID' }),
                                  entry('y', { kind: 'scalar', value: -20 }),
                                ]}),
                              ],
                            },
                          ],
                        }),
                    ],
                  },
                ],
              }),
          ],
        },
      },
    ],
    haEntities: [
      {
        kind: 'ha_entity',
        entityId: 'light.kitchen',
        domain: 'light',
        sensorType: 'binary_sensor',
        generatedId: 'ha_light_kitchen',
      },
      {
        kind: 'ha_entity',
        entityId: 'sensor.temperature',
        domain: 'sensor',
        sensorType: 'sensor',
        generatedId: 'ha_sensor_temperature',
      },
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
