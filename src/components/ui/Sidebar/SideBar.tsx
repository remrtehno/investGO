import type {FC} from 'react';
import React from 'react';

import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {Color} from 'src/types/Color';

import s from './SideBar.scss';


declare namespace SideBar {
  export type Submenu = {
    label: string,
    hash?: string,
  }
  export type Menu = {
    heading: string,
    hash: string,
    items?: Submenu
  }
  export type Props = {
    menuItems: Menu[],
  }
}

function Submenu(props: {items: SideBar.Submenu[] }) {
  return (
    <ul className={s.sideBarUl}>
      {
        props.items && props.items.map(({label, hash}, index) => (
          <li key={index}>
            <Text
              color={Color.label}
              size={TextSize.tabMenu}
              className={s.sideBarLinks}>
              <a href={hash}>{ label }</a>
            </Text>
          </li>
        ))
      }
    </ul>
  );
}


export const SideBar:FC<SideBar.Props> = ({menuItems}) => {
  return (
    <div>
      {
        menuItems && menuItems.map(({heading, hash, items}, index) => {
          return (
            <React.Fragment key={index}>
              <Text
                size={TextSize.tabMenu}
                className={s.sideBarHeading}
                weight={TextWeight.semibold}
              >
                <a href={hash}>{ heading }</a>
              </Text>
              { items && <Submenu items={items} /> }
            </React.Fragment>);
        })
      }
    </div>
  );
};
