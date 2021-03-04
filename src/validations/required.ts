export const required = (msg = 'Обязательное поле') => (value: any) => {
  if (value == null) {
    return msg;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? null : msg;
  }

  if (!value && typeof value !== 'number' && typeof value !== 'boolean') {
    return msg;
  }

  return null;
};
