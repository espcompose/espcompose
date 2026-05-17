/**
 * Screensaver.Provider + useScreensaver() — Context-based screensaver system.
 *
 * The Provider component stores configuration (timeout, displayOffAfter,
 * hooks) in context.  A descendant component calls `useScreensaver()` with
 * the screensaver's content; the library auto-wraps it in a fullscreen
 * overlay whose touch handler dismisses the screensaver.
 *
 * Idle detection is delegated to LVGL's native `on_idle` trigger, which
 * tracks inactivity across all input devices (touchscreen, encoder, keypad).
 * The `on_resume` trigger (paired with `resume_on_input: true`) handles
 * automatic wake-on-input.
 *
 * State machine:
 *
 *   IDLE -(timeout)-> SCREENSAVER -(displayOffAfter)-> DISPLAY_OFF
 *     ^                    |                                |
 *     +----(resume)--------+--------(resume)----------------+
 *
 * Terminology:
 *   - **suspend** — activate the screensaver (show overlay)
 *   - **resume** — dismiss the screensaver (hide overlay, restore display)
 *   - **enable/disable** — start/stop the inactivity timer
 *   - **reset** — restart the inactivity countdown
 *
 * @example
 * const suspend = useScript(async () => { backlightRef.turnOff(); });
 * const wake = useScript(async () => { backlightRef.turnOn(); });
 * const hooks = useController<ScreensaverHooks>({
 *   onSuspend: suspend,
 *   onResume: wake,
 * });
 *
 * <Screensaver.Provider timeout="20s" displayOffAfter="60s" hooks={hooks}>
 *   <MyApp />
 * </Screensaver.Provider>
 *
 * // Inside MyApp or any descendant — just pass the content:
 * const screensaver = useScreensaver(<Clock />);
 * // screensaver.suspend(), screensaver.resume(), screensaver.enable(),
 * // screensaver.disable(), screensaver.reset()
 */

import type { EspComposeElement } from '@espcompose/core';
import {
  createElement,
  createContext,
  useContext,
  createLvglContextProvider,
  useOverlay,
  useOverlayTier,
  useScript,
  useGlobal,
  useController,
  useLvgl,
  useAttachedTrigger,
  useAttachedTimeoutTrigger,
  delay,
  parseDurationToMs,
} from '@espcompose/core';
import type { Controller, DurationValue } from '@espcompose/core';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

/**
 * Controller returned by `useScreensaver()`.
 *
 * - `suspend()` — immediately activates the screensaver (bypasses idle timeout).
 * - `resume()` — dismisses the screensaver.
 * - `enable()` — no-op (idle detection is always active via LVGL `on_idle`).
 * - `disable()` — dismisses the screensaver if active.
 * - `reset()` — dismisses the screensaver if active. LVGL's idle counter
 *   resets automatically on the next input event.
 */
export interface ScreensaverController {
  suspend(): void;
  resume(): void;
  enable(): void;
  disable(): void;
  reset(): void;
}

/**
 * Lifecycle hooks for the screensaver.
 *
 * Build with `useController<ScreensaverHooks>()` and pass to the provider
 * via the `hooks` prop.
 *
 * @example
 * const hooks = useController<ScreensaverHooks>({
 *   onSuspend: useScript(async () => { backlightRef.turnOff(); }),
 *   onResume: useScript(async () => { backlightRef.turnOn(); }),
 * });
 */
export interface ScreensaverHooks {
  /** Called when the display should be powered down (after `displayOffAfter`). */
  onSuspend(): void;
  /** Called when the screensaver is dismissed (touch or programmatic). */
  onResume(): void;
}

/** Content for the screensaver — rendered fullscreen, dismissed on touch. */
export type ScreensaverContent = EspComposeElement | EspComposeElement[];

export interface ScreensaverProviderProps {
  /**
   * Inactivity duration before the screensaver activates.
   * Duration value — number (ms) or string with unit (e.g. `'5min'`, `'30s'`).
   */
  timeout: DurationValue;

  /**
   * Duration after the screensaver activates before `hooks.onSuspend()` fires.
   * When omitted, the display stays on while the screensaver is showing.
   * Duration value — number (ms) or string with unit (e.g. `'10min'`).
   */
  displayOffAfter?: DurationValue;

  /**
   * Lifecycle hooks controller for display power management.
   * Build with `useController<ScreensaverHooks>()`.
   *
   * When omitted, no suspend or resume actions are performed —
   * the screensaver overlay is shown/hidden without side effects.
   */
  hooks?: Controller<ScreensaverHooks>;

  /** Child elements that can access `useScreensaver()`. */
  children?: EspComposeElement | EspComposeElement[];
}

// ────────────────────────────────────────────────────────────────────────────
// Context (stores provider config for the useScreensaver hook)
// ────────────────────────────────────────────────────────────────────────────

interface ScreensaverConfig {
  timeout: DurationValue;
  displayOffAfter: DurationValue;
  hooks: Controller<ScreensaverHooks> | undefined;
}

const ScreensaverConfigCtx = createContext<ScreensaverConfig | null>(null);

// ────────────────────────────────────────────────────────────────────────────
// Provider (config only — no scripts, no overlay)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Screensaver.Provider — stores screensaver configuration in context.
 *
 * A descendant component must call `useScreensaver(content)` to create
 * the overlay, scripts, and controller.
 */
function ScreensaverProvider(props: ScreensaverProviderProps): EspComposeElement {
  const {
    timeout,
    displayOffAfter = '9999h',
    hooks,
    children,
  } = props;

  const config: ScreensaverConfig = { timeout, displayOffAfter, hooks };

  return createElement('context', { context: ScreensaverConfigCtx, value: config }, children);
}

