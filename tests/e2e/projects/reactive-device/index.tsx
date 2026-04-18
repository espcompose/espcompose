/**
 * Sample project: reactive-device
 *
 * Demonstrates local Ref<T> reactive property access — a local sensor
 * component's `.value` is bound to an LVGL label widget via Expression<T>,
 * plus using an LVGL button event to control an HA entity.
 */
import { DisplayRef, useRef, useHAEntity, createLvglWidget, LVGL_INTENTS } from '@espcompose/core';
import type { InternalTemperatureSensorRef, EspComposeElement, TriggerHandler } from '@espcompose/core';

interface ActionButtonProps {
  x?: number; y?: number; width?: number; height?: number;
  onRelease?: TriggerHandler; children?: EspComposeElement | EspComposeElement[];
}

/** Thin wrapper that adds typed trigger props to <lvgl-button>. */
const ActionButton = createLvglWidget(
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

function App() {
  const displayRef = useRef<DisplayRef>();
  const tempRef = useRef<InternalTemperatureSensorRef>();
  const heater = useHAEntity('switch.space_heater');

  return (
    <esphome name="reactive-device" comment="Local ref reactive binding demo">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <api />
      <logger level="DEBUG" />

      {/* Local temperature sensor */}
      <sensor
        platform="internal_temperature"
        ref={tempRef}
        name="ESP Temperature"
      />

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
          {/* Temperature readout — bound to local sensor ref */}
          <lvgl-label
            style={{ left: 10, top: 10 }}
            text={tempRef.value}
          />

          {/* Toggle heater via HA action on button release */}
          <ActionButton
            x={10}
            y={50}
            width={120}
            height={50}
            onRelease={() => {
              heater.toggle();
            }}
          >
            <lvgl-label text="Heater" style={{ placeSelf: 'center' }} />
          </ActionButton>

          {/* Part-specific reactive binding: slider indicator color bound to HA entity */}
          <lvgl-slider
            style={{
              left: 10,
              top: 120,
              width: 200,
              indicator: { backgroundOpacity: heater.isOn ? 'opaque' : 'transparent' },
            }}
          />

          {/* State-specific reactive binding: button pressed bg_opa bound to HA entity */}
          <lvgl-button
            style={{
              left: 10,
              top: 160,
              pressed: { backgroundOpacity: heater.isOn ? 'opaque' : 'transparent' },
            }}
          >
            <lvgl-label text="Styled" style={{ placeSelf: 'center' }} />
          </lvgl-button>

          {/* Part+state combo: slider indicator pressed bg_opa */}
          <lvgl-slider
            style={{
              left: 10,
              top: 210,
              width: 200,
              indicator: { pressed: { backgroundOpacity: heater.isOn ? 'opaque' : 'transparent' } },
            }}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
