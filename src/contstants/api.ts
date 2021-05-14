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
    documents: () => '/user/documents',
    passwordResetRequest: () => '/user/password-reset-request',
    passwordReset: () => '/user/password-reset',
  },
  passport: {
    get: () => '/passport',
    save: () => '/passport',
  },
  common: {
    uploadFile: () => '/file/upload',
    uploadImage: () => '/image/upload',
    confirmEmail: () => '/user/email-confirm',
    okved: () => '/okved',
  },
  company: {
    get: () => '/company',
    save: () => '/company',
    saveBankDetails: () => '/company/bank-details',
  },
  project: {
    saveProject: () => '/company/project',
    getProject: () => '/company/project',
    moderateProject: () => '/company/project/moderating',
  },
  sms: {
    sign: () => '/sms-sign',
  },
  borrower: {
    accessionAgreement: () => '/borrower/accession-agreement',
    loanRequest: () => '/borrower/loan-request',
    getLoanRequest: (loanId: string) => `/borrower/loan-request/${loanId}`,
  },
  investor: {
    accessionAgreement: () => '/investor/accession-agreement',
    loanRequest: () => '/investor/loan-request',
    projects: () => '/investor/available-projects',
    getLoanRequest: (loanId: string) => `/investor/loan-request/${loanId}`,
    createInvestAgreement: () => '/investor/invest-agreement',
  },
};
