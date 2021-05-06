export const required = (msg = 'Обязательное поле') => (value: any) => {
  if (value == null) {
    return msg;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? null : msg;
  } if (typeof value === 'object') {
    if (value && Object.keys(value).length === 0) {
      return msg;
    }
  }

  if (!value && typeof value !== 'number' && typeof value !== 'boolean') {
    return msg;
  }

  if (typeof value === 'boolean' && !value) {
    return msg;
  }

  if (typeof value === 'number' && !value) {
    return msg;
  }

  return null;
};
