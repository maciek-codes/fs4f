import { Path } from "../src/path";

describe("Path", () => {
    test("must provide a valid string", () => {
        expect(() => Path.fromString(null)).toThrowError();
        expect(() => Path.fromString("")).toThrowError();
        expect(() => Path.fromString(undefined)).toThrowError();
    });

    test("absolute path", () => {
        const p = Path.fromString("/");
        expect(p.isAbsolute).toBeTruthy();
        expect(p.components).toHaveLength(0);

        const p1 = Path.fromString("/foo/bar");
        expect(p1.isAbsolute).toBeTruthy();
        expect(p1.components).toHaveLength(2);
        expect(p1.components[0]).toBe("foo");
        expect(p1.components[1]).toBe("bar");

        const p2 = Path.fromString("/foo//bar//baz/with \\/ slash");
        expect(p2.isAbsolute).toBeTruthy();
        expect(p2.components).toHaveLength(4);
        expect(p2.components[2]).toBe("baz");
        expect(p2.components[3]).toBe("with / slash");
    });

    
    test("relative path", () => {
        const p = Path.fromString("foo");
        expect(p.isAbsolute).toBeFalsy();
        expect(p.components).toHaveLength(1);

        const p1 = Path.fromString("foo/bar");
        expect(p1.isAbsolute).toBeFalsy();
        expect(p1.components).toHaveLength(2);
        expect(p1.components[0]).toBe("foo");
        expect(p1.components[1]).toBe("bar");
    });
});
