import { Display, ESPCompose, Ref } from "@esphome/compose";
import { Button } from "./button";

type UIProps = {
    display: Ref<Display>,
}

export const UI = (props: UIProps) => {
    
    return <>
        <lvgl
            byteOrder="little_endian"
            bufferSize="100%"
            drawRounding={2}
            displays={[
                props.display
            ]}
        >
            <lvgl-page>
                <Button />
                <lvgl-label 
                    x={100}
                    y={100}
                    text="Hello world" />
            </lvgl-page>
        </lvgl>
    </>
}
