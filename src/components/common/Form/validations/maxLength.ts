export const maxLength = (max: number, msg = `Максимальная длинна: ${max}`) => (value: any) => {
  return value && value.length > max ? msg : null;
}