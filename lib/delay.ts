export function delay<T>(resolveValue: T, delayMilliseconds = 250): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resolveValue);
    }, delayMilliseconds);
  });
}
