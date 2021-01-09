import React from 'react';

import separator from 'src/assets/images/separator.png';
import {Text, TextSize} from 'src/components/ui/Text/index';
import {TextWeight} from 'src/components/ui/Text/Text';

import s from './Breadcrumbs.scss';

type OwnProps = {
  breadcrumbs: string[],
}

export const Breadcrumbs = ({breadcrumbs}: OwnProps) => {
  return (
    <ol className={s.Breadcrumbs}>
      {
        breadcrumbs && breadcrumbs.map((element: string, index: number) => (
          <li className={s.BreadcrumbsList} key={index}>
            <Text size={TextSize.bodyMini} weight={TextWeight.normal} className={s.BreadcrumbsListText}>
              <img src={separator} alt='separator' />
              { element }
            </Text>
          </li>
        ))
      }
    </ol>
  );
};
