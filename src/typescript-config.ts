import { PackageOptions } from './config';

export const TsconfigName = 'tsconfig.declarator.json';

export const generateTsConfig = ({ include, exclude }: PackageOptions) => {
  return {
    declarator: 'See more at github.com/ArthurFiorette/declarator',
    compilerOptions: defaultCompilerOptions,
    include,
    exclude
  };
};

export const defaultCompilerOptions = {
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
  skipLibCheck: true,
  outDir: './types'
};
