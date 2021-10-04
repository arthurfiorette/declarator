import type { TsconfigJson } from '../util/types';

export type Configuration = {
  packages: (string | [string, PackageConfig])[];
  defaults: PackageConfig;
};

export type PackageConfig = TsconfigJson & {
  /**
   * If this specific configuration should be merged with the defaults. Obviously, prevails over defaults.
   * @default false
   */
  merge?: boolean;

  /**
   * If we shouldn't make a request and verify if the package has and @types/package npm module available.
   * @default false
   */
  ignoreDtCheck?: boolean;
};

export type FileConfig = (() => Configuration) | Configuration;
