import { File } from "./file";
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
    public path() : string {
        let path = "";
        if (this.parent() !== this) {
            path = this.parent().path()
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
        this.checkDuplicates(name);
        const dir = new Directory(name, this);
        this.children.push(dir);
        this.metadata.updateModified();
        return dir;
    }

    /**
     * Create a file in this directory
     */
    createFile(name: string): File {
        this.checkDuplicates(name);
        const file = new File(name);
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
    private checkDuplicates(name: string) {
        for (const item of this.children) {
            if (item.name === name) {
                throw new Error("Duplicate directory");
            }
        }
    }
}
