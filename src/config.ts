import { log } from './log';
import { readPackageJson } from './package-editor';

export type PackageOptions = {
  include: string[];
  exclude: string[];
};

export type Config = {
  [pkg: string]: PackageOptions;
};

export const readConfig = async (): Promise<Config> => {
  const [, packageJson] = await readPackageJson(process.cwd());
  const config = packageJson['declarator'];

  if (!config) {
    log('error',
      "'declarator' section at package.json could not be found. Are you still using this package?"
    );

    return {};
  }

  if (typeof config !== 'object') {
    throw new Error('Invalid package.json declarator format');
  }

  return config;
};
