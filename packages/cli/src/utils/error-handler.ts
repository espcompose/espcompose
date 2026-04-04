/**
 * Wrap a CLI action with consistent error handling.
 * On failure, prints `<label> failed: <message>` and exits with code 1.
 */
export function withErrorHandler<T extends unknown[]>(
  label: string,
  fn: (...args: T) => void | Promise<void>,
): (...args: T) => Promise<void> {
  return async (...args: T) => {
    try {
      await fn(...args);
    } catch (err) {
      console.error(`${label} failed:`, err instanceof Error ? err.message : err);
      process.exit(1);
    }
  };
}
