/**
 * Sample project: image-font-device
 *
 * Tests the useImage() and useFont() hooks:
 *   - useImage creates an image component and returns a typed ref
 *   - useFont creates a font component and returns a typed ref
 *   - Duplicate calls with same props are deduplicated (single entry)
 *   - Different props produce separate entries
 *   - Asset pipeline copies image files with content-hash names
 *   - gfonts:// URIs are left as-is (not copied)
 */
import { DisplayRef, useRef, useImage, useFont } from '@espcompose/core';

function App() {
  const displayRef = useRef<DisplayRef>();

  // Two images: same file + props → should dedup to ONE entry
  const icon1 = useImage({ file: './assets/icon.png', type: 'RGB', resize: '32x32', transparency: 'alpha_channel' });
  const icon2 = useImage({ file: './assets/icon.png', type: 'RGB', resize: '32x32', transparency: 'alpha_channel' });

  // Different type → should produce a SECOND entry
  const iconBinary = useImage({ file: './assets/icon.png', type: 'BINARY' });

  // Font from Google Fonts (gfonts:// URI — asset pipeline skips it)
  const roboto = useFont({ file: 'gfonts://Roboto', size: 20 });

  // Duplicate font call — same props → should dedup
  const roboto2 = useFont({ file: 'gfonts://Roboto', size: 20 });

  // Different size → separate entry
  const robotoLarge = useFont({ file: 'gfonts://Roboto', size: 32 });

  return (
    <esphome name="image-font-device" comment="useImage/useFont hook demo">
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
          {/* Both icon1 and icon2 should resolve to the same ref (dedup) */}
          <lvgl-image style={{ left: 10, top: 10 }} src={icon1} />
          <lvgl-image style={{ left: 50, top: 10 }} src={icon2} />

          {/* iconBinary is a separate image entry */}
          <lvgl-image style={{ left: 90, top: 10 }} src={iconBinary} />

          {/* Labels using font refs — cast to string since textFont expects string */}
          <lvgl-label style={{ left: 10, top: 60, font: roboto as unknown as string }} text="Small" />
          <lvgl-label style={{ left: 10, top: 90, font: roboto2 as unknown as string }} text="Also small" />
          <lvgl-label style={{ left: 10, top: 120, font: robotoLarge as unknown as string }} text="Large" />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
