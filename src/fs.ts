import { Directory, DirectoryImpl } from "./directory";

export class FileSystem {
    private rootDir: Directory;

    constructor() {
        this.rootDir = new DirectoryImpl("");
    }

    public root(): Directory {
        return this.rootDir;
    }
}
