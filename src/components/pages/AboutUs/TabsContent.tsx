import type {FC} from 'react';
import React from 'react';

import s from 'src/components/pages/AboutUs/AboutUs.scss';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';

export type TabsContent = {
  tabId: string,
}

export const TabsContent:FC<TabsContent> = (props) => {
  switch (props.tabId) {
  case '1':
    return (
      <table className={s.contentTable}>
        <tbody>
          <tr>
            <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Компания:</Text></td>
            <td><Text size={TextSize.body2} >ООО УралСтрой</Text></td>
          </tr>
          <tr>
            <td><Text size={TextSize.body1} weight={TextWeight.semibold}>ИНН / ОРГН:</Text></td>
            <td><Text size={TextSize.body2} >98799000008 / 457923567894</Text></td>
          </tr>
          <tr>
            <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Юридический адрес:</Text></td>
            <td><Text size={TextSize.body2} >Краснодарский крaай, Сочи, Лазаревский район, Лазаревское  пос., <br /> Павлова, 75, оф. 155</Text></td>
          </tr>
          <tr>
            <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Фактический адрес:</Text></td>
            <td><Text size={TextSize.body2} >г.Москва, ​Лосиноостровский район, Норильская, 1</Text></td>
          </tr>
          <tr>
            <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Сайт:</Text></td>
            <td><Text size={TextSize.body2} ><a href='#'>jbi.com</a></Text></td>
          </tr>
          <tr>
            <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Срок деятельности компании:</Text></td>
            <td><Text size={TextSize.body2} >8 лет 1 месяц (с 11.01.2012)</Text></td>
          </tr>
        </tbody>
      </table>
    );

  case '2':
    return (
      <div>2</div>
    );

  case '3':
    return (
      <div>3</div>
    );

  default:
    return null;
  }
};
