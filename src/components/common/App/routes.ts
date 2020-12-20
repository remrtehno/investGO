import {FC} from "react";
import {RouteProps} from "react-router";
import {RegisterPage} from "../../pages/RegisterPage";
import {ProfilePage} from "../../pages/ProfilePage";

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
  path: '/',
  Component: () => null,
}];