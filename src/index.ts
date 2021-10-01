import { readConfig } from './config';
import { processPackage } from './process';

export const run = async () => {
  const config = await readConfig();

  const packages = Object.entries(config);

  await Promise.all(packages.map(([pkg, options]) => processPackage(pkg, options))).catch(
    console.error
  );

  if (packages.length === 0) {
    console.error('No packages were modified');
    process.exitCode = 1;
    process.exit();
  }

  console.log(
    `Typed ${packages.length} packages. (${packages.map((p) => p[0]).join(', ')})`
  );
};
