/**
 * Hardware definition for the Waveshare ESP32-P4-WIFI6-Touch-LCD-10.1
 *
 * Mirrors: common/hardware/waveshare-esp32-p4-wifi6-touch-lcd-10.1.yaml
 * from the family-dashboard project.
 */
import {
  Display,
  createElement,
  useRef,
  type Ref,
  type i2c_I2CBus,
  type i2s_audio_I2SAudioComponent,
  type output_FloatOutput,
  type speaker_Speaker,
} from '@esphome/compose';

export function Hardware({ displayRef }: { displayRef: Ref<Display> }) {
  // ── Cross-component refs ──────────────────────────────────────────────
  const i2cBus = useRef<i2c_I2CBus>();
  const audioBus = useRef<i2s_audio_I2SAudioComponent>();
  const backlightPwm = useRef<output_FloatOutput>();
  const mainSpeaker = useRef<speaker_Speaker>();
  const announcementMixInput = useRef<speaker_Speaker>();
  const mediaMixInput = useRef<speaker_Speaker>();
  const announcementResampler = useRef<speaker_Speaker>();

  return (
    <>
      {/* ── MCU ─────────────────────────────────────────────────────── */}
      <esp32
        variant="ESP32P4"
        flashSize="32MB"
        cpuFrequency="360MHZ"
        framework={{
          type: 'esp-idf',
          version: 'latest',
          advanced: {
            enableIdfExperimentalFeatures: true,
          },
        }}
      />

      {/* ── Coprocessor (WiFi/BT via ESP32-C6 over SDIO) ────────── */}
      <esp32_hosted
        variant="ESP32C6"
        resetPin={54}
        cmdPin={19}
        clkPin={18}
        d0Pin={14}
        d1Pin={15}
        d2Pin={16}
        d3Pin={17}
        activeHigh={true}
      />

      <psram mode="hex" speed="200MHz" />

      <preferences flashWriteInterval="5min" />

      <esp_ldo voltage="2.5V" channel="3" />

      {/* ── I²C bus ─────────────────────────────────────────────────── */}
      <i2c
        ref={i2cBus}
        sda={7}
        scl={8}
        frequency="400kHz"
        scan={true}
      />

      {/* ── Touchscreen ─────────────────────────────────────────── */}
      <touchscreen
        platform="gt911"
        i2cId={i2cBus}
        display={displayRef}
        updateInterval="50ms"
        transform={{ swapXy: true, mirrorX: true, mirrorY: false }}
      />

      {/* ── Backlight ───────────────────────────────────────────────── */}
      <output
        platform="ledc"
        ref={backlightPwm}
        pin={26}
        frequency="1000Hz"
      />
      <light
        platform="monochromatic"
        output={backlightPwm}
        name="Display Backlight"
        icon="mdi:lightbulb-on"
        restoreMode="ALWAYS_ON"
        defaultTransitionLength={{ milliseconds: 250 }}
      />

      {/* ── Display (MIPI DSI) ──────────────────────────────────── */}
      <display
        platform="mipi_dsi"
        ref={displayRef}
        x:custom={{
          model: 'WAVESHARE-P4-NANO-10.1',
          rotation: 270,
        }}
      />

      {/* ── I²S audio bus ───────────────────────────────────────────── */}
      <i2s_audio
        ref={audioBus}
        i2sMclkPin={13}
        i2sLrclkPin={10}
        i2sBclkPin={12}
      />

      {/* ── Audio DAC (ES8311) ──────────────────────────────────────── */}
      <audio_dac
        platform="es8311"
        i2cId={i2cBus}
        address={0x18}
      />

      {/* ── Audio ADC (ES7210) ──────────────────────────────────────── */}
      <audio_adc
        platform="es7210"
        i2cId={i2cBus}
        address={0x40}
      />

      {/* ── Microphone (i2s_audio platform — no typed props in SDK) ──── */}
      {createElement('microphone', {
        platform: 'i2s_audio',
        i2sAudioId: audioBus,
        i2sDinPin: 11,
        sampleRate: 16000,
        bitsPerSample: '16bit',
        adcType: 'external',
      })}

      {/* ── Speakers ────────────────────────────────────────────────── */}
      {/* i2s_audio speaker platform — no typed props in SDK */}
      {createElement('speaker', {
        platform: 'i2s_audio',
        ref: mainSpeaker,
        i2sAudioId: audioBus,
        i2sDoutPin: 9,
        dacType: 'external',
        channel: 'mono',
        bufferDuration: '100ms',
        bitsPerSample: '16bit',
        sampleRate: 48000,
      })}

      <speaker
        platform="mixer"
        outputSpeaker={mainSpeaker}
        sourceSpeakers={[
          { id: announcementMixInput, timeout: 'never' } as any,
          { id: mediaMixInput, timeout: 'never' } as any,
        ]}
      />

      <speaker
        platform="resampler"
        ref={announcementResampler}
        outputSpeaker={announcementMixInput}
        sampleRate={48000}
        bitsPerSample={16}
      />

      <speaker
        platform="resampler"
        outputSpeaker={mediaMixInput}
        sampleRate={48000}
        bitsPerSample={16}
      />

      {/* ── RTTTL buzzer ────────────────────────────────────────────── */}
      <rtttl speaker={announcementResampler} />

      {/* ── Audio amplifier switch ──────────────────────────────────── */}
      <switch
        platform="gpio"
        pin={53}
        name="Speaker Enable"
        icon="mdi:speaker"
        entityCategory="config"
        restoreMode="RESTORE_DEFAULT_ON"
      />
    </>
  );
}
