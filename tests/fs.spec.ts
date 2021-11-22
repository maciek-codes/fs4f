import 'jest';
import { FileSystem } from '../src/fs' ;
import { File } from '../src/file';

describe('File System', () => {
    test('returns a root directory', () => {
        const fs = new FileSystem();
        const root_dir = fs.root;
        expect(root_dir.path).toBe("/");
        expect(root_dir.list()).toHaveLength(0);
        expect(fs.currentDir().path).toBe(root_dir.path);
    });

    test('can go to another directory', () => {
        const fs = new FileSystem();
        fs.root.createDir("music").createDir("albums");
        fs.root.createDir("photos");

        expect(fs.currentDir().path).toBe("/");
        
        expect(fs.changeDir("music")).toBeTruthy();
        expect(fs.currentDir().path).toBe("/music/");
        expect(fs.changeDir("albums")).toBeTruthy();
        expect(fs.currentDir().path).toBe("/music/albums/");

        fs.changeDir("..");
        fs.changeDir("..");
        expect(fs.currentDir().path).toBe("/");

        fs.changeDir("photos");
        expect(fs.currentDir().path).toBe("/photos/");
    });
    
    test('parent of root is root', () => {
        const fs = new FileSystem();
        expect(fs.currentDir().path).toBe("/");
        expect(fs.changeDir("..")).toBeTruthy();
        expect(fs.currentDir().path).toBe("/");
    });

    test('cannot go to a non-existent dir', () => {
        // Can't go to a non existen't dir
        const fs = new FileSystem();
        fs.createDir("photos");
        fs.changeDir("photos");
        expect(fs.changeDir("family albums")).toBeFalsy();
        expect(fs.currentDir().path).toBe("/photos/");
    });

    test('can create a directory in current dir', () => {
        const fs = new FileSystem();
        expect(fs.createDir("foo")).not.toBeNull();
    });

    test('can create a file in current dir', () => {
        const fs = new FileSystem();
        expect(fs.createFile("foo")).not.toBeNull();
        expect(() => fs.createFile("/foo/..")).toThrowError();
    });

    test('can create a file in a path', () => {
        const fs = new FileSystem();
        const file = fs.createFile("/tmp/foo.txt");
        expect(file.name).toBe("foo.txt");
        fs.changeDir("/tmp");
        expect(fs.currentDir().list()).toHaveLength(1);

        fs.createFile("/foo.txt");
        expect(fs.root.list()).toHaveLength(2);
    });

    test('can create directories from absolute path', () => {
        const fs = new FileSystem();
        expect(fs.createDir("/foo/bar")).not.toBeNull();
        expect(fs.createDir("/foo/baz/xyz")).not.toBeNull();
        expect(fs.createDir("/foo/baz/xyz/../abc")).not.toBeNull();

        // Return a handle to the existing dir
        const fooDir = fs.createDir("/foo");
        expect(fooDir.list()).toHaveLength(2);
    });

    test('can create directories from relative path', () => {
        const fs = new FileSystem();
        fs.createDir("/tmp/xyz");
        fs.changeDir("/tmp/xyz/");

        const fooBarDir = fs.createDir("foo/bar/");
        expect(fooBarDir.path).toBe("/tmp/xyz/foo/bar/")
    });

    test('can copy directories', () => {
        const fs = new FileSystem();
        const docsDir = fs.root.createDir("docs");
        docsDir.createFile("doc1.txt").write("Hello doc");
        const importantDir = docsDir.createDir("important");
        importantDir.createFile("super-important.xls").write("VIP Info");

        const backupDir = fs.copyDir("docs", "docs - backup");
        expect(fs.root.list()).toContain(backupDir);
        fs.changeDir("docs - backup");
        expect(fs.currentDir().path).toBe("/docs - backup/");
        const backupContents = fs.currentDir().list();
        expect(backupContents).toHaveLength(2);
        fs.changeDir("important");
        const copiedFile = fs.currentDir().list()[0] as File;
        expect(copiedFile.name).toBe("super-important.xls");
        expect(copiedFile.contents).toBe("VIP Info");
    });

    test('fails to copy if source doesn\'t exist', () => {
        const fs = new FileSystem();
        expect(() => fs.copyDir("docs", "docs - backup")).toThrowError();
    });

    test ('can remove a dir in current working dir', () => {
        const fs = new FileSystem();
        fs.root.createDir("docs");
        fs.removeDir("docs");
        expect(fs.root.list()).toHaveLength(0);
    });

    test('remove is no-op if it doesn\'t exist', () => {
        const fs = new FileSystem();
        expect(() => fs.removeDir("docs")).not.toThrowError();
        expect(() => fs.removeDir("/tmp/docs")).not.toThrowError();
    });

    test('can find files', () => {
        const fs = new FileSystem();
        fs.createFile("/tmp/foo/bar/xyz.txt");
        fs.createFile("/tmp/foo/bak/xyz.txt");
        fs.createFile("/tmp/bar/foo/");

        expect(fs.find("xyz.txt")).toHaveLength(2);
        expect(fs.find("foo")).toHaveLength(2);
        expect(fs.find("123")).toHaveLength(0);
        fs.removeFile("/tmp/foo/bak/xyz.txt");
        expect(fs.find("xyz.txt")).toHaveLength(1);
    });
});
