import { Directory } from "../src/directory"
import { File } from "../src/file";
import { FsUtil } from "../src/util";

describe("File Utils", () => {
    test("isDirectory", () => {
        const dir = new Directory("baz");
        expect(FsUtil.isDirectory(dir)).toBeTruthy();

        const file = new File("foo");
        expect(FsUtil.isDirectory(file)).toBeFalsy();
    });

    test("isFile", () => {
        const file = new File("foo");
        expect(FsUtil.isFile(file)).toBeTruthy();

        const dir = new Directory("bar");
        expect(FsUtil.isFile(dir)).toBeFalsy();
    });
});
