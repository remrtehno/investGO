import type {FC} from 'react';
import React from 'react';

import {Table} from 'src/components/common/Table';
import {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {breackpointDown, breackpointUp} from 'src/utils/breackpointUtils';

import s from './LoanEvents.scss';

declare namespace LoanEvents {
  export type Props = {}
}

export const LoanEvents: FC<LoanEvents.Props> = (props) => {
  return (
    <div>
      { breackpointDown(adaptiveBreackpoints.md) ? (
        <div className={s.events}>
          <div className={s.event}>
            <div className={s.date}>17.01.21</div>
            <div className={s.description}>
              <div className={s.name}>Цессия</div>
              <div className={s.comment}>Автоматическая цессия</div>
            </div>
          </div>
          <div className={s.event}>
            <div className={s.date}>17.01.21</div>
            <div className={s.description}>
              <div className={s.name}>Информационное письмо от заемщика</div>
              <div className={s.comment}>Автоматическая цессия</div>
              <a href='#'>Название файла ссылкой</a>
            </div>
          </div>
          <div className={s.event}>
            <div className={s.date}>17.01.21</div>
            <div className={s.description}>
              <div className={s.name}>Частичное погашение</div>
              <div className={s.comment}>Комментарий</div>
              <a href='#'>Название файла ссылкой</a>
            </div>
          </div>
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Событие</th>
              <th>Комментарий</th>
              <th>Файлы</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>21.01.20</td>
              <td className='color-label'>Принудительная просрочка</td>
              <td>Частичное погашение</td>
              <td />
            </tr>
            <tr>
              <td>21.01.20</td>
              <td className='color-label'>Цессия</td>
              <td>Автоматическая цессия</td>
              <td />
            </tr>
            <tr>
              <td>21.01.20</td>
              <td className='color-label'>Информационное письмо от заемщика</td>
              <td />
              <td><a href='#'>Файл письма</a></td>
            </tr>
            <tr>
              <td>21.01.20</td>
              <td className='color-label'>Частичное погашение</td>
              <td>Погашено 1 000.00 ₽</td>
              <td />
            </tr>
            <tr>
              <td>21.01.20</td>
              <td className='color-label'>Частичное погашение</td>
              <td>Погашено 1 000.00 ₽</td>
              <td />
            </tr>
          </tbody>
        </Table>
      ) }
    </div>
  );
};
