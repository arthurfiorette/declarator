import fs from 'fs/promises';
import path from 'path';
import { log } from '../util/log';
import type { TsconfigJson } from '../util/types';
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
 * @param options the package tsconfig that should be used in case the package is not found or outdated
 * @returns a promise with the package info
 */
export async function getPackageInfo(
  name: string,
  packagePath: string,
  options: TsconfigJson
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

      log.info`A ${infoPath}.old will be generated.`;

      // Skips to catch block
      throw null;
    }

    info = content;
  } catch {
    // Handles any case of error by overriding the package with a newly one.
    info = emptyPackageInfo(name, options);
    await fs.writeFile(infoPath, JSON.stringify(info));
    log.info`Generated ${infoPath} was generated with ${info.declarator.version} version.`;
  }

  return info;
}

function emptyPackageInfo(
  name: string,
  { include, exclude, files, compilerOptions }: TsconfigJson
): PackageInfo {
  return {
    compilerOptions,
    declarator: { typed: false, version: infoVersion, name },
    exclude,
    include,
    files
  };
}
