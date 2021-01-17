export function phone(msg = 'Некорректный телефон') {
  return function validatePhone(value: string) {
    if (!value) {
      return null;
    }

    return value.length === 12 ? null : 'Некорректный телефон';
  };
}
