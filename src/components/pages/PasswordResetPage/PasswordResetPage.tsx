import React, {FC} from "react";
import {Page} from "../../common/Page";
import cx from 'classnames';
import s from "./PasswordResetPage.scss"
import { PasswordResetForm } from "./PasswordResetForm";

export const PasswordResetPage: FC = () => {
  return (
    <Page>
      <div className='container'>
        <div className={cx(s.formContainer, 'row justify-content-center align-items-center')}>
          <div className='col-4'>
            <PasswordResetForm />
          </div>
        </div>
      </div>
    </Page>
  )
}