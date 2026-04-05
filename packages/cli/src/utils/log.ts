import pc from 'picocolors';

export function logWarn(message: string): void {
  console.warn(pc.yellow(message));
}

export function logError(message: string): void {
  console.error(pc.red(message));
}
