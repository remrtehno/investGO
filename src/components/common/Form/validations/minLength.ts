export const minLength = (min: number, msg = `Минимальная длинна: ${min}`) => (value: any) => {
  return value && value.length < min ? msg : null;
}