/**
 * E2E test: boot-screen-device
 *
 * Exercises LVGL page navigation actions for a boot screen pattern:
 * - Multi-page LVGL setup (boot screen + main screen)
 * - Boot page with skip: true (excluded from page cycling)
 * - lvgl-bar widget as loading indicator
 * - useImage() for logo display
 * - api.onClientConnected triggers lvgl.page.next to navigate past boot screen
 * - LvglComponentRef for page navigation actions
 */
import {
  DisplayRef,
  LvglComponentRef,
  useRef,
  useImage,
} from '@espcompose/core';
import {
  Screen,
  Text,
  VStack,
  UITheme,
} from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();
  const lvgl = useRef<LvglComponentRef>();

  const logo = useImage({ file: './assets/logo.png', type: 'RGB', resize: '100x100', transparency: 'alpha_channel' });

  return (
    <esphome name="boot-screen-device" comment="Boot screen + page navigation test">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="TestWifi" password="testpass" />
      <api
        onClientConnected={() => {
          lvgl.pageNext({ animation: 'FADE_IN', time: '300ms' });
        }}
      />
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

      <lvgl ref={lvgl} displays={[displayRef]}>
        <UITheme.Provider>
          {/* Boot screen — shown on startup, skipped in page cycling */}
          <Screen skip>
            <VStack align="center">
              <lvgl-image src={logo} />
              <Text variant="title" text="Booting..." />
              <lvgl-bar
                style={{ width: 150, height: 10 }}
                value={50}
              />
              <Text variant="caption" text="Waiting for Home Assistant..." />
            </VStack>
          </Screen>

          {/* Main screen — navigated to via lvgl.page.next on HA connect */}
          <Screen>
            <VStack>
              <Text variant="title" text="Connected!" />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
