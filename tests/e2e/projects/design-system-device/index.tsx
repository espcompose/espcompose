/**
 * Sample project: design-system-device
 *
 * Demonstrates the high-level LVGL design system components:
 * Screen, VStack, HStack, Text, Button, Card, Slider, Switch.
 */
import {
  DisplayRef,
  useRef,
  ThemeProvider,
} from '@espcompose/core';
import {
  Screen,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  Slider,
  Switch,
  darkTheme,
  UI_THEME_SCOPE,
} from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();

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
        <ThemeProvider scope={UI_THEME_SCOPE} themes={{ dark: darkTheme }}>
          <Screen padding="lg">
            <VStack>
              <Text variant="title" text="Smart Home" />

              <Card>
                <Text variant="subtitle" text="Living Room" />
                <Slider label="Brightness" min={0} max={255} />
                <Switch label="Power" />
              </Card>

              <HStack align="spaceBetween">
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
