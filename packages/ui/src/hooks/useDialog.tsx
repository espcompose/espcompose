/**
 * useDialog — Modal dialog with baked-in backdrop and themed container.
 *
 * Dialogs occupy the base overlay tier (z-order 0). They are drawn above
 * normal content but below toasts and notifications.
 *
 * The hook internally renders a full-screen semi-transparent backdrop with
 * dismiss-on-tap behavior, and a centered themed container around the user's
 * content. Users only provide the dialog body — no wrapper component needed.
 *
 * When used inside a `<Dialog.Provider maxDepth={N}>`, dialogs participate
 * in the visibility stack — showing a new dialog saves the current one,
 * and dismissing restores it. Without a provider, behaves as depth-1
 * (simple show/hide, no stacking).
 */

import { useOverlay, useRef, useAnimation, useVisibility, useVisibilityStack, useThemeSettings, adaptiveScreen } from '@espcompose/core';
import type { VisibilityController, EspComposeElement, SizeValue, TransitionRegistration } from '@espcompose/core';
import { useSpacing } from './useSpacing';
import { UITheme } from '../theme/theme';
import { Text } from '../components/Text';
import { HStack } from '../components/Space';
import { Card } from '../components/Card';
import { mdiGlyphs } from '../theme/fonts';
import type { SpacingToken } from '../theme/types';
import { Backdrop } from '../components';
import { Dialog } from '../components/Dialog';

export type DialogController = VisibilityController;

export type DialogFactory = (ctrl: DialogController) => EspComposeElement | EspComposeElement[];

export interface DialogOptions {
  /** Dialog title displayed in the title bar. */
  title?: string;
  /** Hide the title bar chrome (title text and close button). Default: false. */
  hideTitleBar?: boolean;
  /** Padding inside the container. Default: 'lg'. */
  padding?: SpacingToken;
  /** Width of the dialog container. Default: adaptive by display class. */
  width?: SizeValue;
  /** Height of the dialog container. Default: 'fit-content'. */
  height?: SizeValue;
}

/**
 * Create a modal dialog overlay (z-order 0).
 *
 * The hook renders a full-screen backdrop (dismiss-on-tap) and a themed
 * centered container around your content. You only provide the body.
 *
 * @param factory  Render callback `(ctrl) => <content>`
 * @param options  Optional styling overrides
 * @returns        A `VisibilityController` with `.show()` / `.hide()`.
 *
 * @example
 * const dialog = useDialog((ctrl) => (
 *   <VStack gap="md">
 *     <Text text="Hello" />
 *     <Button text="Close" onPress={() => { ctrl.hide(); }} />
 *   </VStack>
 * ));
 *
 * <Button text="Open" onPress={() => { dialog.show(); }} />
 */
export function useDialog(factory: DialogFactory, options?: DialogOptions): DialogController {
  const stack = useVisibilityStack();

  // Capture transition controllers from the factory closure.
  let transition: TransitionRegistration | undefined;

  const ctrl = useOverlay({ zOrder: 0 }, (overlayCtrl) => {
    const theme = UITheme.use();
    const settings = useThemeSettings();
    const width = options?.width ?? adaptiveScreen(settings ?? {}, {
      micro: '95%' as SizeValue,
      tiny: '90%' as SizeValue,
      compact: '85%' as SizeValue,
      medium: '75%' as SizeValue,
      large: '60%' as SizeValue,
      panel: '50%' as SizeValue,
      default: '85%' as SizeValue,
    });
    const height = options?.height ?? 'fit-content';

    // Fade-in/fade-out transition on the backdrop
    const backdropRef = useRef();
    const fadeIn = useAnimation(backdropRef, {
      property: 'opacity',
      from: 0,
      to: 255,
      duration: '200ms',
      easing: 'ease-out',
    });
    const fadeOut = useAnimation(backdropRef, {
      property: 'opacity',
      from: 255,
      to: 0,
      duration: '200ms',
      easing: 'ease-in',
    });
    //transition = { enter: fadeIn, exit: fadeOut, exitDurationMs: 200 };

    const content = factory(overlayCtrl);
    const showTitleBar = !options?.hideTitleBar;

    const titleBar: EspComposeElement = (
      <HStack align="spaceBetween" crossAlign="center" style={{ width: '100%' }}>
        <Text variant="subtitle" text={options?.title ?? ''} />
        <lvgl-obj
          onPress={() => { overlayCtrl.hide(); }}
          style={{
            width: 'fit-content',
            height: 'fit-content',
            backgroundOpacity: 'transparent',
            borderWidth: 0,
            padding: 4,
          }}
        >
          <lvgl-label
            text={mdiGlyphs.close}
            style={{
              font: theme?.typography?.subtitle,
              color: theme?.colors?.textSecondary,
              placeSelf: 'center',
            }}
          />
        </lvgl-obj>
      </HStack>
    );

    const bodyChildren: EspComposeElement[] = Array.isArray(content) ? content : [content];

    const scrollRegion: EspComposeElement = (
      <lvgl-obj
        style={{
          width: '100%',
          height: 'fit-content',
          backgroundOpacity: 'transparent',
          borderWidth: 0,
          padding: 0,
          scrollbarMode: 'auto',
          display: 'flex',
          flexDirection: 'column',
          rowGap: useSpacing('md'),
        }}
      >
        {bodyChildren}
      </lvgl-obj>
    );

    const containerChildren: EspComposeElement[] = showTitleBar
      ? [titleBar, scrollRegion]
      : [scrollRegion];

    return (
      <Backdrop
        ref={backdropRef}
        onPress={() => { overlayCtrl.hide(); }}
        style={{
          width: '100%',
          height: '100%',
          borderWidth: 0,
          padding: 0,
          opacity: 'opaque', // 'transparent',
        }}
      >
        <Dialog
          padding={options?.padding ?? 'lg'}
          style={{
            width: width,
            height: height,
            placeSelf: 'center',
            shadowColor: '#000000',
            shadowOpacity: '25%',
            shadowOffsetX: 6,
            shadowOffsetY: 6,
            shadowWidth: 6,
            shadowSpread: 0,
          }}
        >
          {containerChildren}
        </Dialog>
      </Backdrop>
    );
  });

  if (stack) {
    return stack.register(ctrl, { transition });
  }
  return useVisibility(ctrl, { transition });
}
