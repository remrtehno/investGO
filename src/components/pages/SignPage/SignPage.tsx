import React, {FC} from "react";
import {Page} from "../../common/Page";
import {SignForm} from "./SignForm";
import cx from 'classnames';
import s from './SignPage.scss';

export const SignPage: FC = () => {
  return (
    <Page>
      <div className='container'>
        <div className={cx(s.formContainer, 'row justify-content-center align-items-center')}>
          <div className='col-4'>
            <SignForm isEmailExists={true}/>
          </div>
        </div>
      </div>
    </Page>
  )
};
