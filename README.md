# Deprecated - please use https://github.com/microsoft/dts-gen

<br />
<div align="center">
  <pre>
  <br />
  <h1>⚙️⚡
Declarator</h1>
  <br />
  </pre>
  <br />
  <br />
  <code
    ><a href="https://github.com/ArthurFiorette/declarator/network/members"
      ><img
        src="https://img.shields.io/github/forks/ArthurFiorette/declarator?logo=github&label=Forks"
        target="_blank"
        alt="Forks" /></a
  ></code>
  <code
    ><a href="https://github.com/ArthurFiorette/declarator/issues"
      ><img
        src="https://img.shields.io/github/issues/ArthurFiorette/declarator?logo=github&label=Issues"
        target="_blank"
        alt="Issues" /></a
  ></code>
  <code
    ><a href="https://github.com/ArthurFiorette/declarator/stargazers"
      ><img
        src="https://img.shields.io/github/stars/ArthurFiorette/declarator?logo=github&label=Stars"
        target="_blank"
        alt="Stars" /></a
  ></code>
  <code
    ><a href="https://github.com/ArthurFiorette/declarator/blob/main/LICENSE"
      ><img
        src="https://img.shields.io/github/license/ArthurFiorette/declarator?logo=githu&label=License"
        target="_blank"
        alt="License" /></a
  ></code>
  <code
    ><a href="https://www.npmjs.com/package/declarator"
      ><img
        src="https://img.shields.io/npm/v/declarator?color=CB3837&logo=npm&label=Npm"
        target="_blank"
        alt="Npm" /></a
  ></code>
</div>

<h1></h1>

<br />
<br />

### `declarator` simplify the use of native _javascript_ projects with a _typescript_ codebase.

<br />

### Before:

```jsonc
// tsconfig.json
{
  // ...
  "include": ["src", "./types.d.ts"]
}
```

```ts
// types.d.ts
export declare module 'untyped-dependency';
```

```ts
// code.ts
import dependency from 'untyped-dependency'; // any

dependency.methodThatDoesNotExists(); // Fine!
dependency.sum(1, '2'); // Also fine!
```

<br />

### After:

```sh
$ declarator
#> Generated types for 1 package(s) out of 1.
```

```ts
// code.ts
import dependency from 'untyped-dependency'; // { sum: (a: number, b: number) => number }

// Error: Property 'methodThatDoesNotExists' does not exist on
// type '{ sum: (a: number, b: number) => number }'.
dependency.methodThatDoesNotExists();

// Error: Expected 2 arguments, but got 1.
dependency.sum(1);
```

<br />

##

Declarator, make your development process faster and more reliable while working with
unknown, undocumented and/or untyped javascript code. This automatically generate
declaration files, basically using `tsc --emitDeclarationOnly` for all dependencies that
you specify in the config file.

You'll never have to write a bunch of `export declare module 'name';` in a `types.d.ts`. But keep in mind that you'll find some `any`ies in the progress.

<br />

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installing](#installing)
- [Running](#running)
- [Configuration](#configuration)
  - [Config examples:](#config-examples)
- [License](#license)
- [Contact](#contact)

## Installing

```sh
# Npx
npx declarator

# Npm
npm install --save-dev declarator
# (Globally)
npm install -g declarator

# Yarn
yarn add -D declarator
```

<br />

## Running

For the types to be generated, you need to run `declarator` command on your machine,
**with node_modules already present and installed**. After running, the types will already
be available to be used.

This project has a very simple **CLI**:

> Run `declarator --help` for an up-to-date version.

```
Usage: declarator [flags]

Options:
  -V, --version   output the version number
  -d, --debug     output extra debugging (default: false)
  --init          create a blank config file (default: false)
  -h, --help      display help for command

Commands:
  help [command]  display help for command
```

<details>
  <summary><b>TIP</b>: You can use it in a npm <code>postinstall</code> script to, after every package install, run <code>declarator</code> and the types will be updated</summary>
  
```jsonc
 // package.json
{
  "scripts": {
    "postinstall": "declarator"
  }
}
```
</details>

<br />

## Configuration

You create customized behaviors by creating a declarator file. It needs to be in your
project root and follow one of these names:

- `declarator.js`
- `declarator.json`
- `.declarator.js`
- `.declarator.json`
- `.declaratorrc`
- `.declaratorrc.js`
- `.declaratorrc.json`
- `package.json` _(In a declarator section)_

### Config examples:

The configuration format is specified by the [Configuration](src/config/types.ts) type.

> JsonSchema and JSDoc for auto completion are also available!

<details>
  <summary><code>declarator.js</code>, <code>.declarator.js</code>, or <code>.declaratorrc.js</code></summary>

```js
//@ts-check

/**
 *  You can export default a function or a object
 *
 * @type {import('declarator').FileConfig}
 */
const config = () => {
  return {
    packages: [
      // Package that will receive all the defaults
      'random-name',
      [
        'random2',
        {
          // Merge defaults here
          merge: true,
          // Specific config for the random2 package.
          include: ['./custom-path-for-this-library']
        }
      ]
    ],
    defaults: {
      // Default config for all packages.
      compilerOptions: {
        // Use LF for compilation
        newLine: 1
      }
    }
  };
};
module.exports = config;
```

</details>

<details>
  <summary><code>declarator.json</code>, <code>.declarator.json</code>, <code>.declaratorrc</code> or <code>.declaratorrc.json</code></summary>

```jsonc
{
  // WARN: Comments are not allowed in json files!

  // Schema to ide autocompletion (Check if this path is correct)
  "$schema": "./node_modules/declarator/schema.json",
  "packages": [
    // Package that will receive all the defaults
    "random-name",
    [
      "random2",
      {
        // Merge defaults here
        "merge": true,
        // Specific config for the random2 package.
        "include": ["./custom-path-for-this-library"]
      }
    ]
  ],
  "defaults": {
    // Default config for all packages.
    "compilerOptions": {
      // Use LF for compilation
      "newLine": 1
    }
  }
}
```

</details>

<details>
  <summary><code>package.json</code></summary>

```jsonc
{
  // WARN: Comments are not allowed in json files!

  // ...

  "declarator": {
    // Schema to ide autocompletion (Check if this path is correct)
    "$schema": "./node_modules/declarator/schema.json",
    "packages": [
      // Package that will receive all the defaults
      "random-name",
      [
        "random2",
        {
          // Merge defaults here
          "merge": true,
          // Specific config for the random2 package.
          "include": ["./custom-path-for-this-library"]
        }
      ]
    ],
    "defaults": {
      // Default config for all packages.
      "compilerOptions": {
        // Use LF for compilation
        "newLine": 1
      }
    }
  }
}
```

</details>

<br />

## License

Licensed under the **MIT**. See [`LICENSE`](LICENSE) for more informations.

<br />

## Contact

See my contact information on my [github profile](https://github.com/arthurfiorette) or
open a new issue.

<br />
