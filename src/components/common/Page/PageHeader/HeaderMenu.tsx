import type {FC} from 'react';
import React, {useMemo, useRef, useState} from 'react';
import type {RouteComponentProps} from 'react-router-dom';
import {Link, withRouter} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {RoutePaths} from 'src/components/common/App/routes';
import {Role} from 'src/contstants/Role';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {DropDownIcon} from 'src/icons/DropDownIcon';
import type {User} from 'src/types/User';

import s from './PageHeader.scss';

declare namespace HeaderMenu {
  export type Props = RouteComponentProps & {
    user: User
  }
}

const Menu: FC<HeaderMenu.Props> = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const hasInvestorRole = useMemo(() => {
    return props.user.roles.includes(Role.investor);
  }, [props.user]);

  const hasBorrowerRole = useMemo(() => {
    return props.user.roles.includes(Role.borrower);
  }, [props.user]);

  const hasBothRoles = hasBorrowerRole && hasInvestorRole;

  const isBorrowerRoute = useMemo(() => {
    return props.location.pathname.indexOf('/borrower') === 0;
  }, [props.location]);

  const isInvestorRoute = useMemo(() => {
    return props.location.pathname.indexOf('/investor') === 0;
  }, [props.location]);

  function toggle() {
    setIsOpened(!isOpened);
  }

  useOnClickOutside(menuRef, () => {
    setIsOpened(false);
  });

  return (
    <div className={s.menuContainer} ref={menuRef}>
      <span className={s.menuTrigger} onClick={toggle}>
        { (!isBorrowerRoute && !isInvestorRoute) && hasBorrowerRole ? (
          <Link to={RoutePaths.borrowerDashboard}>Заемщику</Link>
        ) : null }
        { (!isBorrowerRoute && !isInvestorRoute) && (!hasBothRoles && hasInvestorRole) ? (
          <Link to={RoutePaths.investorDashboard}>Инвестору</Link>
        ) : null }
        { hasBothRoles && isBorrowerRoute ? (
          <span>Заемщику</span>
        ) : null }
        { hasBothRoles && isInvestorRoute ? (
          <span>Инвестору</span>
        ) : null }
        { hasBothRoles ? (
          <DropDownIcon />
        ) : null }
      </span>
      { hasBothRoles ? (
        <TransitionGroup>
          { isOpened ? (
            <CSSTransition timeout={400} classNames='popup-menu-transition'>
              <div className={s.menu}>
                { isBorrowerRoute || (!isBorrowerRoute && !isInvestorRoute) ? (
                  <Link to={RoutePaths.investorDashboard}>Инвестору</Link>
                ) : null }
                { isInvestorRoute ? (
                  <Link to={RoutePaths.borrowerDashboard}>Заемщику</Link>
                ) : null }
              </div>
            </CSSTransition>
          ) : null }
        </TransitionGroup>
      ) : null }
    </div>
  );
};

export const HeaderMenu = withRouter(Menu);
