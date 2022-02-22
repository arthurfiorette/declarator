import fs from 'node:fs/promises';
import path from 'node:path';
import type { IPackageJson } from 'package-json-type';

export async function editPackageJson(
  directory: string,
  editor: (atual: IPackageJson) => IPackageJson
): Promise<void> {
  const [packagePath, content] = await readPackageJson(directory);
  const newContent = editor(content);
  await fs.writeFile(packagePath, JSON.stringify(newContent, null, 2));
}

export async function readPackageJson(
  directory: string
): Promise<[packagePath: string, content: IPackageJson]> {
  const packagePath = path.join(directory, 'package.json');
  const content = (await fs.readFile(packagePath)).toString();
  return [packagePath, JSON.parse(content.toString())];
}
