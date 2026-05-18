/**
 * E2E test: style-transition-device
 *
 * Validates declarative LVGL style transitions end-to-end:
 * - `transition` sidecar key in inline style → C++ lv_style_transition_dsc_t
 * - Per-state transitions (pressed state on a button)
 * - Multiple descriptors (different timing per property group)
 * - useStyleTransition() hook contributing transitions via the contribution system
 */
import { useRef, useStyleTransition, createLvglWidget } from '@espcompose/core';
import type { DisplayRef } from '@espcompose/core';

/**
 * A button with inline style transitions on the pressed state.
 */
const TransitionButton = createLvglWidget<{ label: string }>(
  (props) => {
    return (
      <lvgl-button
        style={{
          width: 200,
          height: 60,
          backgroundColor: '#2196F3',
          pressed: {
            backgroundColor: '#1565C0',
            opacity: '80%',
            transition: [
              { properties: ['backgroundColor'], duration: '300ms', easing: 'ease-out' },
              { properties: ['opacity'], duration: '150ms', easing: 'linear' },
            ],
          },
        }}
      >
        <lvgl-label text={props.label} style={{ placeSelf: 'center', color: '#FFFFFF' }} />
      </lvgl-button>
    );
  },
);

/**
 * A panel where transitions are contributed via useStyleTransition() hook.
 */
const HookTransitionPanel = createLvglWidget<{ text: string }>(
  (props) => {
    const panelRef = useRef();

    useStyleTransition(panelRef, [
      { properties: ['backgroundColor', 'opacity'], duration: '200ms', easing: 'ease-in-out' },
    ], { state: 'pressed' });

    return (
      <lvgl-obj
        ref={panelRef}
        style={{
          width: '100%',
          height: 80,
          backgroundColor: '#4CAF50',
          pressed: {
            backgroundColor: '#388E3C',
            opacity: '80%',
          },
        }}
      >
        <lvgl-label text={props.text} style={{ placeSelf: 'center' }} />
      </lvgl-obj>
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();
  return (
    <esphome name="style-transition-device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />

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
        <lvgl-page style={{ display: 'flex', flexDirection: 'column', rowGap: 16, padding: 16 }}>
          <TransitionButton label="Animated Press" />
          <HookTransitionPanel text="Hook Transition" />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
