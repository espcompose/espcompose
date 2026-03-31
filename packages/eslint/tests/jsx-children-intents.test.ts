import { createRuleTester } from './shared-setup';
import rule from '../src/rules/jsx-children-intents';

const ruleTester = createRuleTester();

ruleTester.run('jsx-children-intents', rule, {
  valid: [
    // ─── ESPHome root accepts infrastructure children ────────────────────
    {
      name: 'wifi inside esphome',
      code: `<esphome><wifi /></esphome>`,
    },
    {
      name: 'api inside esphome',
      code: `<esphome><api /></esphome>`,
    },
    {
      name: 'logger inside esphome',
      code: `<esphome><logger /></esphome>`,
    },
    {
      name: 'multiple infrastructure children inside esphome',
      code: `
        <esphome>
          <wifi />
          <api />
          <logger />
          <ota />
        </esphome>
      `,
    },

    // ─── ESPHome root accepts platform children ──────────────────────────
    {
      name: 'sensor inside esphome',
      code: `<esphome><sensor /></esphome>`,
    },
    {
      name: 'binary_sensor inside esphome',
      code: `<esphome><binary_sensor /></esphome>`,
    },
    {
      name: 'light inside esphome',
      code: `<esphome><light /></esphome>`,
    },
    {
      name: 'script inside esphome',
      code: `<esphome><script /></esphome>`,
    },

    // ─── ESPHome root accepts display children ───────────────────────────
    {
      name: 'display inside esphome',
      code: `<esphome><display /></esphome>`,
    },
    {
      name: 'touchscreen inside esphome',
      code: `<esphome><touchscreen /></esphome>`,
    },

    // ─── ESPHome root accepts lvgl:root ──────────────────────────────────
    {
      name: 'lvgl inside esphome',
      code: `<esphome><lvgl /></esphome>`,
    },

    // ─── LVGL accepts page and widget children ──────────────────────────
    {
      name: 'lvgl-page inside lvgl',
      code: `<lvgl><lvgl-page /></lvgl>`,
    },
    {
      name: 'lvgl-label (widget) inside lvgl',
      code: `<lvgl><lvgl-label /></lvgl>`,
    },
    {
      name: 'lvgl-button (container) inside lvgl',
      code: `<lvgl><lvgl-button /></lvgl>`,
    },

    // ─── LVGL page accepts widgets and containers ────────────────────────
    {
      name: 'lvgl-label inside lvgl-page',
      code: `
        <lvgl>
          <lvgl-page>
            <lvgl-label />
          </lvgl-page>
        </lvgl>
      `,
    },
    {
      name: 'lvgl-button inside lvgl-page',
      code: `
        <lvgl>
          <lvgl-page>
            <lvgl-button />
          </lvgl-page>
        </lvgl>
      `,
    },
    {
      name: 'lvgl-slider inside lvgl-page',
      code: `
        <lvgl>
          <lvgl-page>
            <lvgl-slider />
          </lvgl-page>
        </lvgl>
      `,
    },

    // ─── Nested LVGL: widget inside container ────────────────────────────
    {
      name: 'lvgl-label inside lvgl-button',
      code: `
        <lvgl>
          <lvgl-page>
            <lvgl-button>
              <lvgl-label />
            </lvgl-button>
          </lvgl-page>
        </lvgl>
      `,
    },

    // ─── Full valid device tree ──────────────────────────────────────────
    {
      name: 'full valid device tree',
      code: `
        <esphome>
          <wifi />
          <api />
          <logger />
          <display />
          <touchscreen />
          <lvgl>
            <lvgl-page>
              <lvgl-button>
                <lvgl-label />
              </lvgl-button>
              <lvgl-slider />
              <lvgl-switch />
            </lvgl-page>
          </lvgl>
          <sensor />
          <binary_sensor />
        </esphome>
      `,
    },

    // ─── Custom components (PascalCase) are pass-through ─────────────────
    {
      name: 'unbranded component inside esphome is pass-through',
      code: `<esphome><MyComponent /></esphome>`,
    },
    {
      name: 'unbranded component inside lvgl-page is pass-through',
      code: `
        <lvgl>
          <lvgl-page>
            <MyWidget />
          </lvgl-page>
        </lvgl>
      `,
    },

    // ─── No constraining parent (top-level) ──────────────────────────────
    {
      name: 'elements at top level with no constraining parent',
      code: `<div><wifi /></div>`,
    },

    // ─── Containers inside containers ────────────────────────────────────
    {
      name: 'lvgl-obj inside lvgl-obj',
      code: `
        <lvgl>
          <lvgl-page>
            <lvgl-obj>
              <lvgl-obj>
                <lvgl-label />
              </lvgl-obj>
            </lvgl-obj>
          </lvgl-page>
        </lvgl>
      `,
    },
  ],

  invalid: [
    // ─── Infrastructure in wrong context ─────────────────────────────────
    {
      name: 'wifi inside lvgl (wrong intent)',
      code: `<lvgl><wifi /></lvgl>`,
      errors: [{ messageId: 'invalidChildIntent' }],
    },
    {
      name: 'api inside lvgl-page (wrong intent)',
      code: `
        <lvgl>
          <lvgl-page>
            <api />
          </lvgl-page>
        </lvgl>
      `,
      errors: [{ messageId: 'invalidChildIntent' }],
    },

    // ─── LVGL elements in ESPHome root ───────────────────────────────────
    {
      name: 'lvgl-label directly inside esphome (wrong intent)',
      code: `<esphome><lvgl-label /></esphome>`,
      errors: [{ messageId: 'invalidChildIntent' }],
    },
    {
      name: 'lvgl-button directly inside esphome (wrong intent)',
      code: `<esphome><lvgl-button /></esphome>`,
      errors: [{ messageId: 'invalidChildIntent' }],
    },
    {
      name: 'lvgl-page directly inside esphome (wrong intent)',
      code: `<esphome><lvgl-page /></esphome>`,
      errors: [{ messageId: 'invalidChildIntent' }],
    },

    // ─── Platform components in LVGL context ─────────────────────────────
    {
      name: 'sensor inside lvgl (wrong intent)',
      code: `<lvgl><sensor /></lvgl>`,
      errors: [{ messageId: 'invalidChildIntent' }],
    },
    {
      name: 'binary_sensor inside lvgl-page (wrong intent)',
      code: `
        <lvgl>
          <lvgl-page>
            <binary_sensor />
          </lvgl-page>
        </lvgl>
      `,
      errors: [{ messageId: 'invalidChildIntent' }],
    },

    // ─── Leaf widget rejects children ────────────────────────────────────
    {
      name: 'lvgl-label (leaf) rejects lvgl-label child',
      code: `
        <lvgl>
          <lvgl-page>
            <lvgl-label>
              <lvgl-label />
            </lvgl-label>
          </lvgl-page>
        </lvgl>
      `,
      errors: [{ messageId: 'invalidChildIntent' }],
    },
    {
      name: 'lvgl-slider (leaf) rejects lvgl-label child',
      code: `
        <lvgl>
          <lvgl-page>
            <lvgl-slider>
              <lvgl-label />
            </lvgl-slider>
          </lvgl-page>
        </lvgl>
      `,
      errors: [{ messageId: 'invalidChildIntent' }],
    },

    // ─── Page in wrong context ───────────────────────────────────────────
    {
      name: 'lvgl-page inside lvgl-page (page is not a widget)',
      code: `
        <lvgl>
          <lvgl-page>
            <lvgl-page />
          </lvgl-page>
        </lvgl>
      `,
      errors: [{ messageId: 'invalidChildIntent' }],
    },

    // ─── Unbranded intrinsic in constrained parent ───────────────────────
    {
      name: 'unknown intrinsic element inside lvgl (no intents)',
      code: `<lvgl><some_unknown_element /></lvgl>`,
      errors: [{ messageId: 'noIntentsOnChild' }],
    },

    // ─── Multiple errors in one tree ─────────────────────────────────────
    {
      name: 'multiple invalid children reported',
      code: `
        <lvgl>
          <wifi />
          <sensor />
        </lvgl>
      `,
      errors: [
        { messageId: 'invalidChildIntent' },
        { messageId: 'invalidChildIntent' },
      ],
    },

    // ─── Cross-domain nesting ────────────────────────────────────────────
    {
      name: 'esphome inside lvgl (root inside root)',
      code: `<lvgl><esphome /></lvgl>`,
      errors: [{ messageId: 'invalidChildIntent' }],
    },
    {
      name: 'lvgl inside lvgl-button (root inside container)',
      code: `
        <lvgl>
          <lvgl-page>
            <lvgl-button>
              <lvgl />
            </lvgl-button>
          </lvgl-page>
        </lvgl>
      `,
      errors: [{ messageId: 'invalidChildIntent' }],
    },

    // ─── Display component in LVGL context ───────────────────────────────
    {
      name: 'display inside lvgl (wrong intent)',
      code: `<lvgl><display /></lvgl>`,
      errors: [{ messageId: 'invalidChildIntent' }],
    },
  ],
});
