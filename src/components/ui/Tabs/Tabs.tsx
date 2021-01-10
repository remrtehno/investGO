import classNames from 'classnames';
import type {FC} from 'react';
import React from 'react';

import s from './Tabs.scss';

export type Tab = {
  id: string,
  label: string,
  className?: string | null,
};

export type TabProps = {
  tabs: Tab[],
  viewType?: string,
  activeTab: string,
  onChange(tab: string): void,

};

const Tabs: FC<TabProps> = (props) => {
  const {
    viewType = 'newproject',
  } = props;

  return (
    <div className={classNames(s.Tabs, viewType)}>
      { props.tabs.map((tab) => {
        return (
          <div
            className={classNames(
              s.TabsItem,
              tab.id === props.activeTab ? s.TabsItemActive : '',
              tab.className
            )}
            key={tab.id}
            onClick={() => props.onChange(tab.id)}
          >{ tab.label }</div>
        );
      }) }
    </div>
  );
};

export default Tabs;
