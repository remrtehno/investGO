import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect} from 'react';
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

  useEffect(() => {
    confirmEmailApi({token});
  }, [token]);

  return (
    <Page>
      <div className={cx(s.EmailConfirmationPage, 'container')}>
        <div className={'row'}>
          <div className={'col-12'}>
            { confirmEmailState.isSuccess ? (
              <InfoPanel
                style={{ marginBottom: 96 }}
                theme={InfoPanelTheme.success}
                isBorderless={false}
              >
                Почта успешно подтверждена. Пожалуйста, заполните свой <a href={'/profile'}>профиль</a>
              </InfoPanel>
            ) : null }
            { confirmEmailState.isFailed ? (
              <InfoPanel
                theme={InfoPanelTheme.error}
                isBorderless={false}
              >
                Почта уже подтверждена.
              </InfoPanel>
            ) : null }
          </div>
        </div>
      </div>
    </Page>
  );
};
