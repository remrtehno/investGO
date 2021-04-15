import type {FC} from 'react';
import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import cx from 'classnames'

import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {KebabMenuIcon} from 'src/icons/KebabMenuIcon';

import s from './AccountInfo.scss';

declare namespace AccountInfo {
  export type Props = {
    items: Array<{label: string, value: string}>,
    menuItems: Array<{to: string, label: string}>,
  }
}

export const AccountInfo: FC<AccountInfo.Props> = (props) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function toggleMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  useOnClickOutside(menuRef, () => {
    setIsMenuOpened(false);
  });

  return (
    <div className={s.accountInfo}>
      { props.items.map((item, index) => {
        return (
          <div className={cx(s.item, index === props.items.length - 1 && s.itemLast)} key={index}>
            <span className={s.label}>{ item.label }</span>
            <span className={s.sum}>{ item.value }</span>
          </div>
        );
      }) }

      <div className={s.menuContainer} ref={menuRef}>
        <i className={s.menuIcon} onClick={toggleMenu}>
          <KebabMenuIcon />
        </i>
        <TransitionGroup>
          { isMenuOpened ? (
            <CSSTransition timeout={400} classNames='popup-menu-transition'>
              <div className={s.menu}>
                { props.menuItems.map((item, index) => {
                  return (
                    <Link to={item.to} className={s.menuItem} key={index}>{ item.label }</Link>
                  );
                }) }
              </div>
            </CSSTransition>
          ) : null }
        </TransitionGroup>

      </div>
    </div>
  );
};
