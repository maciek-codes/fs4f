import { Directory } from "./directory";
import { File } from "./file";
import { FsUtil } from "./util";

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

        const dir = this.findDir(this.cwd, name);
        if (dir) {
            this.cwd = dir;
            return true;
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

    /** Copy a directory and all of its contents to a new location in the current
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
     * Helper for copying contents of directories
     */
    private copyDirHelper(sourceDir: Directory, destDir: Directory) {
        for (const item of sourceDir.list()) {
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
        for (const item of dir.list()) {
            if (item.name === name && FsUtil.isDirectory(item)) {
                return item as Directory;
            }
        }
        return null;
    }
}
