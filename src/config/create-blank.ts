import fs from 'node:fs';
import path from 'node:path';
import { log } from '../util/log';
import { possibleFilenames } from './reader';

const blankConfig = `
module.exports = () => ({
  // All packages that should be typed
  packages: [],

  // Default configuration for all packages
  defaults: {}
});
`;

export async function createBlackConfig(): Promise<void> {
  for (const name of possibleFilenames) {
    const file = path.resolve(process.cwd(), name);

    if (fs.existsSync(file)) {
      log.error`An "${name}" already exists`;
      return;
    }
  }

  const file = path.resolve(process.cwd(), possibleFilenames[0] || 'declarator.js');

  try {
    await fs.promises.writeFile(file, blankConfig);
    log.info`Created "${possibleFilenames[0]}"`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    log.error`Failed to create a blank config at "${file}" ${e}`;
  }
}
