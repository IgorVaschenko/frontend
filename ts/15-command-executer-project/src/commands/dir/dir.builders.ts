export class DirBuilder {
    private options: Map<string, string> = new Map()

    detailedOutput(): this {
        this.options.set('-l', '')
        return this
    }

    output(): string[] {
        const args: string[] = []
        this.options.forEach((key, value) => {
            args.push(key)
            args.push(value)
        })
        return args
    }
}