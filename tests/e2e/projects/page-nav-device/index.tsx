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
import { useRef, useOverlay, useAttachedTrigger, createLvglWidget } from '@espcompose/core';
import type { DisplayRef, Ref } from '@espcompose/core';
import { Screen, Text, VStack, PageNav, UITheme } from '@espcompose/ui';

/**
 * NavHost — lives inside the <lvgl> tree so useOverlay() has access to
 * the LvglContext.  Renders a persistent PageNav into the overlay tier.
 */
const NavHost = createLvglWidget(
  ({ pages }: { pages: { id: string; label: string; page: Ref }[] }) => {
    const nav = useOverlay({ zOrder: 0 }, () => (
      <PageNav items={pages} />
    ));

    // Show the overlay on each page's onLoad so it re-asserts visibility
    // after any page transition.
    for (const item of pages) {
      useAttachedTrigger(item.page, 'onLoad', () => { nav.show(); });
    }

    // NavHost itself renders nothing — its output lives in the overlay.
    return <></>;
  },
);

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
          <NavHost pages={navItems} />

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
