import { Directory, FsItem } from "./directory";
import { File } from './file';

export class FsUtil {
    public static isDirectory(item: FsItem): boolean {
        return (item instanceof Directory);
    }

    public static isFile(item: FsItem): boolean {
        return (item instanceof File);
    }

    public static validateName(name: string) {
        if (name.length === 0 ||
            name === '' || name[0] === ' ' ||
            name[name.length - 1] === ' ') {
                throw new Error("Invalid directory name");
        }

        for (let index = 0; index < name.length; ++index) {
            if (name[index] === '\n' || name[index] === '\t'
                || name[index] === '\r') {
                throw new Error("Invalid directory name");
            }
        }
    }
}
