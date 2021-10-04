import { Command } from 'commander';

// extracts the relative path to prevent typescript compiler
// to add a copy of package.json to dist folder
const pkgJsonPath = '../../package.json';

export async function createProgram(): Promise<Command> {
  const { version } = await import(pkgJsonPath);

  const program = new Command();

  program
    // info
    .name('declarator')
    .version(version)
    // help
    .usage('[flags]')
    .addHelpCommand(true);

  program.option('--debug', 'output extra debugging', false);

  return program;
}
