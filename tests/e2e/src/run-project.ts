import path from 'path';
import { it } from 'vitest';
import { createProjectTest } from './helpers';

const projectsDir = path.resolve(__dirname, '..', 'projects');

/** Register a single-project e2e test with timing output. */
export function projectTest(projectName: string): void {
  it(projectName, async () => {
    const timing = await createProjectTest(projectsDir, projectName);
    const total = Math.round(timing.espcomposeMs + timing.esphomeValidationMs);
    console.log(
      `[${timing.project}] espcompose ${Math.round(timing.espcomposeMs)}ms | esphome ${Math.round(timing.esphomeValidationMs)}ms | total ${total}ms`,
    );
  });
}

export { projectsDir };
