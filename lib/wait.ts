import { minutesToMilliseconds } from "./conversion/minutesToMilliseconds";
import { secondsToMilliseconds } from "./conversion/secondsToMilliseconds";

export function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function waitSeconds(seconds: number): Promise<void> {
  const milliseconds = secondsToMilliseconds(seconds);
  return wait(milliseconds);
}

export function waitMinutes(minutes: number): Promise<void> {
  const milliseconds = minutesToMilliseconds(minutes);
  return wait(milliseconds);
}
