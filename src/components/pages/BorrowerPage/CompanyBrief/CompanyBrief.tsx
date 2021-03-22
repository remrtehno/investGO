import type {FC} from 'react';
import React from 'react';

import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
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
