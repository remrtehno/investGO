
import cx from 'classnames';
import type {FC} from 'react';
import React, {Fragment} from 'react';
import {useRecoilValue} from 'recoil';

import {Table} from 'src/components/common/Table';
import {Text, TextSize} from 'src/components/ui/Text';
import {Role} from 'src/contstants/Role';
import {userAtom} from 'src/recoil/userAtom';
import type {Borrower} from 'src/types/Borrower';
import {formatDate} from 'src/utils/formatDate';

import s from './LoanDetails.scss';

export declare namespace LoanBorrowerInfo {
  export type Props = {
    loan: Borrower.LoanDetails
  };
}

const okvedMockup = [
  {cod: '56.1', name: 'Деятельность ресторанов и услуги по доставке продуктов питания'},
  {cod: '56.2', name: 'sflkdjflsjfslijdfljsdf fsldkfjsd'},
  {cod: '56', name: 'Деятельность по предоставлению продуктов питания и напитков'},
];

const foundersMockup = [
  {name: 'Dfkjfdij ijfdf', percent: 20},
  {name: 'Hdfkjf sdfd ijfdf', percent: 20},
];

export const LoanBorrowerInfo: FC<LoanBorrowerInfo.Props> = (props) => {
  const {loan} = props;
  const {user} = useRecoilValue(userAtom);

  return (
    <Fragment>
      <div className={s.title}>
        { user?.roles.includes(Role.ur) ? (
          'Данные юридического лица'
        ) : null }
        { user?.roles.includes(Role.ip) ? (
          '   Данные индивидуального предпринимателя'
        ) : null }
      </div>
      <Table dense={true} className={s.borrowerSection} border={false}>
        <tbody>
          <tr>
            <td style={{width: '29%'}}>Наименование:</td>
            <td><b>{ loan.borrower.name }</b></td>
          </tr>
          <tr>
            <td style={{width: '29%'}}>ИНН:</td>
            <td>{ loan.borrower.inn }</td>
          </tr>
          <tr>
            <td style={{width: '29%'}}>ОРГН / Дата присвоения:</td>
            <td>
              { loan.borrower.ogrn } &nbsp;/&nbsp;&nbsp;
              { loan.borrower.date_issue_ogrn ? (
                formatDate(new Date(loan.borrower.date_issue_ogrn))
              ) : null }
            </td>
          </tr>
        </tbody>
      </Table>
      { (loan.founders && loan.founders.length) ? (
        <Fragment>
          <div className={s.title}>Учредители и доли владения (%)</div>
          <Table className={s.borrowerSection}>
            <tbody>
              { loan.founders.map((founder, index) => {
                return (
                  <tr key={index}>
                    <td
                      className={cx(index === loan.founders.length - 1 && '.border-bottom-0')}
                    >
                      { founder.name }
                    </td>
                    <td
                      className={cx('text-end', index === loan.founders.length - 1 && '.border-bottom-0')}
                    >
                      { founder.percent }%
                    </td>
                  </tr>
                );
              }) }
            </tbody>
          </Table>
        </Fragment>
      ) : null }
      { loan.borrower.okved ? (
        <Fragment>
          <div className={s.title}>Деятельность</div>
          <Table className={s.borrowerSection} border={false} dense={true}>
            <tbody>
              { loan.borrower.okved.map((okved, index) => {
                return (
                  <tr key={index}>
                    <td>{ okved.cod }</td>
                    <td>{ okved.name }</td>
                  </tr>
                );
              }) }
            </tbody>
          </Table>
        </Fragment>
      ) : null }
    </Fragment>
  );
};
