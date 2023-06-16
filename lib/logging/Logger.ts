import { LogLevel } from "./LogLevel";

export interface Logger {
  level: LogLevel;
  log(level: LogLevel, message: string): void;
  trace(message: string): void;
  debug(message: string): void;
  info(message: string): void;
  warn(message: string, error?: Error): void;
  error(message: string, error?: Error): void;
  fatal(message: string, error?: Error): void;
}
