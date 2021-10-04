import path from 'path';
import { defaultOptions } from '../config/defaults';
import { log } from '../util/log';
import { editPackageJson } from '../util/package-json';
import { findPackage } from '../util/path';
import type { TsconfigJson } from '../util/types';
import { emitTypes } from './emitter';
import { getPackageInfo } from './info';

/**
 * Starts the processing of a package
 *
 * @param {string} name their name
 * @param {TsconfigJson} options the tsconfig.json options record that should be used
 * @return {Promise<boolean>} a promise that resolves true if the d.ts files were created successfully.
 */
export async function processPackage(
  name: string,
  options: TsconfigJson
): Promise<boolean> {
  const pkgDir = findPackage(name);

  const packageInfo = await getPackageInfo(name, pkgDir, options);

  if (packageInfo.declarator.typed) {
    log.info`Package ${name} is typed`;
    return false;
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
