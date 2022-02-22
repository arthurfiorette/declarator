import { Command } from 'commander';
import type { IPackageJson } from 'package-json-type';

// extracts the relative path to prevent typescript compiler
// to add a copy of package.json to dist folder
const pkgJsonPath = '../../package.json';

export async function createProgram(): Promise<Command> {
  const { version } = (await import(pkgJsonPath)) as IPackageJson;

  const program = new Command();

  program
    // info
    .name('declarator')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .version(version!)
    // help
    .usage('[flags]')
    .addHelpCommand(true);

  program.option('-d, --debug', 'output extra debugging', false);
  program.option('--init', 'create a blank config file', false);

  return program;
}

export type CliOpts = {
  debug: boolean;
  init: boolean;
};
