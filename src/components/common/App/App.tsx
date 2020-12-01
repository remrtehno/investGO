
import React, {FC, useEffect} from "react";
import {RecoilRoot} from "recoil";
import {useUserApi} from "../../../hooks/useUser";

import {SignPage} from "../../pages/SignPage";

const AppContent: FC = () => {
  const userApi = useUserApi();

  useEffect(() => {
    userApi.get();
  }, []);

  return (
    <SignPage/>
  )
}

export const App: FC = () => {
  return (
    <RecoilRoot>
      <AppContent/>
    </RecoilRoot>
  )
};
