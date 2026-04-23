import { lambda, useRef } from '@espcompose/core';
import type { SwitchRef, FloatOutputRef, LightOutputRef } from '@espcompose/core';

function App() {
  const outputRef = useRef<FloatOutputRef>();
  const lightRef = useRef<LightOutputRef>();
  const switchRef = useRef<SwitchRef>();

  return (
    <esphome name="lambda-action-device" comment="Device demonstrating lambda() inline C++ action">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="pass1234" />
      <api />
      <logger level="DEBUG" />
      <output platform="ledc" ref={outputRef} pin={19} frequency="1000Hz" />
      <light ref={lightRef} platform="monochromatic" name="Desk Light" output={outputRef} />
      <switch ref={switchRef} platform="gpio" pin={5} name="Relay" />

      {/* Simple lambda — no interpolations */}
      <binary_sensor
        platform="gpio" pin={4} name="Button A"
        onPress={async () => {
          lambda`ESP_LOGD("custom", "Button A pressed!");`;
        }}
      />

      {/* Lambda with ref interpolations */}
      <binary_sensor
        platform="gpio" pin={12} name="Button B"
        onPress={async () => {
          lambda`id(${lightRef}).turn_on().set_brightness(0.75).perform();`;
        }}
        onRelease={async () => {
          lambda`id(${switchRef}).turn_off(); id(${lightRef}).turn_off().perform();`;
        }}
      />

      {/* Lambda with literal interpolation */}
      <binary_sensor
        platform="gpio" pin={13} name="Button C"
        onPress={async () => {
          lambda`ESP_LOGI("custom", "Value is %d", ${42});`;
        }}
      />
    </esphome>
  );
}

export default <App />;
