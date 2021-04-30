import cx from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {Table} from 'src/components/common/Table';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {DropDownIcon} from 'src/icons/DropDownIcon';
import {StatusCheckIcon} from 'src/icons/StatusCheckIcon';
import {StatusErrorIcon} from 'src/icons/StatusErrorIcon';

import s from './PaymentSchedule.scss';

declare namespace PaymentSchedule {
  export type Props = {}
}

export const PaymentSchedule: FC<PaymentSchedule.Props> = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  function toggle() {
    setIsOpened(!isOpened);
  }

  return (
    <div className={s.paymentSchedule}>
      <div className={s.title} onClick={toggle}>
        <Text size={TextSize.tabMenu}>
          График выплат <DropDownIcon />
        </Text>
      </div>
      <TransitionGroup className='row'>
        { isOpened ? (
          <CSSTransition timeout={400} classNames='loan-details-transition'>
            <Table>
              <thead>
                <tr>
                  <th style={{width: '59%'}}>Дата</th>
                  <th>Пени</th>
                  <th>Сумма</th>
                  <th style={{width: '8%'}}>Статус</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>21.02.20</td>
                  <td />
                  <td className='text-nowrap'>1 400.00₽</td>
                  <td className='text-end text-md-center'>
                    <StatusCheckIcon />
                  </td>
                </tr>
                <tr>
                  <td>21.02.20</td>
                  <td />
                  <td className='text-nowrap'>1 400.00₽</td>
                  <td className='text-end text-md-center'>
                    <StatusCheckIcon />
                  </td>
                </tr>
                <tr>
                  <td>21.02.20</td>
                  <td />
                  <td className='text-nowrap'>1 400.00₽</td>
                  <td className='text-end text-md-center'>
                    <StatusCheckIcon />
                  </td>
                </tr>
                <tr>
                  <td>21.02.20</td>
                  <td className='color-red'>+400</td>
                  <td className='color-red text-nowrap'>1 400.00₽</td>
                  <td className='text-end text-md-center'>
                    <StatusErrorIcon />
                  </td>
                </tr>
                <tr>
                  <td>21.02.20</td>
                  <td />
                  <td className='color-gray4 text-nowrap'>1 400.00₽</td>
                  <td className='text-end text-md-center'>
                    <StatusCheckIcon className={s.grayIcon} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Text size={TextSize.body1} weight={TextWeight.semibold}>
                      Итого остаток
                    </Text>
                  </td>
                  <td colSpan={2} className='text-end text-nowrap'>
                    <Text size={TextSize.body1} weight={TextWeight.semibold}>
                      14 200.00 ₽
                    </Text>
                  </td>
                </tr>
              </tbody>
            </Table>
          </CSSTransition>
        ) : null }
      </TransitionGroup>
    </div>
  );
};
