import { FileSystem } from "../src/fs";

describe("Directory", () => {
    test("can create a sub-directory", () => {
        const parentDir = new FileSystem().root();
        expect(parentDir.list()).toHaveLength(0);

        const subDir = parentDir.createDir("docs");
        expect(parentDir.list()).toHaveLength(1);
        expect(subDir.path()).toBe("/docs/");

        const subDir2 = subDir.createDir("work");
        expect(subDir.list()).toHaveLength(1);
        expect(subDir2.path()).toBe("/docs/work/");
    });

    test("can't have duplicate child items", () => {
        const parentDir = new FileSystem().root();
        expect(parentDir.list()).toHaveLength(0);

        parentDir.createDir("docs");
        expect(() => parentDir.createDir("docs")).toThrowError();
        expect(parentDir.list()).toHaveLength(1);
    });

    test("can list its contents", () => {
        const parentDir = new FileSystem().root();
        expect(parentDir.list()).toHaveLength(0);

        const docsDir = parentDir.createDir("docs");
        const videosDir = parentDir.createDir("videos");
        const picturesDir = parentDir.createDir("pictures");
        const items = parentDir.list();
        expect(items).toContain(docsDir);
        expect(items).toContain(videosDir);
        expect(items).toContain(picturesDir);
    });
})
