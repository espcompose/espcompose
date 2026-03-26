/**
 * Sample project: ha-binding-device
 *
 * Demonstrates the useHAEntity() hook binding Home Assistant entities to
 * LVGL widgets with automatic two-way reactive wiring, plus using LVGL
 * button events to trigger HA entity actions.
 *
 * The compiler should:
 *   1. Auto-generate `binary_sensor platform: homeassistant` imports for
 *      each entity referenced via useHAEntity().
 *   2. Serialize Expression<T> props as `!lambda` initial values.
 *   3. Inject `on_state:` / `on_value:` triggers on the auto-generated
 *      sensors that push state updates into bound LVGL widgets via
 *      `lvgl.<widget>.update`.
 *   4. Compile `kitchenLight.toggle()` inside an LVGL button's onRelease
 *      into a `homeassistant.action` YAML block.
 */
import { Display, ESPCompose, useRef, useHAEntity } from '@esphome/compose';
import type { EspComposeElement, TriggerHandler } from '@esphome/compose';

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

export default (() => {
  const displayRef = useRef<Display>();

  // Bind two HA entities
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
            x={10}
            y={10}
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
            <lvgl-label text="Toggle" align="CENTER" />
          </ActionButton>

          {/* Temperature readout — bound to HA sensor entity */}
          <lvgl-label
            x={10}
            y={100}
            text={tempSensor.stateText}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
})();
