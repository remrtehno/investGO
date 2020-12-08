import cx from 'classnames';
import React, {FC, useMemo, useState} from "react";
import {Page} from "../../common/Page";
import {ProfileForms} from "./ProfileForms";
import {ProfileHeader} from "./ProfileHeader";
import {ProfileStep} from "./ProfileHeader/ProfileHeader";
import {ProfileNavigation} from "./ProfileNavigation/ProfileNavigation";
import s from './ProfilePage.scss';
import {ProfileFormType} from "./profilePageTypes";

export declare namespace ProfilePage {
  export type FormInfo = {
    id: ProfileFormType,
    title: string,
  }
}

export const ProfilePage: FC = () => {
  const step = ProfileStep.profile;
  const [currentForm, setCurrentForm] = useState(ProfileFormType.profile);

  const forms = useMemo((): ProfilePage.FormInfo[] => {
    return [{
      id: ProfileFormType.profile,
      title: 'Профиль'
    }, {
      id: ProfileFormType.passport,
      title: 'Паспорт'
    }, {
      id: ProfileFormType.individualEntrepreneur,
      title: 'ИП'
    }, {
      id: ProfileFormType.requisitions,
      title: 'Реквизиты'
    }];
  }, []);

  return (
    <Page>
      <div className={s.profilePage}>
        <ProfileHeader activeStep={step}/>
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
  )
};
