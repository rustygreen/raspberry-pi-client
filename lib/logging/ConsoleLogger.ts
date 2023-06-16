import { BaseLogger } from "./BaseLogger";
import { LogLevel } from "./LogLevel";

export class ConsoleLogger extends BaseLogger {
  protected doLog(level: LogLevel, message: string, error?: Error): void {
    console.log(`${LogLevel[level]}: ${message}`);

    if (error) {
      console.error(error);
    }
  }
}
