/**
 * Library contract fixture: script / action tree compilation.
 *
 * Exercises __compiledActions and __compiledScript transform paths.
 * Kept minimal — just enough to produce all action metadata shapes.
 */
import { useScript, delay, logger } from '@espcompose/core';

/** Component with a useScript() call (compiled script path). */
export function ScriptButton() {
  const greet = useScript(async () => {
    logger.log('Hello!');
    await delay(500);
  });

  return (
    <binary_sensor
      platform="gpio"
      pin={4}
      name="ScriptBtn"
      onPress={async () => { await greet(); }}
    />
  );
}
