import { Directory, DirectoryImpl } from "./directory";

export class FileSystem {
    private rootDir: Directory;
    private cwd: Directory;

    constructor() {
        this.rootDir = new DirectoryImpl("");
        this.cwd = this.rootDir;
    }

    public root(): Directory {
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
        for (const item of this.cwd.children) {
            var isDir = (item as Directory) !== undefined;
            if (item.name === name && isDir) {
                this.cwd = item as Directory;
                return true;
            }
        }
        return false;
    }

    /**
     * Create a directory in current working directory
     * @param path 
     */
    public createDir(path: string): Directory {
        return this.cwd.createDir(path);
    }
}
