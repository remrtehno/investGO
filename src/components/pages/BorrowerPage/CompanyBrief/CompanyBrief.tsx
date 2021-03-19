import type {FC} from 'react';
import React, {useRef, useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {KebabMenuIcon} from 'src/icons/KebabMenuIcon';
import type {User} from 'src/types/User';

import s from './CompanyBrief.scss';

declare namespace CompanyBrief {
  export type Props = {
    company: User.Company
  }
}

export const CompanyBrief: FC<CompanyBrief.Props> = (props) => {
  return (
    <div className={s.companyBrief}>
      <div className={s.logo}>
        <i className={s.img} />
      </div>
      <div className={s.name}>{ props?.company.name }</div>
      <Button
        className={s.button1}
        size={ButtonSize.s}
        theme={ButtonTheme.black}>
        Редактировать
      </Button>
      <Button
        className={s.button2}
        size={ButtonSize.s}
        theme={ButtonTheme.red}
      >
        Привлечь инвестиции
      </Button>
    </div>
  );
};
