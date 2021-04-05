import cx from 'classnames';
import type {FC} from 'react';
import React, {useMemo, useState} from 'react';
import type {RouteComponentProps} from 'react-router-dom';
import {Link, withRouter} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {RoutePaths} from 'src/components/common/App/routes';
import {LogoutIcon} from 'src/components/common/Page/PageHeader/PageHeader';
import {Text, TextSize} from 'src/components/ui/Text';
import {BurgerIcon} from 'src/icons/BurgerIcon';
import {CloseIconLarge} from 'src/icons/CloseIconLarge';
import {LogoIcon} from 'src/icons/LogoIcon';
import type {User} from 'src/types/User';

import s from './MobileMenu.scss';

declare namespace MobileMenu {
  export type Props = RouteComponentProps & {
    user: User,
    logout(): void
  }
}

const Menu: FC<MobileMenu.Props> = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  function toggle() {
    setIsOpened(!isOpened);
  }

  const isBorrowerRoute = useMemo(() => {
    return props.location.pathname.indexOf('/borrower') === 0;
  }, [props.location]);

  const isInvestorRoute = useMemo(() => {
    return props.location.pathname.indexOf('/investor') === 0;
  }, [props.location]);

  return (
    <div className={s.mobileMenuContainer}>
      <div className={s.burgerButton} onClick={toggle}>
        <BurgerIcon />
      </div>
      <TransitionGroup>
        { isOpened ? (
          <CSSTransition timeout={400} classNames='popup-menu-transition'>
            <div className={cx(s.mobileMenu, 'container')}>
              <div className={s.top}>
                <LogoIcon isBig={false} className={s.logo} />
                <div className={s.space} />
                <div className={s.close} onClick={toggle}><CloseIconLarge /></div>
              </div>
              <div className={s.middle}>
                <div className={s.user}>
                  <div className={s.avatar}>AB</div>
                  <Text size={TextSize.body0}>
                    { props.user.email }
                  </Text>
                </div>
                <div className={s.items}>
                  <Link to={RoutePaths.investorDashboard} className={cx(s.item, isInvestorRoute && s.active)}>
                    Инвестор
                  </Link>
                  <Link to={RoutePaths.borrowerDashboard} className={cx(s.item, isBorrowerRoute && s.active)}>
                    Заемщик
                  </Link>
                </div>
                <div className={s.notifications}>
                  <Text size={TextSize.body0} className={s.notificationsLabel}>Уведомления</Text>
                  <i className={s.notificationsCount}>5</i>
                </div>
              </div>
              <div className={s.bottom}>
                <LogoutIcon onClick={props.logout} />
                <Text onClick={props.logout} size={TextSize.body0} className={s.logoutLabel}>
                  Выход
                </Text>
              </div>
            </div>
          </CSSTransition>
        ) : null }
      </TransitionGroup>
    </div>
  );
};

export const MobileMenu = withRouter(Menu);
