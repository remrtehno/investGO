import type { FC } from 'react';
import type { RouteProps } from 'react-router';

import { AboutUs } from 'src/components/pages/AboutUs';
import { BorrowerLoanRequestsPage } from 'src/components/pages/BorrowerLoanRequestsPage';
import { BorrowerPage } from 'src/components/pages/BorrowerPage';
import { CompanyEditPage } from 'src/components/pages/CompanyEditPage';
import { CreateLoanRequestPage } from 'src/components/pages/CreateLoanRequestPage';
import { EmailConfirmationPage } from 'src/components/pages/EmailConfirmationPage';
import { InvestOfferPage } from 'src/components/pages/InvestOfferPage';
import { InvestorPage } from 'src/components/pages/InvestorPage';
import { LoanRequestPage } from 'src/components/pages/LoanRequestPage';
import { PasswordResetPage } from 'src/components/pages/PasswordResetPage';
import { ProfilePage } from 'src/components/pages/ProfilePage';
import { ProjectsPage } from 'src/components/pages/ProjectsPage';
import { RecoverPage } from 'src/components/pages/RecoverPage';
import { RegisterPage } from 'src/components/pages/RegisterPage';
import { SignPage } from 'src/components/pages/SignPage';
import { Page404 } from 'src/components/pages/Page404';

export type RouteInfo = RouteProps & {
  Component: FC
}

export const RoutePaths = {
  about: '/about',
  projects: '/investor/projects',
  profile: '/profile',
  registration: '/registration',
  signin: '/signin',
  emailConfirmation: '/email-confirmation',
  home: '/',
  recover: '/recover',
  passwordReset: '/password-reset',
  investorDashboard: '/investor/dashboard',
  borrowerDashboard: '/borrower/dashboard',
  borrowerLoanRequests: '/borrower/loan-requests',
  createLoanRequest: (companyId = ':companyId') => `/borrower/create-loan-request/${companyId}`,
  loanRequest: (loanId = ':loanId') => `/borrower/loan-request/${loanId}`,
  companyEdit: (companyId = ':companyId') => `/company/edit/${companyId}`,
  investOffer: (loanId = ':loanId') => `/offer/${loanId}`,
  page404: '',
};

export const routes: RouteInfo[] = [
  {
    path: RoutePaths.about,
    Component: AboutUs,
    exact: true,
  }, {
    path: RoutePaths.projects,
    Component: ProjectsPage,
    exact: true,
  }, {
    path: RoutePaths.profile,
    Component: ProfilePage,
    exact: true,
  }, {
    path: RoutePaths.registration,
    Component: RegisterPage,
    exact: true,
  }, {
    path: RoutePaths.signin,
    Component: SignPage,
    exact: true,
  }, {
    path: RoutePaths.emailConfirmation,
    Component: EmailConfirmationPage,
    exact: true,
  }, {
    path: RoutePaths.home,
    Component: ProfilePage,
    exact: true,
  }, {
    path: RoutePaths.recover,
    Component: RecoverPage,
    exact: true,
  }, {
    path: RoutePaths.passwordReset,
    Component: PasswordResetPage,
    exact: true,
  },
  {
    path: RoutePaths.investorDashboard,
    Component: InvestorPage,
    exact: true,
  },
  {
    path: RoutePaths.borrowerDashboard,
    Component: BorrowerPage,
    exact: true,
  },
  {
    path: RoutePaths.borrowerLoanRequests,
    Component: BorrowerLoanRequestsPage,
    exact: true,
  },
  {
    path: RoutePaths.companyEdit(),
    Component: CompanyEditPage,
    exact: true,
  },
  {
    path: RoutePaths.createLoanRequest(),
    Component: CreateLoanRequestPage,
    exact: true,
  },
  {
    path: RoutePaths.loanRequest(),
    Component: LoanRequestPage,
    exact: true,
  },
  {
    path: RoutePaths.investOffer(),
    Component: InvestOfferPage,
    exact: true,
  },
  {
    exact: true,
    path: RoutePaths.page404,
    Component: Page404,
  }
];
