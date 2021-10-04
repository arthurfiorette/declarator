import path from 'path';
import { log } from '../util/log';
import { defaultOptions } from './defaults';
import type { Configuration, FileConfig } from './types';

export const possibleFilenames = [
  'declarator.js',
  'declarator.json',
  '.declarator.js',
  '.declarator.json',
  '.declaratorrc',
  '.declaratorrc.js',
  '.declaratorrc.json'
];

export async function readConfig(root = process.cwd()): Promise<FileConfig> {
  for (const possibleFile of possibleFilenames) {
    const name = path.join(root, possibleFile);
    try {
      return require(name);
    } catch {
      log.debug`${name} could not be found.`;
      // no empty block
      continue;
    }
  }

  // Try finding it at package.json
  const packagePath = path.join(root, 'package.json');
  try {
    const packageJson = await require(packagePath);
    const declarator = packageJson['declarator'];

    if (!declarator) {
      log.debug`${packagePath} does not contain a declarator section.`;
      // Skips to catch block
      throw null;
    }

    return declarator;
  } catch (err) {
    // no config found.
    log.info`No config file could be found. Tried (${possibleFilenames})`;

    return defaultOptions;
  }
}

export function parseConfig(config: FileConfig): Configuration {
  return typeof config === 'function' ? config() : config;
}
