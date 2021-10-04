import fs from 'fs/promises';
import path from 'path';
import type { PackageConfig } from '../config/types';
import { log } from '../util/log';
import type { PackageInfo } from './types';

/**
 * The filename to be our info and tsconfig
 */
export const filename = 'declarator.generated.json';
/**
 * The package info compatibility version
 */
export const infoVersion = 1;

/**
 * Attempts to read or create the package info located at root.
 *
 * @param name the package name
 * @param packagePath the path where the package is located
 * @param config the package tsconfig that should be used in case the package is not found or outdated
 * @returns a promise with the package info
 */
export async function getPackageInfo(
  name: string,
  packagePath: string,
  config: PackageConfig
): Promise<PackageInfo> {
  const infoPath = path.join(packagePath, filename);

  let info: PackageInfo;

  try {
    const json = (await fs.readFile(infoPath)).toString();
    const content = JSON.parse(json) as PackageInfo;
    const { declarator } = content;

    const outdated = declarator?.version < infoVersion;
    const newer = declarator?.version > infoVersion;

    if (outdated || newer) {
      log.warn`package ${name} has ${
        outdated ? 'an outdated' : 'a newer'
      } declarator version of ${declarator?.version}`;

      await fs.writeFile(
        path.join(packagePath, filename + '.old'),
        // Prettify it to be clear if a human tries to read it
        JSON.stringify(content, null, 2)
      );

      log.info`A ${infoPath}.old was generated.`;

      // Skips to catch block
      throw null;
    }

    info = content;
  } catch {
    // Handles any case of error by overriding the package with a newly one.
    info = { declarator: { typed: false, version: infoVersion, name }, ...config };
    await fs.writeFile(infoPath, JSON.stringify(info));
    log.debug`Wrote a default config for ${name}.`;
  }

  return info;
}
