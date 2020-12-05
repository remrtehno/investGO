import React, {FC, useMemo} from "react";
import {Page} from "../../common/Page";
import {ProfileForms} from "./ProfileForms";
import {ProfileHeader} from "./ProfileHeader";
import {ProfileStep} from "./ProfileHeader/ProfileHeader";
import {ProfileNavigation} from "./ProfileNavigation/ProfileNavigation";
import s from './ProfilePage.scss';
import cx from 'classnames';
import {ProfileFormType} from "./profilePageTypes";

export declare namespace ProfilePage {
  export type FormInfo = {
    id: ProfileFormType,
    title: string,
  }
}

export const ProfilePage: FC = () => {
  const step = ProfileStep.profile;

  const forms = useMemo((): ProfilePage.FormInfo[] => {
    return [{
      id: ProfileFormType.profile,
      title: 'Профиль'
    }, {
      id: ProfileFormType.passport,
      title: 'Пасспорт'
    }];
  }, []);

  return (
    <Page>
      <div className={s.profilePage}>
        <ProfileHeader activeStep={step}/>
        <div className={cx(s.content, 'container')}>
          <ProfileNavigation forms={forms} activeForm={ProfileFormType.profile}/>
          <ProfileForms forms={forms}/>
        </div>
      </div>
    </Page>
  )
};
