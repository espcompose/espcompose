import type { WidgetProps } from '@espcompose/core';
import { createLvglWidget, useHAEntity, useMemo } from '@espcompose/core';
import { Button } from './Button';
import { Slider } from './Slider';
import { VStack } from './Space';
import { Text } from './Text';
import { useDialog } from '../hooks/useDialog';
import { mdiGlyphs } from '../theme/fonts';

export type HALightButtonProps = WidgetProps<{
  entityId: `light.${string}`;
  label?: string;
  title?: string;
}, 'entityId' | 'label' | 'title'>;

export const HALightButton = createLvglWidget<HALightButtonProps>(
  (props) => {
    const light = useHAEntity(props.entityId, { domain: 'light' });
    const toggleLabel = useMemo(() => (light.isOn ? 'Turn Off' : 'Turn On'));

    const dialog = useDialog((ctrl) => (
      <VStack gap="md" style={{ width: '100%' }}>
        <Button
          status="primary"
          text={toggleLabel}
          onPress={() => { light.toggle(); }}
        />

        <Text variant="caption" text="Brightness" />
        <Slider
          min={0}
          max={255}
          value={light.brightness}
          onChange={(args) => { light.turnOn({ brightness: args.x }); }}
        />
      </VStack>
    ), { title: props.title ?? props.label ?? props.entityId });

    const iconGlyph = useMemo(() => (light.isOn ? mdiGlyphs.lightbulb : mdiGlyphs.lightbulbOff));
    const buttonStatus = useMemo(() => (light.isOn ? 'primary' : 'secondary'));

    return (
      <Button
        status={buttonStatus}
        onPress={() => { dialog.show(); }}
        style={{ width: 80, height: 80, ...props.style }}
      >
        <VStack align="center" crossAlign="center" style={{ width: '100%', height: '100%' }}>
          <Text variant="title" text={iconGlyph} align="center" />
          <Text variant="caption" text={props.label ?? props.entityId} align="center" />
        </VStack>
      </Button>
    );
  },
);
