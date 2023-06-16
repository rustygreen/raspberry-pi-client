import { times } from "./times";

export function generateArray<T>(
  iterateTimes: number,
  predicate: (index: number) => T
): T[] {
  const list: T[] = [];
  times(iterateTimes, (index) => {
    const result = predicate(index);
    list.push(result);
  });

  return list;
}
