import { execFile, spawn } from 'child_process';
import which from 'which';

const isWindows = process.platform === 'win32';

/**
 * Locate the `esphome` binary on PATH.
 * Throws a descriptive error if ESPHome is not installed.
 */
export function resolveEsphome(): string {
  try {
    return which.sync('esphome');
  } catch {
    throw new Error(
      'esphome not found on PATH. Install via: pip install esphome',
    );
  }
}

/**
 * Run `esphome config <yamlPath>` and return the validated/merged config
 * as a string. Throws on non-zero exit with stdout + stderr included.
 */
export function esphomeConfig(
  yamlPath: string,
  extraArgs: string[] = [],
): Promise<string> {
  const bin = resolveEsphome();
  return new Promise((resolve, reject) => {
    execFile(
      bin,
      ['config', ...extraArgs, yamlPath],
      { timeout: 60_000, shell: isWindows },
      (error, stdout, stderr) => {
        if (error) {
          reject(
            new Error(
              `esphome config failed for ${yamlPath}\n${stdout}\n${stderr}`,
            ),
          );
          return;
        }
        resolve(stdout);
      },
    );
  });
}

/**
 * Spawn an interactive ESPHome subcommand with stdio inherited so the user
 * sees real-time output and can interact (e.g. device selection prompts).
 * Resolves on exit code 0, rejects otherwise.
 */
function spawnEsphome(
  subcommand: string,
  yamlPath: string,
  extraArgs: string[] = [],
): Promise<void> {
  const bin = resolveEsphome();
  return new Promise((resolve, reject) => {
    const child = spawn(bin, [subcommand, ...extraArgs, yamlPath], {
      stdio: 'inherit',
      shell: isWindows,
    });

    child.on('error', (err) => {
      reject(
        new Error(`Failed to start esphome ${subcommand}: ${err.message}`),
      );
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`esphome ${subcommand} exited with code ${code}`),
        );
      }
    });
  });
}

/**
 * Run `esphome compile <yamlPath>` with inherited stdio (streamed output).
 * Generates firmware binary without uploading to device.
 */
export function esphomeCompile(
  yamlPath: string,
  extraArgs: string[] = [],
): Promise<void> {
  return spawnEsphome('compile', yamlPath, extraArgs);
}

/**
 * Run `esphome run <yamlPath>` with inherited stdio (interactive).
 * Compiles firmware and uploads to device.
 */
export function esphomeRun(
  yamlPath: string,
  extraArgs: string[] = [],
): Promise<void> {
  return spawnEsphome('run', yamlPath, extraArgs);
}

/**
 * Run `esphome logs <yamlPath>` with inherited stdio (interactive).
 * Serial monitor for device logs.
 */
export function esphomeLogs(
  yamlPath: string,
  extraArgs: string[] = [],
): Promise<void> {
  return spawnEsphome('logs', yamlPath, extraArgs);
}
