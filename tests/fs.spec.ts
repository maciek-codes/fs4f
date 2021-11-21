import 'jest';
import { FileSystem } from '../src/fs' ;

describe('File System', () => {
    test('returns a root directory', () => {
        const fs = new FileSystem();
        const root_dir = fs.root();
        expect(root_dir.path()).toBe("/");
        expect(root_dir.children).toHaveLength(0);
    });
});
