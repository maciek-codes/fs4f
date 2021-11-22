import { Directory, FsItem } from "./directory";
import { File } from './file';

export class FsUtil {
    public static isDirectory(item: FsItem): boolean {
        return (item instanceof Directory);
    }

    public static isFile(item: FsItem): boolean {
        return (item instanceof File);
    }
}
