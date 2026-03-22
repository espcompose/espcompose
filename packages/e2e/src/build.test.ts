import { describe, it } from 'vitest';
import path from 'path';
import { createProjectTest } from './helpers';

const projectsDir = path.resolve(__dirname, '..', 'projects');

describe('ESPHome Compose Build', () => {
  it('basic-device', async () => {
    await createProjectTest(projectsDir, 'basic-device');
  });

  it('sensor-device', async () => {
    await createProjectTest(projectsDir, 'sensor-device');
  });

  it('function-component-device', async () => {
    await createProjectTest(projectsDir, 'function-component-device');
  });

  it('script-device', async () => {
    await createProjectTest(projectsDir, 'script-device');
  });

  it('dashboard-device', async () => {
    await createProjectTest(projectsDir, 'dashboard-device');
  });

  it('lvgl-device', async () => {
    await createProjectTest(projectsDir, 'lvgl-device');
  });

  it('design-system-device', async () => {
    await createProjectTest(projectsDir, 'design-system-device');
  });
});
