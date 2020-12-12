export const api = {
  user: {
    signIn: () => '/user/signin',
    signUp: () => '/user/signup',
    get: () => '/user'
  },
  passport: {
    get: () => '/passport',
    save: () => '/passport',
  }
};