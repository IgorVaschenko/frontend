import { DirExecutor } from "./commands/dir/dir.executor"
import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor"
import { PromptService } from "./core/prompt/prompt.service"
import { ConsoleLogger } from "./out/console-logger/console-logger"

export class App {
    async run() {
        // const res = await (new PromptService()).input<number>('Число', 'number')
        // console.log(res);

        // new FfmpegExecutor(ConsoleLogger.getInstance()).execute()

        new DirExecutor(ConsoleLogger.getInstance()).execute() ///Error: spawn ls ENOENT
    }
}

const app = new App()
app.run()
