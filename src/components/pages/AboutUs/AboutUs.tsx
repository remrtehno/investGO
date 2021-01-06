import type {FC} from 'react';
import React from 'react';

import {Page} from 'src/components/common/Page';
import {Breadcrumbs} from 'src/components/ui/Breadcrumbs';

import s from './AboutUs.scss';

const breadcrumbs = [
  'Портфель',
  'Завод ЖБИ',
];

export const AboutUs:FC = () => {
  return (
    <Page>
      <section className={s.AboutUs}>
        <div className='container'>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </section>
    </Page>
  );
};
