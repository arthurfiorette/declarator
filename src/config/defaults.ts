export const defaultOptions = {
  packages: [],
  defaults: {
    include: ['./**/*.js'],
    exclude: ['./**/*.d.ts'],
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      skipLibCheck: true,
      outDir: './types'
    } as const
  }
};
