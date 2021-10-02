import { readConfig } from './config';
import { log } from './log';
import { processPackage } from './process';

export const run = async (exitCode: number) => {
  const config = await readConfig();

  const packages = Object.entries(config);

  if (packages.length === 0) {
    log('error', 'No packages were modified');
    process.exitCode = exitCode;
    process.exit();
  }

  await Promise.all(packages.map(([pkg, options]) => processPackage(pkg, options))).catch(
    (err) => log('error', JSON.stringify(err, null, 2))
  );

  log(
    'info',
    `Typed ${packages.length} packages. (${packages.map((p) => p[0]).join(', ')})`
  );
};
