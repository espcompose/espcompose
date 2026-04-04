/**
 * Sample project: design-system-device
 *
 * Demonstrates the high-level LVGL design system components:
 * Screen, VStack, HStack, Text, Button, Card, SliderField, SwitchField.
 */
import {
  Display,
  useRef,
} from '@espcompose/core';
import {
  Screen,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  SliderField,
  SwitchField,
  ThemeProvider,
  darkTheme,
} from '@espcompose/ui';

function App() {
  const displayRef = useRef<Display>();

  return (
    <esphome name="design-system-device" comment="Design system demo">
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
        <ThemeProvider themes={{ dark: darkTheme }}>
          <Screen padding="lg">
            <VStack>
              <Text variant="title" text="Smart Home" />

              <Card>
                <Text variant="subtitle" text="Living Room" />
                <SliderField label="Brightness" min={0} max={255} />
                <SwitchField label="Power" />
              </Card>

              <HStack align="SPACE_BETWEEN">
                <Button text="Turn On" status="success" size="sm" />
                <Button text="Turn Off" status="danger" size="sm" variant="outline" />
              </HStack>
            </VStack>
          </Screen>
        </ThemeProvider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
