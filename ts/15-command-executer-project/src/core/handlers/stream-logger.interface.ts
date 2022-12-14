export interface iStreamLogger {
    log(...args: any[]): void
    end(): void
    error(...args: any[]): void
}