import { FileSystem } from "../src/fs";

describe("Directory", () => {
    test("can create a sub-directory", () => {
        const parentDir = new FileSystem().root;
        expect(parentDir.list()).toHaveLength(0);

        const subDir = parentDir.createDir("docs");
        expect(parentDir.list()).toHaveLength(1);
        expect(subDir.path).toBe("/docs/");

        const subDir2 = subDir.createDir("work");
        expect(subDir.list()).toHaveLength(1);
        expect(subDir2.path).toBe("/docs/work/");
    });

    test("can't have duplicate child items", () => {
        const parentDir = new FileSystem().root;
        expect(parentDir.list()).toHaveLength(0);

        // Can't create a different item with the same name
        const docDir = parentDir.createDir("docs");
        expect(() => parentDir.createFile("docs")).toThrowError();
        expect(parentDir.list()).toHaveLength(1);

        // But trying to create the same item should work
        const sameDir = parentDir.createDir("docs");
        expect(sameDir.path).toBe(docDir.path);
    });

    test("can list its contents", () => {
        const parentDir = new FileSystem().root;
        expect(parentDir.list()).toHaveLength(0);

        const docsDir = parentDir.createDir("docs");
        const videosDir = parentDir.createDir("videos");
        const picturesDir = parentDir.createDir("pictures");
        const textFile = parentDir.createFile("myDoc.txt");
        const items = parentDir.list();
        expect(items).toContain(docsDir);
        expect(items).toContain(videosDir);
        expect(items).toContain(picturesDir);
        expect(items).toContain(textFile);
    });

    test("modified at updates when items added", async () => {
        const parentDir = new FileSystem().root;
        const createdAt = parentDir.metadata.createdAt;
        const modifiedAt = parentDir.metadata.modifiedAt;
        // Let some time pass
        await new Promise((r) => setTimeout(r, 50));
        parentDir.createFile("blabla");
        expect(parentDir.metadata.createdAt).toBe(createdAt);
        expect(parentDir.metadata.modifiedAt.valueOf()).toBeGreaterThan(modifiedAt.valueOf());    
    });
})
