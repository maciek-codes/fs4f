
export class Path {
    public static readonly Separator = '/';
    public static readonly ParentPath = "..";
    public readonly components: string[];
    public readonly isAbsolute;

    private constructor(components: string[], isAbsolute: boolean) {
        this.components = components;
        this.isAbsolute = isAbsolute;
    }

    public static fromString(path: string): Path {
        if (!path) {
            throw new Error("String required");
        }

        let component = "";
        const components = [];
        const isAbsolute = path.startsWith(Path.Separator);
        let i = isAbsolute ? 1 : 0;
        while(path && i < path.length) {
            const isSeparator = path[i] === Path.Separator;
            const hasNext = (i + 1) < path.length;
            const nextIsSeparator = hasNext && path[i + 1] === Path.Separator;
                
            if (!isSeparator) {
                // If the character is escape, check if next is the separator.
                // If not, add it, otherwise, we skip
                const isEscape = path[i] === "\\";
                if (isEscape && nextIsSeparator) {
                    ++i;
                }
                
                component += path[i];
            } else {
                // Check if next is a separator
                if (!nextIsSeparator) {
                    components.push(component);
                    component = '';
                }
            }
            ++i;
        }

        // Any last component
        if (component !== '') {
            components.push(component);
        }

        return new Path(components, isAbsolute);
    }
}
