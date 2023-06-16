import { wait } from "./wait";

export async function retry<T>(
  fn: () => Promise<T>,
  retries = 1,
  retryWaitMilliseconds = 1000
): Promise<T> {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    const doRetry = retries > 0;

    if (doRetry) {
      await wait(retryWaitMilliseconds || 0);
      return retry(fn, retries - 1, retryWaitMilliseconds);
    } else {
      throw error;
    }
  }
}
