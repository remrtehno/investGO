import type {FC} from 'react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {RoutePaths} from 'src/components/common/App/routes';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import { projectAtom } from 'src/recoil/projectAtom';
import type {User} from 'src/types/User';

import s from './CompanyBrief.scss';

declare namespace CompanyBrief {
  export type Props = {
    company: User.Company
  }
}

export const CompanyBrief: FC<CompanyBrief.Props> = (props) => {
  const {project} = useRecoilValue(projectAtom);

  const history = useHistory();
  return (
    <div className={s.companyBrief}>
      { projectAtom && project?.logo ? (
        <div className={s.logo} >
          <div className={s.img} style={{backgroundImage: `url(${project.logo.url})`}} />
        </div>
      ) : null }
      <div className={s.name}>{ props?.company.name }</div>
      <Button
        className={s.button1}
        size={ButtonSize.s}
        theme={ButtonTheme.black}
        onClick={() => {
          history.push(RoutePaths.companyEdit(props.company.id as string));
        }}
      >
        Редактировать
      </Button>
      <Button
        className={s.button2}
        size={ButtonSize.s}
        theme={ButtonTheme.red}
        onClick={() => {
          history.push(RoutePaths.createLoanRequest(props.company.id as string));
        }}
      >
        Привлечь инвестиции
      </Button>
    </div>
  );
};
