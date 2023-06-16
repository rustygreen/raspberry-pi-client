export function getAverage(items: number[]): number {
  const length = items.length;
  const sum = items.reduce((prev, curr) => prev + curr);
  return sum / length;
}
