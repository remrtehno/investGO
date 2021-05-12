import cx from 'classnames';
import type {FC} from 'react';
import React, {useCallback, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import {useSignOutApi} from 'src/api/userApi/useSignOutApi';
import {RoutePaths} from 'src/components/common/App/routes';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {Role} from 'src/contstants/Role';
import {useIsRegistrationComplete} from 'src/hooks/useIsRegistrationComplete';
import {LogoIcon} from 'src/icons/LogoIcon';
import {userAtom} from 'src/recoil/userAtom';
import {breackpointDown, breackpointUp} from 'src/utils/breackpointUtils';

import {HeaderMenu} from './HeaderMenu';
import {MobileMenu} from './MobileMenu';
import s from './PageHeader.scss';

declare namespace LogoutIcon {
  export type Props = {
    onClick(): void,
  };
}

export const LogoutIcon: FC<LogoutIcon.Props> = (props) => (
  <svg onClick={props.onClick} className={s.logoutIcon} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M20.8195 17.7516H19.5586C19.4602 17.7516 19.3781 17.8336 19.3781 17.932V19.3805H4.61953V4.61953H19.3805V6.06797C19.3805 6.16641 19.4625 6.24844 19.5609 6.24844H20.8219C20.9203 6.24844 21.0023 6.16875 21.0023 6.06797V3.71953C21.0023 3.32109 20.6813 3 20.2828 3H3.71953C3.32109 3 3 3.32109 3 3.71953V20.2805C3 20.6789 3.32109 21 3.71953 21H20.2805C20.6789 21 21 20.6789 21 20.2805V17.932C21 17.8312 20.918 17.7516 20.8195 17.7516ZM21.2555 11.8523L17.9297 9.22734C17.8055 9.12891 17.625 9.21797 17.625 9.375V11.1562H10.2656C10.1625 11.1562 10.0781 11.2406 10.0781 11.3438V12.6562C10.0781 12.7594 10.1625 12.8438 10.2656 12.8438H17.625V14.625C17.625 14.782 17.8078 14.8711 17.9297 14.7727L21.2555 12.1477C21.2779 12.1301 21.296 12.1077 21.3085 12.0821C21.3209 12.0565 21.3274 12.0285 21.3274 12C21.3274 11.9715 21.3209 11.9435 21.3085 11.9179C21.296 11.8923 21.2779 11.8699 21.2555 11.8523Z' fill='black' />
  </svg>
);

declare namespace PageHeader {
  export type Props = {
    isBigLogo?: boolean,
    className?: string,
  }
}

export const PageHeader: FC<PageHeader.Props> = (props) => {
  const {user} = useRecoilValue(userAtom);
  const [, logoutApi, logoutState] = useSignOutApi();
  const history = useHistory();
  const isRegistrationComplete = useIsRegistrationComplete();

  const logout = useCallback(() => {
    logoutApi();
  }, []);

  function getHomePath() {
    if (isRegistrationComplete) {
      if (user?.roles.includes(Role.borrower)) {
        return RoutePaths.borrowerDashboard;
      }
      return RoutePaths.investorDashboard;
    }
    return RoutePaths.home;
  }

  return (
    <div className={cx(s.pageHeader, props.className)}>
      <div className={cx('container', s.container)}>
        <Link to={getHomePath()}>
          <LogoIcon isBig={props.isBigLogo} className={s.logo} />
        </Link>
        <div className={s.space} />
        { user && isRegistrationComplete && breackpointUp(adaptiveBreackpoints.md) ? (
          <HeaderMenu user={user} />
        ) : null }
        { user && breackpointUp(adaptiveBreackpoints.md) ? (
          <div className={s.userContainer}>
            <Link to={RoutePaths.profile} className={s.link}>
              <Text size={TextSize.tabMenu} weight={TextWeight.bold}>{ user.email }</Text>
            </Link>
            <LogoutIcon onClick={logout} />
          </div>
        ) : null }
        { user && breackpointDown(adaptiveBreackpoints.md) ? (
          <MobileMenu user={user} logout={logout} />
        ) : null }
      </div>
    </div>
  );
};
