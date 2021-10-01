<br />
<div align="center">
  <pre>
  <br />
  <h1>⚙️
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

### `declarator` is a development dependency to automatically generate types from a javascript library.

<br />

```js
// package.json

{
  // ...
  "declarator": {
    "an-untyped-and-installed-package": {
      /* default options */
    }
  }
}
```

<br />
<br />

## Installing

```sh
# Npm
npm install --save-dev declarator

# Yarn
yarn add -D declarator
```

<br />

## Configuration

You can configure this package by creating a subsection in your package.json file.

```js
// package.json

{
  // ...
  "declarator": {
    // Every package named here will be generated it's declarations
    "an-untyped-and-installed-package": {
      /* all options are optional */
      // Override exclude and include to only generate type declarations for a subset of the source files.
      // By default, all javascript files within the project are considered.
      "include": ["./**/*.js"], // default
      "exclude": ["./**/*.d.ts"] // default
    }
  }
}
```

## Inspiration

This project is was created to simplify use of javascript native projects with a
typescript codebase. In a way that you don't have to manually write some useful types or a
bunch of `export declare module 'name';` in a global.d.ts.

<br />

## License

Licensed under the **MIT**. See [`LICENSE`](LICENSE) for more informations.

<br />

## Contact

See my contact information on my [github profile](https://github.com/ArthurFiorette) or
open a new issue.

<br />
