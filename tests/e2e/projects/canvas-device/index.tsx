/**
 * Sample project: canvas-device
 *
 * Demonstrates ec-canvas composited rendering: paint primitives
 * drawn below widget content inside an LVGL-compatible host container.
 */
import { DisplayRef, useRef } from '@espcompose/core';

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="canvas-device" comment="ec-canvas demo">
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
          {/* Card-like canvas with painted background and widget content */}
          <ec-canvas style={{ width: 280, height: 120, display: 'flex', flexDirection: 'column', padding: 12 }}>
            <ec-canvas-background>
              <ec-rect x={0} y={0} width={280} height={120} fill="#1a1a2e" radius={12} />
              <ec-line x1={16} y1={80} x2={264} y2={80} stroke="#333366" strokeWidth={1} />
            </ec-canvas-background>
            <ec-canvas-content>
              <lvgl-label text="Canvas Card" />
            </ec-canvas-content>
          </ec-canvas>

          {/* Simple status indicator — paint only, no widget content */}
          <ec-canvas style={{ width: 48, height: 48 }}>
            <ec-canvas-background>
              <ec-rect x={0} y={0} width={48} height={48} fill="#4caf50" radius={24} />
            </ec-canvas-background>
          </ec-canvas>

          {/* Arc gauge ring */}
          <ec-canvas style={{ width: 120, height: 120 }}>
            <ec-canvas-background>
              <ec-arc cx={60} cy={60} radius={50} startAngle={135} endAngle={315} stroke="#555577" strokeWidth={6} />
              <ec-arc cx={60} cy={60} radius={50} startAngle={135} endAngle={270} stroke="#00e676" strokeWidth={6} rounded />
            </ec-canvas-background>
          </ec-canvas>

          {/* Polygon triangle indicator */}
          <ec-canvas style={{ width: 80, height: 80 }}>
            <ec-canvas-background>
              <ec-polygon
                points={[{ x: 40, y: 5 }, { x: 75, y: 70 }, { x: 5, y: 70 }]}
                fill="#ff9800"
                stroke="#ffffff"
                strokeWidth={2}
              />
            </ec-canvas-background>
          </ec-canvas>

          {/* Canvas text */}
          <ec-canvas style={{ width: 200, height: 40 }}>
            <ec-canvas-overlay>
              <ec-text x={4} y={4} text="Pixel text" fill="#e0e0e0" maxWidth={192} textAlign="center" />
            </ec-canvas-overlay>
          </ec-canvas>

          {/* Canvas nested inside an lvgl-obj container */}
          <lvgl-obj style={{ display: 'flex', flexDirection: 'row' }}>
            <ec-canvas style={{ width: 100, height: 60 }}>
              <ec-canvas-background>
                <ec-rect x={0} y={0} width={100} height={60} fill="#e53935" radius={8} />
              </ec-canvas-background>
              <ec-canvas-content>
                <lvgl-label text="Red" />
              </ec-canvas-content>
            </ec-canvas>
            <ec-canvas style={{ width: 100, height: 60 }}>
              <ec-canvas-background>
                <ec-rect x={0} y={0} width={100} height={60} fill="#1e88e5" radius={8} />
              </ec-canvas-background>
              <ec-canvas-content>
                <lvgl-label text="Blue" />
              </ec-canvas-content>
            </ec-canvas>
          </lvgl-obj>
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
