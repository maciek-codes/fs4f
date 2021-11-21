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
});
