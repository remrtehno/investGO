import {FC} from "react";
import {RouteProps} from "react-router";
import {RegisterPage} from "../../pages/RegisterPage";
import {ProfilePage} from "../../pages/ProfilePage";
import {SignPage} from "../../pages/SignPage";

export type RouteInfo = RouteProps & {
  Component: FC
}

export const routes: RouteInfo[] = [{
  path: '/profile',
  Component: ProfilePage,
  exact: true,
}, {
  path: '/registration',
  Component: RegisterPage,
  exact: true,
}, {
  path: '/signin',
  Component: SignPage,
  exact: true,
}, {
  path: '/',
  Component: ProfilePage,
  exact: true,
}];