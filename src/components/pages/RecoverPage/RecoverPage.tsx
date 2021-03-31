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
          <div className='col-xl-4 col-lg-5 col-md-6 col-sm-10 col-xs-12'>
            <RecoverForm />
          </div>
        </div>
      </div>
    </Page>
  )
}