/**
 * E2E test: attached-trigger-device
 *
 * Demonstrates the useAttachedTrigger hook: a library component attaches
 * trigger actions to LVGL pages it references but doesn't own.
 *
 * Verifies:
 * - Contributed onLoad trigger creates new action on page without existing trigger
 * - Contributed onLoad trigger appends after user-authored actions (merge ordering)
 * - Multiple contributions are sorted by sourceId for determinism
 */
import { useRef, useAttachedTrigger, logger, createLvglWidget } from '@espcompose/core';
import type { DisplayRef, Ref } from '@espcompose/core';

/**
 * Library component that attaches an onLoad logger action to a referenced page.
 * Simulates a PageTabs-style component that reacts to page lifecycle events.
 */
const PageTracker = createLvglWidget<{ page: Ref; label: string }>(
  (props) => {
    useAttachedTrigger(props.page, 'onLoad', () => {
      logger.log('PageTracker: page loaded');
    });

    return <lvgl-label text={`Tab: ${props.label}`} />;
  },
);

/**
 * Second component that also attaches to the same event, testing multi-source merge.
 */
const PageLogger = createLvglWidget<{ target: Ref }>(
  (props) => {
    useAttachedTrigger(props.target, 'onLoad', () => {
      logger.log('PageLogger: loaded');
    });

    return <lvgl-label text="Logger active" />;
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();
  const page1Ref = useRef();
  const page2Ref = useRef();

  return (
    <esphome name="attached-trigger-device" comment="useAttachedTrigger E2E test">
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
        {/* Page 1: no user-authored onLoad — contributed trigger creates it */}
        <lvgl-page ref={page1Ref}>
          <lvgl-label text="Page 1" />
        </lvgl-page>

        {/* Page 2: has user-authored onLoad — contributed trigger appends after */}
        <lvgl-page
          ref={page2Ref}
          onLoad={() => { logger.log('User: page 2 loaded'); }}
        >
          <lvgl-label text="Page 2" />
        </lvgl-page>

        {/* PageTracker attaches onLoad to both pages */}
        <lvgl-page>
          <PageTracker page={page1Ref} label="home" />
          <PageTracker page={page2Ref} label="settings" />
          {/* PageLogger also attaches to page1 — tests multi-source merge */}
          <PageLogger target={page1Ref} />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
