import { Directory } from "./directory";
import { File } from "./file";

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
        if (name === "..") {
            if (this.cwd.parent) {
                this.cwd = this.cwd.parent();
            }
            return true;
        }

        // Go through items in current directory and try find a matching one
        for (const item of this.cwd.list()) {
            const isDir = (item as Directory) !== undefined;
            if (item.name === name && isDir) {
                this.cwd = item as Directory;
                return true;
            }
        }
        return false;
    }

    /**
     * Create a directory in the current working directory
     */
    public createDir(name: string): Directory {
        return this.cwd.createDir(name);
    }

    /**
     * Create a file in the current working directory
     */
    public createFile(name: string): File {
        return this.cwd.createFile(name);
    }
}
