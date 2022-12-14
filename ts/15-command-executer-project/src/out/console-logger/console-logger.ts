import { iStreamLogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements iStreamLogger { //singleton
    private static logger: ConsoleLogger
    private constructor() { }

    public static getInstance(): ConsoleLogger {
        if (!this.logger) this.logger = new ConsoleLogger()

        return this.logger
    }


    log(...args: any[]): void {
        console.log(...args);
    }
    error(...args: any[]): void {
        console.log(...args);
    }
    end(): void {
        console.log('Готово');
    }
}