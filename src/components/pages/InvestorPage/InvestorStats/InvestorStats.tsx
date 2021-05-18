import cx from 'classnames';
import type {FC} from 'react';
import React, {useRef, useState} from 'react';
import {PieChart} from 'react-minimal-pie-chart';

import type {Investor} from 'src/types/Investor';

import s from './InvestorStats.scss';

declare namespace InvestorStats {
  export type Props = {
    portfolio: Investor.Portfolio | null
  }
}

export const InvestorStats: FC<InvestorStats.Props> = (props) => {
  return (
    <div className={s.investorStats}>
      <div className='row'>
        <div className='col-12 col-md-6 pe-md-5'>
          <div className={s.list}>
            <div className={cx('row', s.listItem)}>
              <div className='col-8'>Всего инвестиций</div>
              <div className='col-4 text-end'>{ props.portfolio?.in_investment } ₽ </div>
            </div>
            <div className={cx('row', s.listItem)}>
              <div className='col-8'>Количество сделок</div>
              <div className='col-4 text-end'>{ props.portfolio?.loans_count }</div>
            </div>
            <div className={cx('row', s.listItem)}>
              <div className='col-8'>Ожидаемый доход</div>
              <div className='col-4 text-end'>{ props.portfolio?.expected_revenue } ₽</div>
            </div>
            <div className={cx('row', s.listItem)}>
              <div className='col-8'>Комиссия</div>
              <div className='col-4 text-end'>0 ₽</div>
            </div>
            <div className={cx('row', s.listItem)}>
              <div className='col-8'>Задолженности</div>
              <div className='col-4 text-end'>{ props.portfolio?.missed_debts } ₽</div>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6 ps-md-5'>
          <div className={s.chart}>
            <PieChart
              data={[
                {
                  title: 'One',
                  value: (
                    !parseInt(props.portfolio?.wait_debts || '0', 10) && !parseInt(props.portfolio?.paid_out || '0', 10) && !parseInt(props.portfolio?.missed_debts || '0', 10)
                      ? 100
                      : parseInt(props.portfolio?.wait_debts || '0', 10)),
                  color: '#D1CED2',
                },
                {title: 'Two', value: parseInt(props.portfolio?.paid_out || '0', 10), color: '#000000'},
                {title: 'Three', value: parseInt(props.portfolio?.missed_debts || '0', 10), color: '#FF3B30'},
              ]}
              lineWidth={15}
            />
            <div className={s.chartTotal}>
              { parseInt(props.portfolio?.paid_out || '0', 10)
              + parseInt(props.portfolio?.wait_debts || '0', 10)
              + parseInt(props.portfolio?.missed_debts || '0', 10) } ₽
            </div>
          </div>
          <div className={cx('row', s.chartLabels)}>
            <div className={cx('col-4', s.chartLabelWrapper)}>
              <div>
                <div className={s.chartLabel}>
                  <i className={s.gray} />Общий долг
                </div>
                <div className={s.sum}>{ props.portfolio?.wait_debts } ₽  </div>
              </div>
            </div>
            <div className={cx('col-4', s.chartLabelWrapper)}>
              <div>
                <div className={s.chartLabel}>
                  <i className={s.black} />Выплачено
                </div>
                <div className={s.sum}>{ props.portfolio?.paid_out } ₽  </div>
              </div>
            </div>
            <div className={cx('col-4', s.chartLabelWrapper)}>
              <div>
                <div className={s.chartLabel}>
                  <i className={s.red} />Задолженность
                </div>
                <div className={s.sum}>{ props.portfolio?.missed_debts } ₽  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
