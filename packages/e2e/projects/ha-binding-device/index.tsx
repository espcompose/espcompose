/**
 * Sample project: ha-binding-device
 *
 * Demonstrates useHAEntity() binding Home Assistant entities to
 * LVGL widgets with automatic two-way reactive wiring, plus using LVGL
 * button events to trigger HA entity actions.
 */
import { DisplayRef, useRef, useHAEntity } from '@espcompose/core';
import type { EspComposeElement, TriggerHandler } from '@espcompose/core';

/** Thin wrapper that adds typed trigger props to <lvgl-button>. */
function ActionButton(props: {
  x?: number; y?: number; width?: number; height?: number;
  onRelease?: TriggerHandler; children?: EspComposeElement | EspComposeElement[];
}) {
  const { onRelease, children, x, y, width, height } = props;
  return (
    <lvgl-button
      style={{ left: x, top: y, width, height }}
      x:custom={onRelease != null ? { on_release: onRelease } : undefined}
    >
      {children}
    </lvgl-button>
  );
}

function App() {
  const displayRef = useRef<DisplayRef>();
  const kitchenLight = useHAEntity('light.kitchen_floods');
  const tempSensor = useHAEntity('sensor.living_room_temperature');

  return (
    <esphome name="ha-binding-device" comment="HA entity binding demo">
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
          {/* Light status label — bound to HA light entity */}
          <lvgl-label
            style={{ left: 10, top: 10 }}
            text={kitchenLight.stateText}
          />

          {/* Toggle button — onRelease calls HA light.toggle */}
          <ActionButton
            x={10}
            y={40}
            width={120}
            height={50}
            onRelease={() => {
              kitchenLight.toggle();
            }}
          >
            <lvgl-label text="Toggle" style={{ placeSelf: 'center' }} />
          </ActionButton>

          {/* Temperature readout — bound to HA sensor entity */}
          <lvgl-label
            style={{ left: 10, top: 100 }}
            text={tempSensor.stateText}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
