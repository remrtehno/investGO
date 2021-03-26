export type Plurals = [string, string, string]

export const plural = (number: number, plurals: Plurals):string => {
  const [one, two, five] = plurals;

  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};
