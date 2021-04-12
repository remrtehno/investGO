import cx from 'classnames';
import type {FC} from 'react';
import React, {useRef, useState} from 'react';
import {PieChart} from 'react-minimal-pie-chart';

import s from './InvestorStats.scss';

declare namespace InvestorStats {
  export type Props = {
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
              <div className='col-4 text-end'>100 000 ₽ </div>
            </div>
            <div className={cx('row', s.listItem)}>
              <div className='col-8'>Количество сделок</div>
              <div className='col-4 text-end'>5</div>
            </div>
            <div className={cx('row', s.listItem)}>
              <div className='col-8'>Ожидаемый доход</div>
              <div className='col-4 text-end'>20 000 ₽</div>
            </div>
            <div className={cx('row', s.listItem)}>
              <div className='col-8'>Комиссия</div>
              <div className='col-4 text-end'>500 ₽</div>
            </div>
            <div className={cx('row', s.listItem)}>
              <div className='col-8'>Задолженности</div>
              <div className='col-4 text-end'>5 000 ₽</div>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6 ps-md-5'>
          <div className={s.chart}>
            <PieChart
              data={[
                {title: 'One', value: 80000, color: '#D1CED2'},
                {title: 'Two', value: 35000, color: '#000000'},
                {title: 'Three', value: 5000, color: '#FF3B30'},
              ]}
              lineWidth={15}
            />
            <div className={s.chartTotal}>120 000 ₽</div>
          </div>
          <div className={cx('row', s.chartLabels)}>
            <div className='col-4'>
              <div className={s.chartLabel}>
                <i className={s.gray} />Общий долг
              </div>
              <div className={s.sum}>80 000 ₽  </div>
            </div>
            <div className='col-4'>
              <div className={s.chartLabel}>
                <i className={s.black} />Выплачено
              </div>
              <div className={s.sum}>35 000 ₽  </div>
            </div>
            <div className='col-4'>
              <div className={s.chartLabel}>
                <i className={s.red} />Задолженность
              </div>
              <div className={s.sum}>5000 ₽  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
