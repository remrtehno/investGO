import classNames from 'classnames';
import React from 'react';

import {Text, TextSize} from 'src/components/ui/Text';

import s from './Navigation.scss';

export const Navigation = () => {
  return (
    <nav className={s.Navigation}>
      <div className={classNames('container', s.NavigationContainer)}>
        <Text size={TextSize.tabMenu} className={s.NavigationItem}><a href='#'>Портфель</a></Text>
        <Text size={TextSize.tabMenu} className={s.NavigationItem}><a href='#'>Предложения</a></Text>
        <Text size={TextSize.tabMenu} className={s.NavigationItem}><a href='#'>Транзакции</a></Text>
      </div>
    </nav>
  );
};
