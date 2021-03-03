import {FC} from "react";
import {RouteProps} from "react-router";
import {RegisterPage} from "../../pages/RegisterPage";
import {ProfilePage} from "../../pages/ProfilePage";
import {SignPage} from "../../pages/SignPage";
import {RecoverPage} from "../../pages/RecoverPage";
import { PasswordResetPage } from "src/components/pages/PasswordResetPage";

export type RouteInfo = RouteProps & {
  Component: FC
}

export const routes: RouteInfo[] = [
  {
    path: '/',
    Component: ProfilePage,
    exact: true,
  },
  {
    path: '/profile',
    Component: ProfilePage,
    exact: true,
  },
  {
    path: '/registration',
    Component: RegisterPage,
    exact: true,
  },
  {
    path: '/signin',
    Component: SignPage,
    exact: true,
  },
  {
    path: '/recover',
    Component: RecoverPage,
    exact: true,
  },
  {
    path: '/password-reset',
    Component: PasswordResetPage,
    exact: true,
  },
];