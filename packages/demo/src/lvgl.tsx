import { Display, Ref, bind, createScript, delay, theme } from "@esphome/compose";
import {
    Button, Card, HStack, Screen, SliderField, SwitchField, Text, VStack,
    ThemeProvider, darkTheme, lightTheme,
} from "@esphome/compose-ui";

const officeLight = bind.haEntity('light.office');

const myScript = createScript(async () => {
    await delay(1000);
});

type UIProps = {
    display: Ref<Display>,
}

export const UI = (props: UIProps) => {
    return <>
        <lvgl
            byteOrder="little_endian"
            bufferSize="100%"
            drawRounding={2}
            displays={[props.display]}
        >
            <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }}>
                <Screen>
                    <VStack>
                        <Text variant="title" text="Theme Demo" />

                        <Card>
                            <SliderField 
                                label="Brightness" 
                                min={0} 
                                max={255}
                                value={isNaN(officeLight.brightness) ? 0 : officeLight.brightness}
                                onChange={(args) => {
                                    officeLight.turnOn({brightness: args.x})
                                }}
                            />
                            
                            <SwitchField label="Power" />
                        </Card>

                        <Card>
                            <HStack>
                                <lvgl-label text={officeLight.stateText} />
                                <Button
                                    text={officeLight.isOn ? "Office Off" : "Office On"}
                                    onPress={() => { officeLight.toggle(); }}
                                />
                                <Button
                                    text={officeLight.isOn ? "Office Off" : "Office On"}
                                    onPress={async () => {                                        
                                        officeLight.toggle();
                                        await myScript();  //valid only because we know that myScript is from createScript. We can't just call any random function.
                                        officeLight.toggle();
                                    }}
                                />
                            </HStack>
                        </Card>

                        <HStack>
                            <Button text="Dark Theme" status="primary" onPress={() => { theme.select('dark'); }} />
                            <Button text="Light Theme" status="secondary" onPress={() => { theme.select('light'); }} />
                        </HStack>
                    </VStack>
                </Screen>
            </ThemeProvider>
        </lvgl>
    </>
}
