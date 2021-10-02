import { existsSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import resolvePackagePath from 'resolve-package-path';
import { PackageOptions } from './config';
import { executeCommand, generateCommand } from './executor';
import { log } from './log';
import { editPackageJson } from './package-editor';
import {
  defaultCompilerOptions,
  generateTsConfig,
  TsconfigName
} from './typescript-config';

const findPackagePath = (name: string) => {
  return path.dirname(resolvePackagePath(name, process.cwd()) || require.resolve(name));
};

export const processPackage = async (
  name: string,
  { include = ['./**/*.js'], exclude = ['./**/*.d.ts'] }: PackageOptions
) => {
  const location = findPackagePath(name);
  const tsconfigPath = path.join(location, TsconfigName);

  const createTsConfig = !existsSync(tsconfigPath);

  if (createTsConfig) {
    await fs.writeFile(
      tsconfigPath,
      JSON.stringify(generateTsConfig({ include, exclude }))
    );
  }

  const command = generateCommand(createTsConfig);
  const [, error] = await executeCommand(command, { cwd: location });

  if (error) {
    log('error', JSON.stringify(error, null, 2));
    return;
  }

  await editPackageJson(location, (atual) => {
    const main = atual.main?.replace(/js$/, 'd.ts') || 'index.d.ts';
    const typesFolder = path.join('.', defaultCompilerOptions.outDir, main);

    return { ...atual, types: typesFolder };
  });
};
