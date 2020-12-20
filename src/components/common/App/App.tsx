import React, {FC, useEffect, useState} from "react";
import {BrowserRouter, Route, StaticRouter} from 'react-router-dom';
import {RecoilRoot, useRecoilValue} from "recoil";

import 'src/components/common/Form/fields/dateField';
import 'src/components/common/Form/fields/fileArrayField';
import 'src/components/common/Form/fields/numberField';
import 'src/components/common/Form/fields/textField';
import 'src/components/common/Form/fields/passportField';

import {useUserApi} from "src/hooks/useUser";
import 'src/libs/bootstrap/bootstrap-grid.css';
import 'src/libs/bootstrap/bootstrap-reboot.css';
import 'src/theme/colors.css';
import {userState} from "../../../recoil/userState";
import {RequestStatus} from "../../../types/common";
import {SignPage} from "../../pages/SignPage";
import {routes} from "./routes";

const AppContent: FC = () => {
  const userApi = useUserApi();
  const { status: userStatus, user } = useRecoilValue(userState);
  const [isUserInit, setIsUserInit] = useState(false);

  useEffect(() => {
    userApi.get();
  }, []);

  useEffect(() => {
    if (userStatus === RequestStatus.success || userStatus === RequestStatus.failed) {
      setIsUserInit(true);
    }
  }, [userStatus]);

  if (isUserInit && !user) {
    return (
      <SignPage/>
    );
  }

  return (
    <div>
      {routes.map((route, index) => {
        const { Component, ...routeProps } = route;
        return (
          <Route key={index} {...routeProps}>
            <Component/>
          </Route>
        )
      })}
      <div id="modal-root"/>
    </div>
  )
}

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
          <AppContent/>
        </StaticRouter>
      )
    }

    return (
      <BrowserRouter>
        <AppContent/>
      </BrowserRouter>
    )
  }

  return (
    <RecoilRoot>
      {renderRouter()}
    </RecoilRoot>
  )
};
