import React, {FC} from "react";
import {Page} from "../../common/Page";
import {SignForm} from "./SignForm";

export const SignPage: FC = () => {
  return (
    <Page>
      <SignForm isEmailExists={true}/>
    </Page>
  )
};
