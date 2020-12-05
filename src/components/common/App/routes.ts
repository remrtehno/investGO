import {FC} from "react";
import {RouteProps} from "react-router";
import {SignPage} from "../../pages/SignPage";
import {ProfilePage} from "../../pages/ProfilePage";

export type RouteInfo = RouteProps & {
  Component: FC
}

export const routes: RouteInfo[] = [{
  path: '/signin',
  Component: SignPage,
  exact: true,
}, {
  path: '/profile',
  Component: ProfilePage,
  exact: true,
}, {
  path: '/',
  Component: () => null,
}];