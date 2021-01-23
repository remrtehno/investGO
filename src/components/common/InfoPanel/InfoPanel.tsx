import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import {TimeIcon} from 'src/components/pages/ProfilePage/ProfileForms/forms/PassportForm/TimeIcon';
import {Text, TextSize} from 'src/components/ui/Text';

import s from './InfoPanel.scss';

export enum InfoPanelTheme {
  waiting = 'waiting',
  success = 'success',
}

export declare namespace InfoPanel {
  export type Props = {
    theme: InfoPanelTheme
  };
}

export const InfoPanel: FC<InfoPanel.Props> = (props) => {
  function renderIcon() {
    switch (props.theme) {
    case InfoPanelTheme.waiting:
      return <TimeIcon className={s.icon} />;
    default:
      return null;
    }
  }

  return (
    <div className={cx(s.InfoPanel, s[props.theme])}>
      { renderIcon() }
      <Text size={TextSize.body2}>{ props.children }</Text>
    </div>
  );
};
