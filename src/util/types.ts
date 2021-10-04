import type { CompilerOptions } from 'typescript';

export type TsconfigJson = {
  include?: string[];
  exclude?: string[];
  files?: string[];
  compilerOptions?: CompilerOptions;
};
