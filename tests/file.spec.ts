import { File } from "../src/file";

describe("File", () => {
    test("can be created with a name", () => {
        const f1 = new File("Hello.txt");
        expect(f1.name).toBe("Hello.txt");
    });

    test("can write to a file", () => {
        const f1 = new File("Hello.txt");
        expect(f1.contents).toBe("");

        f1.write("Hello world");
        expect(f1.contents).toBe("Hello world");

        f1.write("Hello world2");
        expect(f1.contents).toBe("Hello world2");
    });

    test("returns empty string if no contents", () => {
        const f1 = new File("test.txt");
        expect(f1.contents).toBe("");
    });

    test("modified at updates on writes", async () => {
        const f1 = new File("test.txt");
        const createdAt = f1.metadata.createdAt;
        const modifiedAt = f1.metadata.modifiedAt;
        
        await new Promise((r) => setTimeout(r, 50));
        f1.write("blabla");
        expect(f1.metadata.createdAt).toBe(createdAt);
        expect(f1.metadata.modifiedAt.valueOf()).toBeGreaterThan(modifiedAt.valueOf());
    });
});
