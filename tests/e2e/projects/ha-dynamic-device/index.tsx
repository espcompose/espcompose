/**
 * Sample project: ha-dynamic-device
 *
 * Demonstrates dynamic useHAEntity() with entity IDs passed as component
 * props. Tests:
 *   - Domain-hint overload: useHAEntity(props.entity, { domain: 'light' })
 *   - Reactive state passthrough: text={entity.stateText}
 *   - Action compilation with dynamic entity: entity.toggle()
 */
import { DisplayRef, useRef, useHAEntity, createWidget, LVGL_INTENTS } from '@espcompose/core';
import type { EspComposeElement, TriggerHandler } from '@espcompose/core';

interface ActionButtonProps {
  x?: number; y?: number; width?: number; height?: number;
  onRelease?: TriggerHandler; children?: EspComposeElement | EspComposeElement[];
}

/** Thin wrapper that adds typed trigger props to <lvgl-button>. */
const ActionButton = createWidget(
  (props: ActionButtonProps) => {
    const { onRelease, children, x, y, width, height } = props;
    return (
      <lvgl-button
        style={{ left: x, top: y, width, height }}
        x:custom={onRelease != null ? { on_release: onRelease } : undefined}
      >
        {children}
      </lvgl-button>
    );
  },
  { allowedChildIntents: [LVGL_INTENTS.WIDGET] as const },
);

interface HALightControlProps {
  entity: string;
  label: string;
}

/**
 * Dynamic HA light component — receives entity ID as a prop.
 * Uses the domain-hint overload to get a typed LightBinding.
 */
const HALightControl = createWidget(
  (props: HALightControlProps) => {
    const light = useHAEntity(props.entity, { domain: 'light' });

    return (
      <>
        {/* Reactive state passthrough */}
        <lvgl-label
          style={{ left: 10, top: 10 }}
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
          <lvgl-label text={props.label} style={{ placeSelf: 'center' }} />
        </ActionButton>
      </>
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();

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
