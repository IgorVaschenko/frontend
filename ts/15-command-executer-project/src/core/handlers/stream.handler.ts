import { ChildProcessWithoutNullStreams } from "child_process";
import { iStreamLogger } from "./stream-logger.interface";

export class StreamHandler {
    constructor(private logger: iStreamLogger) { }

    processOutput(stream: ChildProcessWithoutNullStreams) { // Проксируем стрим, ChildProcessWithoutNullStreams -->из node
        stream.stdout.on('data', (data: any) => {           // работа со стримами, добавлем слашатели log, error, end    
            this.logger.log(data.toString())
        })

        stream.stderr.on('data', (data: any) => {
            this.logger.error(data.toString())
        })

        stream.on('close', () => {
            this.logger.end()
        })
    }
}