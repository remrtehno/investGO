import cx from 'classnames';
import _ from 'lodash';
import React, {useMemo, useState} from 'react';

import {Page} from 'src/components/common/Page';
import {withAuth} from 'src/components/hocs/withAuth';
import {useClaims} from 'src/hooks/useClaim';

import {ProfileStep} from './ProfileHeader/ProfileHeader';
import {ProfileNavigation} from './ProfileNavigation/ProfileNavigation';

import {ProfileForms} from './ProfileForms';
import {ProfileHeader} from './ProfileHeader';
import s from './ProfilePage.scss';
import {ProfileFormType} from './profilePageTypes';

export declare namespace ProfilePage {
  export type FormInfo = {
    id: ProfileFormType,
    title: string,
  }
}

export const ProfilePage = withAuth(() => {
  const step = ProfileStep.profile;
  const [currentForm, setCurrentForm] = useState(ProfileFormType.profile);
  const claims = useClaims();

  const forms = useMemo((): ProfilePage.FormInfo[] => _.compact([
    {
      id: ProfileFormType.profile,
      title: 'Профиль',
    },
    {
      id: ProfileFormType.passport,
      title: 'Паспорт',
    },
    claims.individualEntrepreneurForm.read() ? {
      id: ProfileFormType.individualEntrepreneur,
      title: 'ИП',
    } : null,
    claims.requisitionsForm.read() ? {
      id: ProfileFormType.requisitions,
      title: 'Реквизиты',
    } : null,
  ]), []);

  return (
    <Page>
      <div className={s.profilePage}>
        <ProfileHeader activeStep={step} />
        <div className={cx(s.content, 'container')}>
          <div className='row'>
            <ProfileNavigation
              className='col-2'
              forms={forms}
              currentForm={currentForm}
              onChangeCurrentForm={setCurrentForm}
            />
            <ProfileForms
              onChangeCurrentForm={setCurrentForm}
              currentForm={currentForm}
              className='col-8'
              forms={forms}
            />
          </div>
        </div>
      </div>
    </Page>
  );
});
