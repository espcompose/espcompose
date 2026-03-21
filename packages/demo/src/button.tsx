import { ESPCompose } from "@esphome/compose";

type ButtonProps = {
    text?: string,
}

export const Button = (props: ButtonProps) => {
    return (
        <lvgl-button
            lineRounded={true}
            text={props.text}
            bgColor="0x510121"
            textColor="0xAAAAAA"
            height="80"
            width="160"
        >
        </lvgl-button>
    );
}
