import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";

const DEFAULT_LEVEL = LogLevel.Warn;

export abstract class BaseLogger implements Logger {
  level!: LogLevel;

  constructor(level?: LogLevel) {
    this.level = typeof level === "undefined" ? DEFAULT_LEVEL : level;
  }

  log(level: LogLevel, message: string, error?: Error): void {
    if (level >= this.level) {
      this.doLog(level, message, error);
    }
  }

  trace(message: string): void {
    this.log(LogLevel.Trace, message);
  }

  debug(message: string): void {
    this.log(LogLevel.Debug, message);
  }

  info(message: string): void {
    this.log(LogLevel.Info, message);
  }

  warn(message: string, error?: Error): void {
    this.log(LogLevel.Warn, message, error);
  }

  error(message: string, error?: Error): void {
    this.log(LogLevel.Error, message, error);
  }

  fatal(message: string, error?: Error): void {
    this.log(LogLevel.Fatal, message, error);
  }

  protected abstract doLog(
    level: LogLevel,
    message: string,
    error?: Error
  ): void;
}
