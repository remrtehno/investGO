import type {FC} from 'react';
import type {RouteProps} from 'react-router';

import {AboutUs} from 'src/components/pages/AboutUs';
import {ProfilePage} from 'src/components/pages/ProfilePage';
import {ProjectsPage} from 'src/components/pages/ProjectsPage';
import {RegisterPage} from 'src/components/pages/RegisterPage';
import {SignPage} from 'src/components/pages/SignPage';

export type RouteInfo = RouteProps & {
  Component: FC
}

export const routes: RouteInfo[] = [{
  path: '/about',
  Component: AboutUs,
  exact: true,
}, {
  path: '/projects',
  Component: ProjectsPage,
  exact: true,
}, {
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
