import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect, useState} from 'react';
import {useQueryParam} from 'use-query-params';

import {useConfirmEmailApi} from 'src/api/common/useConfirmEmailApi';
import {InfoPanel} from 'src/components/common/InfoPanel';
import {InfoPanelTheme} from 'src/components/common/InfoPanel/InfoPanel';
import {Page} from 'src/components/common/Page';

import s from './EmailConfirmationPage.scss';

export declare namespace EmailConfirmationPage {
  export type Props = {};
}

export const EmailConfirmationPage: FC<EmailConfirmationPage.Props> = () => {
  const [token] = useQueryParam<string>('token');
  const [, confirmEmailApi, confirmEmailState] = useConfirmEmailApi();
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  useEffect(() => {
    confirmEmailApi({token});
  }, [token]);

  useEffect(() => {
    if (confirmEmailState.isSuccess) {
      setIsEmailConfirmed(true);
    }
  }, [confirmEmailState.isSuccess]);

  return (
    <Page>
      <div className={cx(s.EmailConfirmationPage, 'container')}>
        <div className={'row'}>
          <div className={'col-12'}>
            { isEmailConfirmed || true ? (
              <InfoPanel theme={InfoPanelTheme.success}>
                Почта успешно подтверждена
              </InfoPanel>
            ) : null }
          </div>
        </div>
      </div>
    </Page>
  );
};
