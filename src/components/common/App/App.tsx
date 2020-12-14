import React, {FC, useEffect} from "react";
import {RecoilRoot} from "recoil";
import {useUserApi} from "src/hooks/useUser";
import 'src/libs/bootstrap/bootstrap-grid.css';
import 'src/libs/bootstrap/bootstrap-reboot.css';
import 'src/theme/colors.css';
import {StaticRouter, Route, BrowserRouter} from 'react-router-dom';
import {routes} from "./routes";

import 'src/components/common/Form/fields/textField';
import 'src/components/common/Form/fields/numberField';
import 'src/components/common/Form/fields/fileArrayField';

const AppContent: FC = () => {
  const userApi = useUserApi();

  useEffect(() => {
    userApi.get();
  }, []);

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
