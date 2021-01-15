import cx from 'classnames';
import _ from 'lodash';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useSelectRolesApi} from 'src/api/userApi/useSelectRolesApi';
import {FormActions} from 'src/components/common/Form/FormActions';
import {Page} from 'src/components/common/Page';
import {withAuth} from 'src/components/hocs/withAuth';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {Role} from 'src/contstants/Role';
import {useClaims} from 'src/hooks/useClaim';
import {userAtom} from 'src/recoil/userAtom';

import {ProfileStep} from './ProfileHeader/ProfileHeader';
import {ProfileNavigation} from './ProfileNavigation/ProfileNavigation';

import {ProfileForms} from './ProfileForms';
import {ProfileHeader} from './ProfileHeader';
import s from './ProfilePage.scss';
import {ProfileFormType} from './profilePageTypes';
import {SelectRolesModal} from './SelectRolesModal';

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
  const [isSelectRolesModalOpened, setSelectRolesModalOpened] = useState(false);
  const [mainRole, setMainRole] = useState<Role>(Role.fl);
  const [roles, setRoles] = useState<Role[]>([]);
  const {user} = useRecoilValue(userAtom);
  const [, selectRolesApi, selectRolesStatus] = useSelectRolesApi();

  const onContinueAs = useCallback((mainRole: Role, roles: Role[]) => {
    setMainRole(mainRole);
    setRoles(roles);
    setSelectRolesModalOpened(true);
  }, []);

  useEffect(() => {
    if (selectRolesStatus.isSuccess) {
      setSelectRolesModalOpened(false);
    }
  }, [selectRolesStatus.isSuccess]);

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
  ]), [user]);

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
            <div className='col-8'>
              <ProfileForms
                onChangeCurrentForm={setCurrentForm}
                currentForm={currentForm}
                forms={forms}
              />
              { user && user.passport && user.passport.status === 'approved' && user.roles.length < 2 ? (
                <FormActions>
                  <div className='col-4'>
                    <Button
                      theme={ButtonTheme.black}
                      size={ButtonSize.m}
                      onClick={() => onContinueAs(Role.fl, [Role.investor])}
                    >Продолжить как физ.&nbsp;лицо</Button>
                  </div>
                  <div className='col-4'>
                    <Button
                      theme={ButtonTheme.black}
                      size={ButtonSize.m}
                      onClick={() => onContinueAs(Role.ip, [Role.investor, Role.borrower])}
                    >Продолжить как ИП</Button>
                  </div>
                  <div className='col-4'>
                    <Button
                      theme={ButtonTheme.black}
                      size={ButtonSize.m}
                      onClick={() => onContinueAs(Role.ur, [Role.investor, Role.borrower])}
                    >Продолжить как юр.&nbsp;лицо</Button>
                  </div>
                  { isSelectRolesModalOpened ? (
                    <SelectRolesModal
                      onApply={() => {
                        selectRolesApi({mainRole, roles});
                      }}
                      onClose={() => setSelectRolesModalOpened(false)}
                      mainRole={mainRole}
                      roles={roles}
                    />
                  ) : null }
                </FormActions>
              ) : null }
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
});
