import cx from 'classnames';
import type {CSSProperties, FC} from 'react';
import React from 'react';

import {TimeIcon} from 'src/components/pages/ProfilePage/ProfileForms/forms/PassportForm/TimeIcon';
import {Text, TextSize} from 'src/components/ui/Text';
import type {SvgProps} from 'src/types/common';

import s from './InfoPanel.scss';

export enum InfoPanelTheme {
  waiting = 'waiting',
  success = 'success',
  error = 'error',
}

export declare namespace InfoPanel {
  export type Props = {
    theme: InfoPanelTheme,
    isBorderless: boolean,

    className?: string
    style?: CSSProperties
  };
}

export const InfoPanel: FC<InfoPanel.Props> = (props) => {
  function renderIcon() {
    switch (props.theme) {
    case InfoPanelTheme.waiting:
      return <TimeIcon className={s.icon}/>;

    case InfoPanelTheme.error:
      return <ErrorIcon className={s.icon}/>;
    default:
      return null;
    }
  }

  return (
    <div className={cx(
      s.InfoPanel,
      s[props.theme],
      {[s.borderless]: props.isBorderless},
      props.className
    )} style={props.style}>
      {renderIcon()}
      <Text size={TextSize.body1}>{props.children}</Text>
    </div>
  );
};


function ErrorIcon(props: SvgProps) {
  return (
    <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0)'>
        <path fillRule='evenodd' clipRule='evenodd'
              d='M12.4994 2C6.97937 2 2.49937 6.48 2.49937 12C2.49937 17.52 6.97938 22 12.4994 22C18.0194 22 22.4994 17.52 22.4994 12C22.4994 6.48 18.0194 2 12.4994 2ZM12.5228 10.8914L8.57684 6.9454L7.44547 8.07677L11.3915 12.0228L7.4453 15.969L8.57667 17.1003L12.5228 13.1541L16.4691 17.1004L17.6005 15.969L13.6542 12.0228L17.6003 8.07668L16.4689 6.94531L12.5228 10.8914Z'
              fill='#FF3B30'/>
      </g>
      <defs>
        <clipPath id='clip0'>
          <rect width='24' height='24' fill='white' transform='translate(0.5)'/>
        </clipPath>
      </defs>
    </svg>
  );
}
