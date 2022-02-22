import { Configuration } from './types';

export const DEFAULT_OPTIONS: Configuration = {
  packages: [],
  defaults: {
    merge: false,
    ignoreDtCheck: false,

    include: ['./**/*.js'],
    exclude: ['./**/*.d.ts'],

    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      skipLibCheck: true,
      outDir: '.'
    } as const
  }
};
