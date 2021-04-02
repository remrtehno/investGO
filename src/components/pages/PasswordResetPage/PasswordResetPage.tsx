import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import {Page} from 'src/components/common/Page';

import {PasswordResetForm} from './PasswordResetForm';
import s from './PasswordResetPage.scss';

export const PasswordResetPage: FC = () => {
  return (
    <Page isBigLogo={true}>
      <div className='container'>
        <div className={cx(s.formContainer, 'row justify-content-center align-items-center')}>
          <div className='col-xl-4 col-lg-5 col-md-6 col-sm-10 col-xs-12'>
            <PasswordResetForm />
          </div>
        </div>
      </div>
    </Page>
  );
};
