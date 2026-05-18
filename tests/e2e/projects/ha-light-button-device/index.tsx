import { DisplayRef, useRef } from '@espcompose/core';
import { Screen, VStack, Text, HALightButton, UITheme } from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="ha-light-button-device" comment="HALightButton E2E">
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
        dataRate="40MHz"
        csPin={5}
        dcPin={27}
        resetPin={33}
      />

      <lvgl displays={[displayRef]}>
        <UITheme.Provider default="dark">
          <Screen padding="lg">
            <VStack gap="md">
              <Text variant="title" text="HA Light Buttons" />
              <HALightButton entityId="light.kitchen" label="Kitchen" />
              <HALightButton entityId="light.bedroom" label="Bedroom" />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
