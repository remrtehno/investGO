import type {FC} from 'react';
import React from 'react';

import {Table} from 'src/components/common/Table';

declare namespace LoanEvents {
  export type Props = {}
}

export const LoanEvents: FC<LoanEvents.Props> = (props) => {
  return (
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
  );
};
