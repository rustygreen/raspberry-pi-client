/**
 * Iterates "n" number of times and calls a predicate function each time.
 */
export function times(
  iterateTimes: number,
  predicate: (index: number) => void
): void {
  let index = 0;
  if (iterateTimes > 0) {
    predicate(index);
    times(iterateTimes - 1, predicate);
    index++;
  }
}
