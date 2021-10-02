## TODO List

_(PRs are welcome)_

- Command line arguments: `declarator package1 package2`
- Better cli with commander.js and inquirer.js
- Write cli in typescript
- External config file. (`.declaratorrc`, `.declarator.json` and etc?)
- `--init` flag to create a config file with defaults.
- Tests and support globally installed and in workspaces.
- Add a way to let the user integrate his custom types from a package.

#### New options

- `ignore-types-check`: Check each package if @types/package is available by default, this
  flag / option would disable this
- `defaults`: Default options to add in every tsconfig.declarator.json.
- `[package].X`: Support for overriding every tsc option too.
