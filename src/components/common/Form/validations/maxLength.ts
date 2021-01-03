export const maxLength = (max: number, msg = `Максимальная длинна: ${max}`) => (value: any) => (value && value.length > max ? msg : null);
