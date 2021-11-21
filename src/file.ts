export class File {
    readonly name: string;
    private _contents?: Buffer;
    
    get contents() {
        return this._contents;
    }

    constructor(name: string) {
        this.name = name;
    }

    /**
     * Write a buffer to the file, it will over-write existing content
     * @param contents text content to be written
     * @returns number of bytes written
     */
    public write(toWrite: string) : number {
        this._contents = Buffer.alloc(toWrite.length, 0);
        const written = this._contents.write(toWrite, toWrite.length);
        return written;
    }
}