// ────────────────────────────────────────────────────────────────────────────
// Consumer hook — creates overlay, scripts, and controller
// ────────────────────────────────────────────────────────────────────────────

/**
 * Create the screensaver overlay and return a controller.
 *
 * Must be called within a `<Screensaver.Provider>`. The library renders
 * the supplied content inside a fullscreen overlay whose built-in touch
 * handler dismisses the screensaver and fires `onResume`.
 *
 * Idle detection uses LVGL's native `on_idle` trigger, which tracks
 * inactivity across all input devices. Wake-on-input is handled by
 * the `on_resume` trigger (enabled via `resume_on_input: true`).
 *
 * @param content  The screensaver's widget tree.
 * @returns A branded `ScreensaverController`.
 *
 * @example
 * const screensaver = useScreensaver(<Clock />);
 */
export function useScreensaver(content: ScreensaverContent): Controller<ScreensaverController> {
  const config = useContext(ScreensaverConfigCtx);
  if (!config) {
    throw new Error('useScreensaver() must be used within a <Screensaver.Provider>.');
  }

  const { timeout, displayOffAfter, hooks } = config;

  // Compute cumulative timeout for display-off stage (timeout + displayOffAfter).
  const timeoutMs = parseDurationToMs(timeout);
  const displayOffAfterMs = parseDurationToMs(displayOffAfter);
  const displayOffCumulativeMs = timeoutMs + displayOffAfterMs;

  // ── Noop hooks (always created — hooks can't be conditional) ────────────
  const noopSuspend = useScript(async () => {});
  const noopResume = useScript(async () => {});
  const noopHooks = useController<ScreensaverHooks>({
    onSuspend: noopSuspend,
    onResume: noopResume,
  });
  const effectiveHooks = hooks ?? noopHooks;

  // ── State ───────────────────────────────────────────────────────────────
  const isActive = useGlobal('boolean', { initialValue: false });

  // ── LVGL ref (for attaching on_idle / on_resume triggers) ───────────────
  const lvgl = useLvgl();

  // ── Overlay tier (topmost) ──────────────────────────────────────────────
  const screensaverTier = useOverlayTier({ zOrder: 1000, bringToFront: false });

  // Closure slot for the controller we build inside the factory below.
  let ctrl!: Controller<ScreensaverController>;

  useOverlay({ tier: screensaverTier }, (overlayCtrl) => {
    // ── LVGL on_idle: show screensaver after inactivity ───────────────────
    useAttachedTimeoutTrigger(lvgl, 'onIdle', timeout, () => {
      overlayCtrl.show();
      isActive.set(true);
    });

    // ── LVGL on_idle: fire onSuspend after further inactivity ─────────────
    useAttachedTimeoutTrigger(lvgl, 'onIdle', `${displayOffCumulativeMs}ms`, () => {
      effectiveHooks.onSuspend();
    });

    // ── LVGL on_resume: dismiss on any input activity ─────────────────────
    useAttachedTrigger(lvgl, 'onResume', () => {
      // eslint-disable-next-line @espcompose/eslint/no-untracked-signal -- global read in action condition
      if (isActive.value === true) {
        overlayCtrl.hide();
        isActive.set(false);
        effectiveHooks.onResume();
      }
    });

    // ── Resume script (for touch-to-dismiss and programmatic resume) ──────
    const resumeScript = useScript(async () => {
      overlayCtrl.hide();
      isActive.set(false);
      effectiveHooks.onResume();
    });

    // ── Suspend script (bypass timeout — programmatic activation) ─────────
    const suspendScript = useScript(async () => {
      overlayCtrl.show();
      isActive.set(true);

      await delay(displayOffAfterMs);
      effectiveHooks.onSuspend();
    });

    // ── Enable script (no-op — idle detection is always active via LVGL) ──
    const enableScript = useScript(async () => {});

    // ── Disable script ────────────────────────────────────────────────────
    const disableScript = useScript(async () => {
      // eslint-disable-next-line @espcompose/eslint/no-untracked-signal -- global read in action condition
      if (isActive.value === true) {
        overlayCtrl.hide();
        isActive.set(false);
        effectiveHooks.onResume();
      }
    });

    // ── Reset script ──────────────────────────────────────────────────────
    const resetScript = useScript(async () => {
      // eslint-disable-next-line @espcompose/eslint/no-untracked-signal -- global read in action condition
      if (isActive.value === true) {
        overlayCtrl.hide();
        isActive.set(false);
        effectiveHooks.onResume();
      }
    });

    ctrl = useController<ScreensaverController>({
      suspend: suspendScript,
      resume: resumeScript,
      enable: enableScript,
      disable: disableScript,
      reset: resetScript,
    });

    // Library-owned fullscreen wrapper with built-in touch-to-dismiss.
    // `resumeScript` is declared above, so the onPress handler has no
    // forward references. JSX (not createElement) is required so the
    // compiler can transform `onPress` into an action.
    return (
      <lvgl-obj style={{ height: '100%', width: '100%' }}>
        {content}
        <lvgl-obj
          onPress={() => { resumeScript.execute(); }}
          style={{ height: '100%', width: '100%', opacity: 'transparent' }}
        />
      </lvgl-obj>
    );
  });

  return ctrl;
}

// ────────────────────────────────────────────────────────────────────────────
// Namespace export
// ────────────────────────────────────────────────────────────────────────────

/**
 * Screensaver namespace — provides `Screensaver.Provider` for use in JSX.
 *
 * @example
 * <Screensaver.Provider timeout="20s" displayOffAfter="60s" hooks={hooks}>
 *   <MyApp />
 * </Screensaver.Provider>
 */
export const Screensaver = {
  Provider: createLvglContextProvider(ScreensaverProvider),
};
