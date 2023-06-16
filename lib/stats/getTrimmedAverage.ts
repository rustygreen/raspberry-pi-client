import { getAverage } from "./getAverage";

export function getTrimmedAverage(items: number[]): number {
  const values = [...items];
  const lastIndex = values.length - 1;
  const min = { index: 0, value: values[0] };
  const max = { index: lastIndex, value: values[lastIndex] };

  for (const [index, value] of values.entries()) {
    const isMinIndex = value < min.value;
    const isMaxIndex = value > max.value;

    if (isMinIndex) {
      min.index = index;
      min.value = value;
    }

    if (isMaxIndex) {
      max.index = index;
      max.value = value;
    }
  }

  values.splice(min.index, 1);
  // NOTE: We need to subtract one because we just removed an item above.
  const maxIndex = max.index - 1;
  values.splice(maxIndex, 1);

  return getAverage(values);
}
