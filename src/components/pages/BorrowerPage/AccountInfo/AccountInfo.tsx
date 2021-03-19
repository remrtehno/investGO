import type {FC} from 'react';
import React, {useRef, useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {KebabMenuIcon} from 'src/icons/KebabMenuIcon';

import s from './AccountInfo.scss';

declare namespace AccountInfo {
  export type Props = {
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
      <div className={s.item}>
        <span className={s.label}>Свободно:</span>
        <span className={s.sum}>0.00 ₽</span>
      </div>
      <div className={s.item}>
        <span className={s.label}>Займы:</span>
        <span className={s.sum}>1 163 000.00 ₽</span>
      </div>
      <div className={s.item}>
        <span className={s.label}>Начислено:</span>
        <span className={s.sum}>0.00 ₽</span>
      </div>
      <div className={s.menuContainer} ref={menuRef}>
        <i className={s.menuIcon} onClick={toggleMenu}>
          <KebabMenuIcon />
        </i>
        <TransitionGroup>
          { isMenuOpened ? (
            <CSSTransition timeout={400} classNames='popup-menu-transition'>
              <div className={s.menu}>
                <a href='#' className={s.menuItem}>Пополнить счет</a>
                <a href='#' className={s.menuItem}>Вывести средства</a>
              </div>
            </CSSTransition>
          ) : null }
        </TransitionGroup>

      </div>
    </div>
  );
};
