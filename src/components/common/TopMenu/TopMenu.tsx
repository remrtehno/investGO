import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';
import {NavLink} from 'react-router-dom';

import type {RoutePaths} from 'src/components/common/App/routes';

import s from './TopMenu.scss';

declare namespace TopMenu {
  export type Props = {
    items: Item[]
  }

  type Item = {
    to: RoutePaths,
    text: string
  }
}

export const TopMenu: FC<TopMenu.Props> = (props) => {
  return (
    <div className={s.topMenu}>
      <div className={cx(s.container, 'container')}>
        <ul className={s.menu}>
          { props.items.map((item, i) => {
            return (
              <li className={s.item} key={i}>
                <NavLink
                  activeClassName={s.active}
                  exact={true}
                  to={item.to}
                >
                  { item?.text }
                </NavLink>
              </li>
            );
          }) }
        </ul>
      </div>
    </div>
  );
};
