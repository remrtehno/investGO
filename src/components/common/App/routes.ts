import type {FC} from 'react';
import type {RouteProps} from 'react-router';

import {AboutUs} from 'src/components/pages/AboutUs';
import {BorrowerPage} from 'src/components/pages/BorrowerPage';
import {EmailConfirmationPage} from 'src/components/pages/EmailConfirmationPage';
import {InvestorPage} from 'src/components/pages/InvestorPage';
import {PasswordResetPage} from 'src/components/pages/PasswordResetPage';
import {ProfilePage} from 'src/components/pages/ProfilePage';
import {ProjectsPage} from 'src/components/pages/ProjectsPage';
import {RecoverPage} from 'src/components/pages/RecoverPage';
import {RegisterPage} from 'src/components/pages/RegisterPage';
import {SignPage} from 'src/components/pages/SignPage';

export type RouteInfo = RouteProps & {
  Component: FC
}

export enum RoutePaths {
  about = '/about',
  projects = '/projects',
  profile = '/profile',
  registration = '/registration',
  signin = '/signin',
  emailConfirmation = '/email-confirmation',
  home = '/',
  recover = '/recover',
  passwordReset = '/password-reset',
  investorDashboard = '/investor-dashboard',
  borrowerDashboard = '/borrower-dashboard',
}

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
];
