type KeySelector<T> = (item: T) => string | number;

export function sortByKey<T>(list: T[], keySelector: KeySelector<T>): T[] {
  return list.sort((a, b) => {
    const keyA = keySelector(a);
    const keyB = keySelector(b);
    if (keyA < keyB) {
      return -1;
    } else if (keyA > keyB) {
      return 1;
    } else {
      return 0;
    }
  });
}
