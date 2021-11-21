import { FileSystem } from "../src/fs";

describe("Directory", () => {
    test("Can create a sub-directory", () => {
        const parentDir = new FileSystem().root();
        expect(parentDir.children).toHaveLength(0);

        const subDir = parentDir.createDir("docs");
        expect(parentDir.children).toHaveLength(1);
        expect(subDir.path()).toBe("/docs/");
    })
})
