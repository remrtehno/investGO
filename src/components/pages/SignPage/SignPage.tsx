import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {Role} from 'src/contstants/Role';
import {useIsRegistrationComplete} from 'src/hooks/useIsRegistrationComplete';
import {documentsAtom} from 'src/recoil/documentsAtom';
import {userAtom} from 'src/recoil/userAtom';

import {SignForm} from './SignForm';
import s from './SignPage.scss';

export const SignPage: FC = () => {
  const {user} = useRecoilValue(userAtom);
  const {documents} = useRecoilValue(documentsAtom);
  const history = useHistory();
  const isRegistrationComplete = useIsRegistrationComplete();

  useEffect(() => {
    if (user && !isRegistrationComplete) {
      history.push(RoutePaths.profile);
    }
    if (user && isRegistrationComplete) {
      if (user.roles.includes(Role.borrower)) {
        history.push(RoutePaths.borrowerDashboard);
      } else {
        history.push(RoutePaths.investorDashboard);
      }
    }
  }, [documents]);


  return (
    <Page isBigLogo={true} classNameHeader={s.pageHeader} className={s.page}>
      <div className='container'>
        <div className={cx(s.formContainer, 'row justify-content-center align-items-center')}>
          <div className='col-xl-4 col-lg-5 col-md-6 col-sm-10 col-xs-12'>
            <SignForm />
          </div>
        </div>
      </div>
    </Page>
  );
};
