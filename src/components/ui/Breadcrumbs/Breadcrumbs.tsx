import React from 'react';

import {Text, TextSize} from 'src/components/ui/Text/index';
import {TextWeight} from 'src/components/ui/Text/Text';

import s from './Breadcrumbs.scss';

type Links = {
  label: string,
  link: string,
}

type OwnProps = {
  breadcrumbs: Links[],
}

export const Breadcrumbs = ({breadcrumbs}: OwnProps) => {
  return (
    <ol className={s.Breadcrumbs}>
      {
        breadcrumbs && breadcrumbs.map((element, index) => (
          <li className={s.BreadcrumbsList} key={index}>
            <Text size={TextSize.bodyMini} weight={TextWeight.normal}>
              <a href={element.link} className={s.BreadcrumbsListText}>
                <svg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M5.51172 8.82422L1.41206 5.00142L5.51172 1.17863' stroke='#7F7F7F' strokeWidth='0.933333' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
                { element.label }
              </a>
            </Text>
          </li>
        ))
      }
    </ol>
  );
};
