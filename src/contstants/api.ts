export const api = {
  user: {
    signIn: () => '/user/signin',
    signOut: () => '/user/signout',
    checkExists: () => '/user/check-exists',
    signUp: () => '/user/signup',
    get: () => '/user',
    sendPhoneCode: () => '/user/phone-send-code',
    confirmPhoneCode: () => '/user/phone-confirm',
    passwordResetRequest: () => '/user/password-reset-request',
    passwordReset: () => '/user/password-reset',
  },
  passport: {
    get: () => '/passport',
    save: () => '/passport',
  },
  common: {
    uploadFile: () => '/file/upload',
  }
};