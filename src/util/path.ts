import path from 'node:path';
import resolvePackagePath from 'resolve-package-path';

export function findPackage(name: string): string {
  return path.dirname(resolvePackagePath(name, process.cwd()) || require.resolve(name));
}
