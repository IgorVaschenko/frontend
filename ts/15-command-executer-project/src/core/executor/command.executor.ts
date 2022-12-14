import { ChildProcessWithoutNullStreams } from "child_process";
import { iStreamLogger } from "../handlers/stream-logger.interface";
import { ICommandExec } from "./command.types";


//Template method pattern
export abstract class CommandExecutor<Input> {//для каждого executor свой input =>> вводим generic 
    constructor(private logger: iStreamLogger) { }

    public async execute() {
        const input = await this.prompt()
        const command = this.build(input)
        const stream = this.spawn(command)
        this.processStream(stream, this.logger)
    }

    protected abstract prompt(): Promise<Input>   //protected исключение показа реализации наружу
    protected abstract build(input: Input): ICommandExec
    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: iStreamLogger): void
}
