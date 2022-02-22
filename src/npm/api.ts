import { get } from 'https';

/**
 * A simple api method to check if a npm package exists
 *
 * @param name The package name
 * @returns True if the package exists
 */
export async function hasNpmPackage(name: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.com/${name}`;

    // The registry.npmjs.com api return a non 404 code to every package that exists in the registry
    get(url, (response) => {
      resolve(response.statusCode != 404);
      response.destroy(); // stops the request
    }).on('error', reject);
  });
}
