import fs from 'node:fs/promises';
import path from 'node:path';
import { log } from '../util/log';
import { childExec } from '../util/shell';
import { filename } from './info';
import type { PackageInfo } from './types';

/**
 * Emit the declaration types for a package
 *
 * @param name The package name
 * @param cwd The package directory
 * @param info The package info
 * @returns True if the declaration types were emitted
 */
export async function emitTypes(
  name: string,
  cwd: string,
  info: PackageInfo
): Promise<boolean> {
  const infoPath = path.join(cwd, filename);
  const [stdout, error] = await childExec(`tsc -p ${infoPath}`, { cwd });

  info.declarator.typed = !!error;

  if (error) {
    log.error`Could not complete type generation for ${name}. Check debug logs`;
    log.debug`${error.err}`;
    log.debug`${stdout}`;
    log.debug`${error.stderr}`;
  } else {
    log.debug`${name} was typed`;
    log.debug`${stdout}`;
  }

  // Update package info file
  await fs.writeFile(infoPath, JSON.stringify(info));

  return info.declarator.typed;
}
