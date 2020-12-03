export const email = (msg = 'Невалидный email') => (value: string) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return msg;
  }
  return null;
}
