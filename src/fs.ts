import { Directory, FsItem } from "./directory";
import { File } from "./file";
import { FsUtil } from "./util";
import { Path } from './path';

export class FileSystem {
    private rootDir: Directory;
    private cwd: Directory;

    constructor() {
        this.rootDir = new Directory("");
        this.cwd = this.rootDir;
    }

    /**
     * Gets the root or top-level directory, always exists in the file system.
     */
    get root(): Directory {
        return this.rootDir;
    }

    /**
     * Get current directory
     */
    public currentDir(): Directory {
        return this.cwd;
    }

    /**
     * Move to a different directory
     * @param path 
     */
    public changeDir(name: string) {
        const path = Path.fromString(name);
        const prevCwd = this.cwd;
        let dir = path.isAbsolute ? this.root : this.cwd;
        for (const component of path.components) {
            // Go up if needed
            if (component == Path.ParentPath) {
                this.cwd = this.cwd.parent();
                continue;
            }
            dir = this.findDir(dir, component);
            if (!dir) {
                this.cwd = prevCwd;
                return false;
            }
            this.cwd = dir;
        }
        return true;
    }

    /**
     * Create a directory in the current working directory
     */
    public createDir(name: string): Directory {
        const path = Path.fromString(name);
        let dir = path.isAbsolute ? this.root : this.cwd;
        for (const component of path.components) {
            if (component == Path.ParentPath) {
                dir = dir.parent();
            } else {
                dir = dir.createDir(component);
            }
        }
        return dir;
    }

    /**
     * Create a file in the current working directory
     */
    public createFile(name: string): File {
        const path = Path.fromString(name);

        // If not the last component of a path, create a directory first.
        const fileName = path.components[path.components.length - 1];
        const dirPart = name.substr(0, name.length - fileName.length)
        if (fileName == Path.ParentPath) {
            throw new Error("Provide a valid file name");
        }
        let dir: Directory = this.cwd;
        if (dirPart.length > 0) {
            dir = this.createDir(dirPart);
        }
        return dir.createFile(fileName);
    }

    /** 
     * Copy a directory and all of its contents to a new location in the current
     * working directory
     */
    public copyDir(fromDir: string, toDir: string, workingDir = this.cwd, destDir = this.cwd): Directory {
        // Check if the fromDir exists in the working directory
        const sourceDir: Directory = this.findDir(workingDir, fromDir);
        if (!sourceDir) {
            throw new Error(`Source directory ${fromDir} not found.`);
        }

        const copiedDir = destDir.createDir(toDir);
        this.copyDirHelper(sourceDir, copiedDir);
        return copiedDir;
    }

    /**
     * Remove a directory with a given name
     */
    public removeDir(name: string) {
        this.removeHelper(name, FsUtil.isDirectory);
    }

    /** Remove a file with a given name if exists */
    public removeFile(name: string) {
        this.removeHelper(name, FsUtil.isFile);
    }

    /**
     * Basic find functionality - it tries to find items with a full match of the name
     * @param name name of file or directory to search
     * @param searchDir - optional - optional start directory, defaults to the root
     */
     public find(name: string, searchDir: Directory = this.root): FsItem[] {
        // Traverse the directory.
        // This could be replaced with an index (hashmap/dictionary) to speed-up the lookup.
        // For now use a DFS traversal.
        const dirsToCheck: Directory[] = [];

        // Prevent any cycles when we add symlinks
        const checked: Set<Directory> = new Set<Directory>();
        dirsToCheck.push(searchDir);

        const results: FsItem[] = new Array<FsItem>();
        while (dirsToCheck.length > 0) {
            const next = dirsToCheck.pop();
            checked.add(next);
            for (const item of next.items) {
                if (FsUtil.isDirectory(item) && !checked.has(item as Directory)) {
                    dirsToCheck.push(item as Directory);
                }

                // Check for the exact match
                if (item.name === name) {
                    results.push(item);
                }
            }
        }

        return results;
    }

    /** 
     * Helper for copying contents of directories
     */
    private copyDirHelper(sourceDir: Directory, destDir: Directory) {
        for (const item of sourceDir.items) {
           if (FsUtil.isDirectory(item)) {
                this.copyDir(item.name, item.name, sourceDir, destDir)
            } else if (FsUtil.isFile(item)) {
                const copiedFile = destDir.createFile(item.name)
                copiedFile.write((item as File).contents);
            }
        }
    }

    /**
     * Find a directory matching the name in a given working directory
     * @param dir working directory
     * @param name name to match
     * @returns directory found
     */
    private findDir(dir: Directory, name: string): Directory {
        return dir.items.find(item =>
            item.name === name && FsUtil.isDirectory(item)) as Directory;
    }

    private removeHelper(name: string, predicate: (item: FsItem) => boolean): void {
        const path = Path.fromString(name);
        let dir = path.isAbsolute ? this.root : this.cwd;
        let index = 0;
        for (const component of path.components) {
            if (index === path.components.length - 1) {
                const item = dir.items.find(item => item.name === component && predicate(item));
                if (item) {
                    dir.remove(item);
                }
            } else {
                dir = this.findDir(dir, component);
                if (!dir) {
                    return;
                }
            }
            index++;
        }
    }
}
