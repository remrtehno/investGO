import React, {FC} from "react";
import {Page} from "../../common/Page";
import {SignForm} from "./SignForm";

export const SignPage: FC = () => {
  return (
    <div style={{ backgroundColor: '#F8F9FA' }}>
      <div className='container'>
        <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
          <div className='col-4'>
            <Page>
              <SignForm isEmailExists={true}/>
            </Page>
          </div>
        </div>
      </div>
    </div>
  )
};
