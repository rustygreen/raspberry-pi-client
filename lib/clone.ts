export function clone<T = any>(value: T): T {
  const json = JSON.stringify(value);
  return JSON.parse(json);
}
