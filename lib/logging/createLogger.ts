import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";
import { ConsoleLogger } from "./ConsoleLogger";

export function createLogger(source: string, level = LogLevel.Debug): Logger {
  return new ConsoleLogger(level);
}
