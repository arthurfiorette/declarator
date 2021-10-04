import merge from 'lodash.merge';
import { parseConfig, readConfig } from '../config';
import { processPackage } from '../package';
import { log } from '../util/log';

export async function run(): Promise<void> {
  const config = await readConfig();
  const { defaults, packages } = parseConfig(config);

  if (packages.length < 1) {
    log.warn`No packages could be found for this configuration.`;
    return;
  }

  const promises = packages.map((pkg) => {
    if (Array.isArray(pkg)) {
      const [name, config] = pkg;
      return processPackage(name, config.merge ? merge(defaults, config) : config);
    }
    return processPackage(pkg, defaults);
  });

  const results = await Promise.all(promises);

  log.info`Generated types for ${results.filter((r) => !!r).length} package(s) out of ${
    packages.length
  }.`;
}
