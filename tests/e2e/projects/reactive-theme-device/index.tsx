/**
 * E2E project: reactive-theme-device
 *
 * Validates the reactive theme system end-to-end:
 *   - Two themes (dark + light) registered via ThemeProvider
 *   - theme.select() buttons switching between them
 *   - Screen, Text, Card, Slider, Button all receiving reactive theme tokens
 *
 * Expected compiler output:
 *   - theme_index Signal + per-leaf Memo declarations (value arrays)
 *   - Widget bindings for bg_color, text_color, text_font, padding
 *   - theme.select() → theme_index.set(N) + flush() in action lambdas
 */
import { DisplayRef, useRef, theme, ThemeProvider } from '@espcompose/core';
import {
  Screen,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  Slider,
  darkTheme,
  lightTheme,
  UI_THEME_SCOPE,
} from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="reactive-theme-device" comment="Reactive theme switching E2E">
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
        <ThemeProvider scope={UI_THEME_SCOPE} themes={{ dark: darkTheme, light: lightTheme }} default="dark">
          <Screen padding="lg">
            <VStack>
              <Text variant="title" text="Theme Test" />

              <Card>
                <Text variant="subtitle" text="Controls" />
                <Slider label="Brightness" min={0} max={255} />
              </Card>

              <HStack>
                <Button
                  text="Dark"
                  status="primary"
                  onPress={() => { theme.select('espcompose:ui', 'dark'); }}
                />
                <Button
                  text="Light"
                  status="secondary"
                  onPress={() => { theme.select('espcompose:ui', 'light'); }}
                />
              </HStack>
            </VStack>
          </Screen>
        </ThemeProvider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
