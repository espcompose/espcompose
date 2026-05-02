import { delay, logger, useScript, type Int } from '@espcompose/core';

function App() {
  // Script with a float parameter (number → float)
  const blinkN = useScript(async (count: number) => {
    logger.log('Blinking');
    await delay(1000);
  });

  // Script with an int parameter (Int → int)
  const setLevel = useScript(async (level: Int) => {
    logger.log('Setting level');
    await delay(500);
  });

  // Script with a string parameter
  const announce = useScript(async (message: string) => {
    logger.log('Announcing');
  });

  // Script with multiple params
  const configure = useScript(async (brightness: number, enabled: boolean) => {
    logger.log('Configuring');
    await delay(100);
  });

  return (
    <esphome name="script-params-demo" comment="Script params e2e test">
      <esp32 board="esp32dev" framework={{ type: 'arduino' }} />
      <wifi ssid="TestNet" password="testpass" />
      <api />
      <logger />

      <binary_sensor
        platform="gpio"
        pin={4}
        name="Button A"
        onPress={() => { blinkN.execute(5); }}
        onRelease={async () => { await setLevel(10 as Int); }}
      />

      <binary_sensor
        platform="gpio"
        pin={5}
        name="Button B"
        onPress={() => { announce.execute('hello'); }}
        onRelease={() => { configure.execute(0.75, true); }}
      />
    </esphome>
  );
}

export default <App />;
