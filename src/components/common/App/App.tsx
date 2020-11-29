import React, {FC} from "react";
import {RecoilRoot} from "recoil";

import '../../../libs/bootstrap/bootstrap-grid.css';
import '../../../libs/bootstrap/bootstrap-reboot.css';
import {SignPage} from "../../pages/SignPage";

export const App: FC = () => {
  return (
    <RecoilRoot>
      <SignPage/>
    </RecoilRoot>
  )
};
