/**
 * Sample project: reactive-device
 *
 * Demonstrates local Ref<T> reactive property access — a local sensor
 * component's `.value` is bound to an LVGL label widget via Expression<T>,
 * plus using an LVGL button event to control an HA entity.
 */
import { Display, useRef, useHAEntity } from '@espcompose/core';
import type { internal_temperature_InternalTemperatureSensor, EspComposeElement, TriggerHandler } from '@espcompose/core';

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

function App() {
  const displayRef = useRef<Display>();
  const tempRef = useRef<internal_temperature_InternalTemperatureSensor>();
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
            x={10}
            y={10}
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
            <lvgl-label text="Heater" align="CENTER" />
          </ActionButton>

          {/* Part-specific reactive binding: slider indicator color bound to HA entity */}
          <lvgl-slider
            x={10}
            y={120}
            width={200}
            indicator={{ bgOpa: heater.isOn ? 'COVER' : 'TRANSP' }}
          />

          {/* State-specific reactive binding: button pressed bg_opa bound to HA entity */}
          <lvgl-button
            x={10}
            y={160}
            pressed={{ bgOpa: heater.isOn ? 'COVER' : 'TRANSP' }}
          >
            <lvgl-label text="Styled" align="CENTER" />
          </lvgl-button>

          {/* Part+state combo: slider indicator pressed bg_opa */}
          <lvgl-slider
            x={10}
            y={210}
            width={200}
            indicator={{ pressed: { bgOpa: heater.isOn ? 'COVER' : 'TRANSP' } }}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
