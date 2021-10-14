import path from 'path';
import { defaultOptions } from '../config/defaults';
import type { PackageConfig } from '../config/types';
import { hasNpmPackage } from '../npm/api';
import { log } from '../util/log';
import { editPackageJson } from '../util/package-json';
import { findPackage } from '../util/path';
import { emitTypes } from './emitter';
import { getPackageInfo } from './info';

/**
 * Starts the processing of a package
 *
 * @param {string} name Their name
 * @param {PackageConfig} config The tsconfig.json options record that
 *   should be used
 * @returns {Promise<boolean>} A promise that resolves true if the
 *   d.ts files were created successfully.
 */
export async function processPackage(
  name: string,
  config: PackageConfig
): Promise<boolean> {
  const pkgDir = findPackage(name);

  const packageInfo = await getPackageInfo(name, pkgDir, config);

  if (packageInfo.declarator.typed) {
    log.debug`Package ${name} is already typed`;
    return false;
  }

  if (!config.ignoreDtCheck) {
    const existsTypes = await hasNpmPackage(`@types/${name}`);
    if (existsTypes) {
      log.warn`An @types/${name} package is available!\n Install it at https://npmjs.com/package/@types/${name}. Use ignoreDtCheck to hide this warning.`;
      return false;
    }
  }

  const emitted = await emitTypes(name, pkgDir, packageInfo);

  if (emitted) {
    await editPackageJson(pkgDir, (atual) => {
      const main = atual.main?.replace(/js$/, 'd.ts') || 'index.d.ts';
      const outDir =
        packageInfo.compilerOptions?.outDir ||
        defaultOptions.defaults.compilerOptions.outDir;

      return { ...atual, types: path.join(outDir, main) };
    });
  }

  return emitted;
}
