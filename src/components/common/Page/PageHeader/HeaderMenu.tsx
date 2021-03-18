import cx from 'classnames';
import type {FC} from 'react';
import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

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
    <div className={cx(s.menuContainer, 'global')}>
      <span className={s.menuTrigger} onClick={toggle}>
        Заемщику
        <DropDownIcon />
      </span>
      <TransitionGroup>
        { isOpened
          && <CSSTransition timeout={400} classNames='header-menu-transition'>
            <div className={s.menu} ref={menuRef}>
              <Link to='ttt'>Инвестору</Link>
            </div>
          </CSSTransition>
        }
      </TransitionGroup>
    </div>
  );
};
