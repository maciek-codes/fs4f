
/**
 * Describes metadata about objects in our FS.
 * We can exend this in the future to provide user-defined metadata fields.
 */
export class Metadata {
    private modifiedAt_: Date;

    public readonly createdAt: Date;

    public get modifiedAt(): Date {
        return this.modifiedAt_;
    }

    constructor() {
        this.createdAt = this.getNowUTC();
        this.modifiedAt_ = this.getNowUTC();
    }

    public updateModified() {
        this.modifiedAt_ = this.getNowUTC();
    }

    /**
     * Return the current datetime in UTC format
     */
    private getNowUTC() {
        const now = new Date();
        return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 
            now.getUTCHours(), now.getUTCMinutes(),
            now.getUTCSeconds(), now.getUTCMilliseconds());
    }
}

