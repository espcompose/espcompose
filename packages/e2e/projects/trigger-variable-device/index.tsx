/**
 * Sample project: trigger-variable-device
 *
 * Exercises two compiler features:
 *
 * 1. TriggerHandler arrow functions inside variable initializers:
 *    - Direct arrow: `const handler = () => { binding.toggle(); }`
 *    - Nullish coalescing: `const handler = props.onPress ?? (() => { ... })`
 *    - Ternary branches: `const handler = cond ? () => { a() } : () => { b() }`
 *
 * 2. Primitive (non-signal) slots in useMemo expressions:
 *    - Template literals with props: `useMemo(() => \`${props.label}: ${signal}\`)`
 *    - Ternary with string concat: `useMemo(() => signal ? \`${label} On\` : \`${label} Off\`)`
 */
import { DisplayRef, useRef, useHAEntity, useMemo } from '@espcompose/core';
import type { TriggerHandler, LightBinding } from '@espcompose/core';

// ── Component 1: TriggerHandler in ?? fallback ─────────────────────────

function ToggleButton(props: {
  binding: LightBinding;
  label: string;
  onPress?: TriggerHandler;
}) {
  // Compiler must detect the arrow in the ?? right-hand side
  const onPress = props.onPress ?? (() => { props.binding.toggle(); });

  // Primitive slot: props.label (a plain string) inside useMemo
  const text = useMemo(() => (props.binding.isOn ? `${props.label} On` : `${props.label} Off`));

  return (
    <lvgl-button x:custom={{ on_press: onPress }}>
      <lvgl-label text={text} />
    </lvgl-button>
  );
}

// ── Component 2: Direct TriggerHandler variable ────────────────────────

function DirectToggle(props: { binding: LightBinding }) {
  // Direct arrow in variable initializer (no ??)
  const handler: TriggerHandler = () => { props.binding.toggle(); };

  return (
    <lvgl-button x:custom={{ on_press: handler }}>
      <lvgl-label text="Direct" />
    </lvgl-button>
  );
}

// ── Component 3: Ternary TriggerHandler variable ───────────────────────

function ConditionalToggle(props: {
  binding: LightBinding;
  useTurnOff: boolean;
}) {
  // Ternary: both branches are arrows that need compilation
  const handler: TriggerHandler = props.useTurnOff
    ? () => { props.binding.turnOff(); }
    : () => { props.binding.toggle(); };

  return (
    <lvgl-button x:custom={{ on_press: handler }}>
      <lvgl-label text="Conditional" />
    </lvgl-button>
  );
}

// ── Component 4: Primitive slot in useMemo (string interpolation) ──────

function SensorLabel(props: {
  binding: LightBinding;
  label: string;
}) {
  // props.label is a plain string, binding.stateText is a Signal
  const text = useMemo(() => `${props.label}: ${props.binding.stateText}`);

  return <lvgl-label text={text} />;
}

// ── Root ────────────────────────────────────────────────────────────────

function App() {
  const displayRef = useRef<DisplayRef>();
  const light = useHAEntity('light.office');

  return (
    <esphome name="trigger-variable-device" comment="Trigger variable and primitive slot tests">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <api />
      <logger level="DEBUG" />

      <spi clkPin={18} mosiPin={23} />

      <display
        platform="ili9xxx"
        ref={displayRef}
        model="ILI9341"
        invertColors={false}
        csPin={5}
        dcPin={27}
        resetPin={33}
      />

      <lvgl displays={[displayRef]}>
        <lvgl-page>
          <ToggleButton binding={light} label="Office" />
          <DirectToggle binding={light} />
          <ConditionalToggle binding={light} useTurnOff={false} />
          <SensorLabel binding={light} label="Light" />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
