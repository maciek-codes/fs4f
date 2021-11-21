import { File } from "./file";

export interface Directory {
    name: string;
    children: Iterable<File | Directory>;
    
    /**
     * Pointer to the parent directory or itself (if root dir)
     */
    parent(): Directory | null;

    /**
     * Returns the full path of this directory
     */
    path(): string;

    /**
     * Creates a sub directory
     * @param name of the sub directory
     */
    createDir(name: string): Directory;
}

type FsItem = File | Directory;

export class DirectoryImpl implements Directory {
    public name: string;
    public children: FsItem[];
    private parentDir: Directory | null;
    
    constructor(name: string) {
        this.name = name;
        this.children = [];
        this.parentDir = null;
    }

    public path() : string {
        var path : string = "";
        if (this.parent() !== this) {
            path = this.parent().path()
        }
        path += this.name + "/";
        return path;
    }

    public parent(): Directory {
        if (!this.parentDir) {
            return this;
        }
        return this.parentDir;
    }

    public createDir(name: string): Directory {
        this.checkDuplicates(name);
        var dir = new DirectoryImpl(name);
        dir.parentDir = this;
        this.children.push(dir);
        return dir;
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
