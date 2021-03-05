import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import {Page} from 'src/components/common/Page';
import {userAtom} from 'src/recoil/userAtom';

import {SignForm} from './SignForm';
import s from './SignPage.scss';

export const SignPage: FC = () => {
  const {user} = useRecoilValue(userAtom);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/profile');
    }
  }, [user]);

  return (
    <Page isBigLogo={true}>
      <div className='container'>
        <div className={cx(s.formContainer, 'row justify-content-center align-items-center')}>
          <div className='col-4'>
            <SignForm />
          </div>
        </div>
      </div>
    </Page>
  );
};
