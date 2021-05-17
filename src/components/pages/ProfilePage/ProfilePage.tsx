import cx from 'classnames';
import _ from 'lodash';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useSelectRolesApi} from 'src/api/userApi/useSelectRolesApi';
import {FormActions} from 'src/components/common/Form/FormActions';
import {Page} from 'src/components/common/Page';
import {withAuth} from 'src/components/hocs/withAuth';
import {AcceptRules} from 'src/components/pages/ProfilePage/AcceptRules';
import {AcceptRulesStep} from 'src/components/pages/ProfilePage/AcceptRulesStep';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {ModerationStatus} from 'src/contstants/ModerationStatus';
import {Role} from 'src/contstants/Role';
import {useClaims} from 'src/hooks/useClaim';
import {useIsRegistrationComplete} from 'src/hooks/useIsRegistrationComplete';
import {ProfileSteps, uiAtom} from 'src/recoil/uiAtom';
import {userAtom} from 'src/recoil/userAtom';

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
    longTitle?: string,
  }
}

export const ProfilePage = withAuth(() => {
  const {user} = useRecoilValue(userAtom);
  const {profileStep} = useRecoilValue(uiAtom);
  const [currentForm, setCurrentForm] = useState(ProfileFormType.profile);
  const claims = useClaims();
  const [isSelectRolesModalOpened, setSelectRolesModalOpened] = useState(false);
  const [mainRole, setMainRole] = useState<Role>(Role.fl);
  const [roles, setRoles] = useState<Role[]>([]);
  const [, selectRolesApi, selectRolesStatus] = useSelectRolesApi();
  const isRegistrationComplete = useIsRegistrationComplete();

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

  function handleSelectRolesApply(selectedRoles: []) {
    selectRolesApi({mainRole, roles: selectedRoles});
  }

  const hasAcceptRules = useMemo(() => {
    let returnValue = false;

    if (user?.company
      && user?.company.status === ModerationStatus.approved
      && user?.roles.includes(Role.ip)
      && !isRegistrationComplete
    ) {
      returnValue = true;
    }

    if (returnValue
      && user?.roles.includes(Role.borrower)
      && !user?.company?.bank_details
    ) {
      returnValue = false;
    }

    return returnValue;
  }, [user]);

  const forms = useMemo((): ProfilePage.FormInfo[] => _.compact([
    {
      id: ProfileFormType.profile,
      title: 'Профиль',
    },
    {
      id: ProfileFormType.passport,
      title: 'Личные данные',
    },
    claims.ipForm.read() ? {
      id: ProfileFormType.ip,
      title: 'Данные ИП',
      longTitle: 'Данные индивидуального предпринимателя',
    } : null,
    claims.urForm.read() ? {
      id: ProfileFormType.ur,
      title: 'Юридическое лицо',
      longTitle: 'Данные юридического лица',
    } : null,
    claims.signDocuments.read() ? {
      id: ProfileFormType.signDocuments,
      title: 'Договоры присоединения',
    } : null,
    claims.bankDetailsForm.read() ? {
      id: ProfileFormType.bankDetails,
      title: 'Реквизиты',
    } : null,
    user?.roles.includes(Role.fl) ? {
      id: ProfileFormType.fl,
      title: 'Данные физ. лица',
    } : null,
  ]), [user]);


  return (
    <Page>
      <div className={s.profilePage}>
        <ProfileHeader activeStep={profileStep} />
        <div className={cx(s.content, 'container')}>
          { profileStep === ProfileSteps.profile ? (
            <div className='row'>
              <ProfileNavigation
                className='col-md-2'
                forms={forms}
                currentForm={currentForm}
                onChangeCurrentForm={setCurrentForm}
              />
              <div className='col-sm-12 col-md-8'>
                <ProfileForms
                  onChangeCurrentForm={setCurrentForm}
                  currentForm={currentForm}
                  forms={forms}
                />
                { user && user.passport && user.passport.status === 'approved' && user.roles.length < 2 ? (
                  <FormActions>
                    <div className='col-12 col-md-4'>
                      <Button
                        className={s.continueAsButtons}
                        theme={ButtonTheme.black}
                        size={ButtonSize.m}
                        onClick={() => onContinueAs(Role.fl, [Role.investor])}
                      >Продолжить как физ.&nbsp;лицо</Button>
                    </div>
                    <div className='col-12 col-md-4'>
                      <Button
                        className={s.continueAsButtons}
                        theme={ButtonTheme.black}
                        size={ButtonSize.m}
                        onClick={() => onContinueAs(Role.ip, [Role.investor, Role.borrower])}
                      >Продолжить как ИП</Button>
                    </div>
                    <div className='col-12 col-md-4'>
                      <Button
                        className={s.continueAsButtons}
                        theme={ButtonTheme.black}
                        size={ButtonSize.m}
                        onClick={() => onContinueAs(Role.ur, [Role.investor, Role.borrower])}
                      >Продолжить как юр.&nbsp;лицо</Button>
                    </div>
                    { isSelectRolesModalOpened ? (
                      <SelectRolesModal
                        onApply={handleSelectRolesApply}
                        onClose={() => setSelectRolesModalOpened(false)}
                        mainRole={mainRole}
                        roles={roles}
                      />
                    ) : null }
                  </FormActions>
                ) : null }
                { hasAcceptRules ? (
                  <AcceptRules />
                ) : null }
              </div>
            </div>
          ) : null }
          { profileStep === ProfileSteps.rules ? (
            <AcceptRulesStep />
          ) : null }
        </div>
      </div>
    </Page>
  );
});
