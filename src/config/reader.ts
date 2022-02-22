import path from 'node:path';
import { log } from '../util/log';
import { DEFAULT_OPTIONS } from './defaults';
import type { Configuration, FileConfig } from './types';

/**
 * The list of possible filenames for the configuration file.
 * Package.json is checked separately.
 */
export const possibleFilenames = [
  'declarator.js',
  'declarator.json',
  '.declarator.js',
  '.declarator.json',
  '.declaratorrc',
  '.declaratorrc.js',
  '.declaratorrc.json'
];

/**
 * Attempts to read or create a configuration file for the specified directory.
 *
 * @param directory The directory to find the file
 * @returns The read config or a newly created one
 */
export async function readConfig(directory = process.cwd()): Promise<FileConfig> {
  for (const possibleFile of possibleFilenames) {
    const name = path.join(directory, possibleFile);
    try {
      return import(name) as Promise<FileConfig>;
    } catch {
      log.debug`${name} could not be found.`;
      // no empty block
      continue;
    }
  }

  // Try finding it at package.json
  const packagePath = path.join(directory, 'package.json');
  try {
    const packageJson = (await import(packagePath)) as Record<string, unknown>;
    const declarator = packageJson['declarator'] as Configuration;

    if (!declarator) {
      log.debug`${packagePath} does not contain a declarator section.`;
      // Skips to catch block
      throw null;
    }

    return declarator;
  } catch (err) {
    // no config found.
    log.info`No config file could be found. Tried (${possibleFilenames})`;

    return DEFAULT_OPTIONS;
  }
}

/**
 * Parses the read config and merge any empty property with the defaults
 *
 * @param config The partial config that was read
 * @returns The complete config merged with defaults
 */
export function parseConfig(config: FileConfig): Configuration {
  const read = typeof config === 'function' ? config() : config;

  return { ...DEFAULT_OPTIONS, ...read };
}
