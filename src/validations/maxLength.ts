export const maxLength = (max: number, msg = `Максимальная длинна: ${max}`) => {
  return (value: any) => (value && value.length > max ? msg : null);
};
