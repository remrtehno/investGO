export const api = {
  user: {
    signIn: () => '/user/signin',
    signOut: () => '/user/signout',
    checkExists: () => '/user/check-exists',
    signUp: () => '/user/signup',
    get: () => '/user',
    sendPhoneCode: () => '/user/phone-send-code',
    confirmPhoneCode: () => '/user/phone-confirm',
    selectRoles: () => '/user/roles',
  },
  passport: {
    get: () => '/passport',
    save: () => '/passport',
  },
  common: {
    uploadFile: () => '/file/upload',
    confirmEmail: () => '/user/email-confirm',
  },
  company: {
    get: () => '/company',
    save: () => '/company',
    saveBankDetails: () => '/company/bank-details',
  },
};
