/**
 * Sample project: lvgl-device
 *
 * A minimal device with a single-page LVGL layout containing a button widget
 * that wraps a label. Demonstrates the low-level <lvgl-*> intrinsic elements.
 */
import { Display, defineProject, useRef } from '@esphome/compose';

const displayRef = useRef<Display>();

export default defineProject({
  device: (
    <esphome name="lvgl-device" comment="LVGL single-page button demo">
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
        <lvgl-page>
          <lvgl-button x={10} y={10} width={120} height={50}>
            <lvgl-label text="Click me" align="CENTER" />
          </lvgl-button>
        </lvgl-page>
      </lvgl>
    </esphome>
  ),
});
