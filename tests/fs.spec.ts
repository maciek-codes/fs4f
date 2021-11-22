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

    test('fails to remove a dir if it doesn\'t exist', () => {
        const fs = new FileSystem();
        expect(() => fs.removeDir("docs")).toThrowError();
    });
});
