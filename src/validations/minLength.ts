export const minLength = (min: number, msg = `Минимальная длинна: ${min}`) => (value: any) => (value && value.length < min ? msg : null);
