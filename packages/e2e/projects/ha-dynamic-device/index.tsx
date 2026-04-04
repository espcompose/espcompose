/**
 * Sample project: ha-dynamic-device
 *
 * Demonstrates dynamic useHAEntity() with entity IDs passed as component
 * props. Tests:
 *   - Domain-hint overload: useHAEntity(props.entity, { domain: 'light' })
 *   - Reactive state passthrough: text={entity.stateText}
 *   - Action compilation with dynamic entity: entity.toggle()
 */
import { Display, useRef, useHAEntity } from '@espcompose/core';
import type { EspComposeElement, TriggerHandler } from '@espcompose/core';

/** Thin wrapper that adds typed trigger props to <lvgl-button>. */
function ActionButton(props: {
  x?: number; y?: number; width?: number; height?: number;
  onRelease?: TriggerHandler; children?: EspComposeElement | EspComposeElement[];
}) {
  const { onRelease, children, ...rest } = props;
  return (
    <lvgl-button
      {...rest}
      x:custom={onRelease != null ? { on_release: onRelease } : undefined}
    >
      {children}
    </lvgl-button>
  );
}

/**
 * Dynamic HA light component — receives entity ID as a prop.
 * Uses the domain-hint overload to get a typed LightBinding.
 */
function HALightControl(props: { entity: string; label: string }) {
  const light = useHAEntity(props.entity, { domain: 'light' });

  return (
    <>
      {/* Reactive state passthrough */}
      <lvgl-label
        x={10}
        y={10}
        text={light.stateText}
      />

      {/* Action with dynamic entity */}
      <ActionButton
        x={10}
        y={40}
        width={120}
        height={50}
        onRelease={() => {
          light.toggle();
        }}
      >
        <lvgl-label text={props.label} align="CENTER" />
      </ActionButton>
    </>
  );
}

function App() {
  const displayRef = useRef<Display>();

  return (
    <esphome name="ha-dynamic-device" comment="Dynamic HA entity binding demo">
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
          <HALightControl entity="light.office_main" label="Office" />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
