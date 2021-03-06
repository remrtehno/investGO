import type { FC } from 'react';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, StaticRouter, Switch } from 'react-router-dom';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { QueryParamProvider } from 'use-query-params';

import 'src/components/common/Form/fields/dateField';
import 'src/components/common/Form/fields/fileArrayField';
import 'src/components/common/Form/fields/fileField';
import 'src/components/common/Form/fields/numberField';
import 'src/components/common/Form/fields/textField';
import 'src/components/common/Form/fields/textAreaField';
import 'src/components/common/Form/fields/passwordField';
import 'src/components/common/Form/fields/phoneField';
import 'src/components/common/Form/fields/selectField';
import 'src/components/common/Form/fields/switchField';
import 'src/components/common/Form/fields/checkboxField';
import 'src/components/common/Form/fields/rangeField';
import 'src/libs/bootstrap/bootstrap-grid.css';
import 'src/libs/bootstrap/bootstrap-reboot.css';
import 'src/libs/helpers.scss';
import 'src/libs/bootstrap/bootstrap-utilities.css';
import 'src/theme/theme.css';
import 'src/theme/container.scss';
import { useUserDocuments } from 'src/api/userApi/useUserDocuments';
import { useUserApi } from 'src/hooks/useUser';
import { isPageInitAtom } from 'src/recoil/isPageInitAtom';
import { userAtom } from 'src/recoil/userAtom';
import { RequestStatus } from 'src/types/common';

import { routes } from './routes';

const AppContent: FC = () => {
  const userApi = useUserApi();
  const [, getSignDocuments] = useUserDocuments();
  const { status: userStatus } = useRecoilValue(userAtom);
  const setIsPageInit = useSetRecoilState(isPageInitAtom);

  useEffect(() => {
    userApi.get();
    getSignDocuments(null);
  }, []);

  useEffect(() => {
    if (userStatus === RequestStatus.success || userStatus === RequestStatus.failed) {
      setIsPageInit(true);
    }
  }, [userStatus]);

  return (
    <QueryParamProvider ReactRouterRoute={Route}>
      <Switch>
        {routes.map((route, index) => {
          const { Component, ...routeProps } = route;
          return (
            <Route key={index} {...routeProps}>
              <Component />
            </Route>
          );
        })}
      </Switch>
      <div id='modal-root' />
    </QueryParamProvider>
  );
};

export declare namespace App {
  export type Props = {
    url?: string
  };
}

export const App: FC<App.Props> = (props) => {
  function renderRouter() {
    if (typeof window === 'undefined') {
      return (
        <StaticRouter location={props.url}>
          <AppContent />
        </StaticRouter>
      );
    }

    return (
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    );
  }

  return (
    <RecoilRoot>
      { renderRouter()}
    </RecoilRoot>
  );
};
