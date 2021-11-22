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
`npm build`. The build output is ES6 compatible JavaScript. The files are using CommonJS module format.


## Testing
To run tests: `npm test`.
Tests use the [Jest](https://jestjs.io/) test framework.

## How to use it

To use the in-memory file system, simply instantiate the `FileSystem` object:

Example usage:
```ts
    import { FileSystem } from './src/fs.ts';

    const fs = new FileSystem();
    var rootDir = fs.root;

    // Create directories
    const dir = fs.createDir("/tmp/path"); // tmp and path were created

    // Create files and write
    const file = fs.createFile("/tmp/log.txt"); // log.txt was created
    file.write("Log line"); // Write log.txt to the file contents
    console.log(file.contents); // Prints Log Line

    // Change working dir
    fs.changeDir("/tmp");

    // List items in a dir
    fs.currentDir().items.forEach(item => console.log(item.name));

    // Remove a directory
    fs.removeDir("/tmp/path"); // path was removed

    // Find files
    const results = fs.find("log.txt"); // Returns [File] array

```

### Features
- Each file system item has a name and metadata (creation and mod timestamp
- Directories
    - change current directory
    - create a new directory
    - list directory contents
    - create new directories using relative and absolute paths
    - remove directories
- Files
    - create files
    - delete files
    - write strings to files as UTF-8 byte array
- You can search for files using exact match
- File system is case sensitive
- You can use / in the directory name if it's escaped with \ e.g. `Foo \/ Bar` is a valid dir name.
