const deviceName = 'project-demo';

// Reusable function components
type InfraProps = {
  ssid: string;
  password: string;
};

const Infrastructure = (props: InfraProps) => (
  <>
    <wifi ssid={props.ssid} password={props.password} />
    <api />
    <ota platform="esphome" />
    <logger level="DEBUG" />
  </>
);

const SensorArray = () => (
  <>
    <sensor
      platform="adc"
      pin={32}
      name="ADC Sensor 1"
      updateInterval="10s"
    />
    <sensor
      platform="adc"
      pin={33}
      name="ADC Sensor 2"
      updateInterval="10s"
    />
  </>
);

export default (
  <esphome
    name={deviceName}
    comment="Project structure demo"
  >
    <esp32 board="esp32dev" framework={{ type: 'arduino' }} />
    <Infrastructure ssid="TestNet" password="testpass" />
    <SensorArray />
  </esphome>
);
