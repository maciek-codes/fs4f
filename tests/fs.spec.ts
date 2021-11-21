import 'jest';
import { FileSystem } from '../src/fs' ;

describe('File System', () => {
    test('returns a root directory', () => {
        const fs = new FileSystem();
        const root_dir = fs.root();
        expect(root_dir.path()).toBe("/");
        expect(root_dir.children).toHaveLength(0);
        expect(fs.currentDir().path()).toBe(root_dir.path());
    });

    test('can go to another directory', () => {
        const fs = new FileSystem();
        fs.root().createDir("music").createDir("albums");
        fs.root().createDir("photos");

        expect(fs.currentDir().path()).toBe("/");
        
        expect(fs.changeDir("music")).toBeTruthy();
        expect(fs.currentDir().path()).toBe("/music/");
        expect(fs.changeDir("albums")).toBeTruthy();
        expect(fs.currentDir().path()).toBe("/music/albums/");

        fs.changeDir("..");
        fs.changeDir("..");
        expect(fs.currentDir().path()).toBe("/");

        fs.changeDir("photos");
        expect(fs.currentDir().path()).toBe("/photos/");
    });
    
    test('parent of root is root', () => {
        const fs = new FileSystem();
        expect(fs.currentDir().path()).toBe("/");
        expect(fs.changeDir("..")).toBeTruthy();
        expect(fs.currentDir().path()).toBe("/");
    });

    test('cannot go to a non-existent dir', () => {
        // Can't go to a non existen't dir
        const fs = new FileSystem();
        fs.createDir("photos");
        fs.changeDir("photos");
        expect(fs.changeDir("family albums")).toBeFalsy();
        expect(fs.currentDir().path()).toBe("/photos/");
    });

    test('can create a directory in current dir', () => {
        const fs = new FileSystem();
        expect(fs.createDir("foo")).not.toBeNull();
    });
});
