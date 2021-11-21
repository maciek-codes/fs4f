# fs4f - In-memory File System for Fun

This project is a weekend project to teach myself more about Typescript with node.js.

The purpose is to design an in-memory file system library.

The file system supports:
- creating/deleting/changing directories
- creating/reading/writing files


## Building
I am  using node v16.
I recommend using [Volta](https://docs.volta.sh/guide/) to automatically pick the right runtime version.

To build the library run:
`npm build`

## Testing
To run tests: `npm test`.
Tests use the [Jest](https://jestjs.io/) test framework.

## How to use it

To use the in-memory file system, simply instantiate the `FileSystem` object:

```ts
    const fs = new FileSystem();
    var rootDir = fs.root();
```

### Features
- Directories
    - change current directory
    - create a new directory
    - list directory contents
