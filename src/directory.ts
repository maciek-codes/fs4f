import { File } from "./file";
import { FsUtil } from "./util";
import { Metadata } from "./metadata";

/**
 * Union of possible file system item types
 */
export type FsItem = File | Directory;

export class Directory {
    public readonly name: string;
    public readonly metadata: Metadata;
    public children: (FsItem)[];
    private parentDir: Directory | null;
    
    constructor(name: string, parent?: Directory) {
        this.name = name;
        this.children = [];
        this.parentDir = parent;
        this.metadata = new Metadata();
    }

    /**
     * Returns the full path of this directory
     */
    public get path() : string {
        let path = "";
        if (this.parent() !== this) {
            path = this.parent().path;
        }
        path += this.name + "/";
        return path;
    }
 
    /**
     * Pointer to the parent directory or itself (if root dir)
     */
    public parent(): Directory {
        if (!this.parentDir) {
            return this;
        }
        return this.parentDir;
    }

    /**
     * Creates a sub directory
     * @param name of the sub directory
     */
    public createDir(name: string): Directory {
        FsUtil.validateName(name);
        let dir = this.findExisting(name);
        if (dir && !FsUtil.isDirectory(dir)) {
            throw new Error("File already exists");
        } else if (dir) {
            return dir as Directory;
        }
        
        dir = new Directory(name, this);
        this.children.push(dir);
        this.metadata.updateModified();
        return dir;
    }

    /**
     * Create a file in this directory
     */
    public createFile(name: string): File {
        FsUtil.validateName(name);
        let file = this.findExisting(name);
        if (file && !FsUtil.isFile(file)) {
            throw new Error("File already exists");
        } else if (file) {
            return file as File;
        }
        
        file = new File(name);
        this.children.push(file);
        this.metadata.updateModified();
        return file;
    }
  
    /**
     * Return a list with the contents of the directory
     */
    public list(): FsItem[] {
        return this.children;
    }

    /**
     * Check if any child item is named like this
     * @param name name to be checked
     */
    private findExisting(name: string) {
        for (const item of this.children) {
            if (item.name === name) {
                return item;
            }
        }
    }
}
