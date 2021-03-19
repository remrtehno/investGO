import type {FC} from 'react';
import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {RoutePaths} from 'src/components/common/App/routes';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {DropDownIcon} from 'src/icons/DropDownIcon';

import s from './PageHeader.scss';

declare namespace HeaderMenu {
  export type Props = {
  }
}

export const HeaderMenu: FC<HeaderMenu.Props> = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function toggle() {
    setIsOpened(!isOpened);
  }

  useOnClickOutside(menuRef, () => {
    setIsOpened(false);
  });

  return (
    <div className={s.menuContainer} ref={menuRef}>
      <span className={s.menuTrigger} onClick={toggle}>
        Заемщику
        <DropDownIcon />
      </span>
      <TransitionGroup>
        { isOpened ? (
          <CSSTransition timeout={400} classNames='popup-menu-transition'>
            <div className={s.menu}>
              <Link to={RoutePaths.investorDashboard}>Инвестору</Link>
            </div>
          </CSSTransition>
        ) : null }
      </TransitionGroup>
    </div>
  );
};
