import React, {FC} from "react";
import {RecoilRoot} from "recoil";

import {SignPage} from "../../pages/SignPage";

export const App: FC = () => {
  return (
    <RecoilRoot>
      <SignPage/>
    </RecoilRoot>
  )
};
