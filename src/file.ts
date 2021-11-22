import { Metadata } from "./metadata";

/**
 * Represents a file in the in-memory file system.
 * The contents of the file are stored as a Buffer (byte sequence, fixed-length) encoded in utf-8.
 * 
 * Currently it supports over-writing the file, but nothing special like appening to the file.
 */
export class File {
    readonly name: string;
    readonly metadata: Metadata;
    private _contents?: Buffer;
    
    /**
     * Get the file contents as a string
     */
    get contents(): string {
        if (!this._contents) {
            return "";
        }
        return this._contents.toString('utf-8');
    }

    constructor(name: string) {
        this.name = name;
        this.metadata = new Metadata();
    }

    /**
     * Write a buffer to the file, it will over-write existing content
     * @param contents text content to be written
     * @returns number of bytes written
     */
    public write(toWrite: string) : number {
        Buffer.from
        this._contents = Buffer.from(toWrite, 'utf-8');
        this.metadata.updateModified();
        return this._contents.length;
    }
}
