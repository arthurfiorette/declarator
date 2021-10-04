import type { TsconfigJson } from '../util/types';

/**
 * Represents all information stored for a specified package.
 */
export type PackageInfo = TsconfigJson & {
  declarator: {
    /**
     * If this package already was generated types int the past
     */
    typed: boolean;
    /**
     * The package name
     */
    name: string;
    /**
     * The package info compatibility version
     */
    version: number;
  };
};
