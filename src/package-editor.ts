import fs from 'fs/promises';
import { IPackageJson } from 'package-json-type';
import path from 'path';

export const editPackageJson = async (
  folderPath: string,
  editor: (atual: IPackageJson) => IPackageJson
) => {
  const [packagePath, content] = await readPackageJson(folderPath);
  const newContent = editor(content);
  await fs.writeFile(packagePath, JSON.stringify(newContent, null, 2));
};

export const readPackageJson = async (
  folderPath: string
): Promise<[packagePath: string, content: IPackageJson]> => {
  const packagePath = path.join(folderPath, 'package.json');
  const content = await (await fs.readFile(packagePath)).toString();
  return [packagePath, JSON.parse(content.toString())];
};
