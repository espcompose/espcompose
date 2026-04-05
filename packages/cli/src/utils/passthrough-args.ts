/**
 * Extract arguments after `--` from process.argv for passthrough to ESPHome.
 * Commander does not natively forward these, so we parse them manually.
 */
export function extractPassthroughArgs(): string[] {
  const idx = process.argv.indexOf('--');
  return idx === -1 ? [] : process.argv.slice(idx + 1);
}
