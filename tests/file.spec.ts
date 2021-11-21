import { File } from "../src/file";

describe("File", () => {
    test("can be created with a name", () => {
        const f1 = new File("Hello.txt");
        expect(f1.name).toBe("Hello.txt");
    })
});
