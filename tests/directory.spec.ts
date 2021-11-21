import { FileSystem } from "../src/fs";

describe("Directory", () => {
    test("Can create a sub-directory", () => {
        const parentDir = new FileSystem().root();
        expect(parentDir.children).toHaveLength(0);

        const subDir = parentDir.createDir("docs");
        expect(parentDir.children).toHaveLength(1);
        expect(subDir.path()).toBe("/docs/");

        const subDir2 = subDir.createDir("work");
        expect(subDir.children).toHaveLength(1);
        expect(subDir2.path()).toBe("/docs/work/");
    });

    test("Can can't have duplicate child items", () => {
        const parentDir = new FileSystem().root();
        expect(parentDir.children).toHaveLength(0);

        parentDir.createDir("docs");
        expect(() => parentDir.createDir("docs")).toThrowError();
        expect(parentDir.children).toHaveLength(1);
    });
})
