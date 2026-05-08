/**
 * E2E test: page-nav-device
 *
 * Demonstrates PageNav component placed inside an overlay tier so it is
 * rendered once into LVGL's `top_layer` and remains visible across all pages
 * — no per-page duplication.
 *
 * Verifies:
 * - PageNav renders buttons for each item
 * - PageNav's internal useAttachedTrigger still attaches onLoad to each page ref
 * - Closure variable `i` is captured per-iteration (expr:closure_read)
 * - Global activeIndex is set via resolved literal action
 * - Page navigation via pageShow() action on button press
 * - Overlay-hosted nav: a single PageNav lives in top_layer and is shown on
 *   each page's onLoad so it persists across page transitions.
 */
import { useRef, useOverlay, useAttachedTrigger } from '@espcompose/core';
import type { DisplayRef } from '@espcompose/core';
import { Screen, Text, VStack, PageNav, UITheme } from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();
  const homePage = useRef();
  const settingsPage = useRef();
  const aboutPage = useRef();

  const navItems = [
    { id: 'home', label: 'Home', page: homePage },
    { id: 'settings', label: 'Settings', page: settingsPage },
    { id: 'about', label: 'About', page: aboutPage },
  ];

  // Single PageNav rendered into the overlay tier (LVGL top_layer).
  // It persists across page switches — no per-Screen duplication needed.
  const nav = useOverlay({ zOrder: 0 }, () => (
    <PageNav items={navItems} />
  ));

  // Show the overlay on each page's onLoad so it re-asserts visibility
  // after any page transition.
  useAttachedTrigger(homePage, 'onLoad', () => { nav.show(); });
  useAttachedTrigger(settingsPage, 'onLoad', () => { nav.show(); });
  useAttachedTrigger(aboutPage, 'onLoad', () => { nav.show(); });

  return (
    <esphome name="page-nav-device" comment="PageNav E2E test">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="TestWifi" password="testpass" />
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
        <UITheme.Provider>
          <Screen ref={homePage} padding="md">
            <VStack>
              <Text variant="title" text="Home" />
            </VStack>
          </Screen>

          <Screen ref={settingsPage} padding="md">
            <VStack>
              <Text variant="title" text="Settings" />
            </VStack>
          </Screen>

          <Screen ref={aboutPage} padding="md">
            <VStack>
              <Text variant="title" text="About" />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
