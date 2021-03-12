import React, {FC} from "react";
import {Page} from "../../common/Page";
import cx from 'classnames';
import {RecoverForm} from "./RecoverForm"
import s from "./RecoverPage.scss"

export const RecoverPage: FC = () => {
  return (
    <Page isBigLogo={true} className={s.page}>
      <div className='container'>
        <div className={cx(s.formContainer, 'row justify-content-center align-items-center')}>
          <div className='col-4'>
            <RecoverForm />
          </div>
        </div>
      </div>
    </Page>
  )
}