import React from 'react';
import s from './Breadcrumbs.scss';
import {Text, TextSize} from '../Text/index';
import separator from '../../../assets/images/separator.png';
import {TextWeight} from "src/components/ui/Text/Text";

type OwnProps = {
  breadcrumbs: string[],
}

export const Breadcrumbs = ({breadcrumbs}: OwnProps) => {
  return (
    <ol className={s.Breadcrumbs}>
      {
        breadcrumbs && breadcrumbs.map((element: string, index: number) => (
          <li className={s.BreadcrumbsList} key={index}>
            <Text size={TextSize.bodyMini} weight={TextWeight.normal}>
              <img src={separator} alt='separator' />
              { element }
            </Text>
          </li>
        ))
      }
    </ol>
  );
};
