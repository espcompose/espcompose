/**
 * Sample project: dashboard-device
 *
 * Simulates a Home Assistant dashboard firmware for a Waveshare ESP32-P4
 * touchscreen display, based on the family-dashboard project.
 *
 * Hardware definitions live in hardware.tsx (mirroring the YAML packages
 * pattern).
 */
import { Display, logger, useRef, useScript } from '@espcompose/core';
import { Hardware } from './hardware';

function ConnectivityConfig() {
  return (
    <>
      <wifi
        networks={[{ ssid: 'HomeWifi', password: 's3cr3t!!' }]}
        powerSaveMode="NONE"
        fastConnect={true}
        ap={{ password: 'password1234' }}
      />
      <api />
      <captive_portal />
      <web_server port={80} version="3" />
      <ota platform="esphome" />
      <logger level="DEBUG" hardwareUart="UART0" logs={{ lvgl: 'INFO' }} />
    </>
  );
}

function HomeAssistantSensors() {
  return (
    <>
      {/* Light state sensors */}
      <binary_sensor
        platform="homeassistant"
        name="Kitchen Floods"
        entityId="light.kitchen_floods"
        triggerOnInitialState={true}
      />
      <binary_sensor
        platform="homeassistant"
        name="Living Room Light"
        entityId="light.living_room"
        triggerOnInitialState={true}
      />

      {/* Door sensors */}
      <binary_sensor
        platform="homeassistant"
        name="Front Door"
        entityId="binary_sensor.front_door_sensor_window_door_is_open"
        triggerOnInitialState={true}
      />
      <binary_sensor
        platform="homeassistant"
        name="Back Door"
        entityId="binary_sensor.back_door_sensor_window_door_is_open_2"
        triggerOnInitialState={true}
      />

      {/* Motion sensor */}
      <binary_sensor
        platform="homeassistant"
        name="Living Room Motion"
        entityId="binary_sensor.living_room_motion_sensor_motion_detection"
        triggerOnInitialState={true}
      />
    </>
  );
}

function App() {
  const displayRef = useRef<Display>();
  const playClickSound = useScript(async () => {
    logger.log('Click sound disabled for testing');
  });

  return (
    <esphome
      name="living-room-dashboard"
      friendlyName="Living Room Dashboard"
      comment="A custom Home Assistant dashboard."
      minVersion="2026.1.0"
    >
      <Hardware displayRef={displayRef} />
      <ConnectivityConfig />
      <HomeAssistantSensors />

      <lvgl displays={[displayRef]} />
    </esphome>
  );
}

export default <App />;
