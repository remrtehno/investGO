import React, {FC} from 'react';
import {Page} from '../../common/Page';
import cx from 'classnames';
import s from './ProjectsPage.scss';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import ProjectPageCard from 'src/components/pages/ProjectsPage/ProjectPageCard';
import _ from 'lodash';

const cards = [
  {
    title: 'Airbnb',
    description: 'Под разработку мобильного приложения',
    price: '10 000 000.00',
    collect: '999 000',
    progress: '30',
    image: '/src/assets/images/project-1.png',
    logo: '../../../assets/images/logo1.png',
    rate: '20%',
    term: '10 дней',
    investors: '10',
  },
  {
    title: 'Carsy',
    description: 'Под разработку мобильного приложения',
    price: '12 000 000.00',
    collect: '999 000',
    progress: '80',
    image: '../../../assets/project-2.png',
    rate: '20%',
    term: '30 дней',
    investors: '15',
  },
  {
    title: 'ООО УралАвтоИмпорт',
    description: 'Под разработку мобильного приложения',
    price: '7 000 000.00',
    collect: '999 000',
    progress: '50',
    image: '../../../assets/project-3.png',
    rate: '20%',
    term: '30 дней',
    investors: '15',
  },
  {
    title: 'Airbnb',
    description: 'Под разработку мобильного приложения',
    price: '10 000 000.00',
    collect: '999 000',
    progress: '20',
    image: '../../../assets/project-4.png',
    logo: '../../../assets/logo3.png',
    rate: '20%',
    term: '30 дней',
    investors: '15',
  },
  {
    title: 'Airbnb',
    description: 'Под разработку мобильного приложения',
    price: '1 000 000.00',
    collect: '999 000',
    progress: '80',
    image: '../../../assets/project-5.png',
    logo: '../../../assets/logo4.png',
    rate: '24%',
    term: '30 дней',
    investors: '19',
    offer: '999 000',
  },
];

function WarningIcon() {
  return (
    <svg className={s.svg} width='22' height='19' viewBox='0 0 22 19' fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd'
        d='M1.73587 18.6077C0.965539 18.6077 0.48448 17.7733 0.870444 17.1066L10.136 1.10248C10.5212 0.437196 11.4817 0.437193 11.8668 1.10248L21.1324 17.1066C21.5184 17.7733 21.0373 18.6077 20.267 18.6077H1.73587ZM12.0014 15.6056H11.0662C11.0448 15.607 11.0232 15.6077 11.0014 15.6077C10.9797 15.6077 10.9581 15.607 10.9367 15.6056H10.0014V13.6056H12.0014V15.6056ZM12.0014 11.6077H10.0014V6.60765H12.0014V11.6077Z'
        fill='white' />
    </svg>
  );
}

export const ProjectsPage: FC = () => (
  <Page>
    <div className={s.ProjectsPage}>
      <div className={s.alert}>
        <div className={cx('container', s.ProjectContainer)}>
          <div className={s.ProjectText}>
            <WarningIcon />
            Доступ ограничен. Заполните данные профиля и присоединитесь к новым <a href='#'>Правилам платформы.</a>
          </div>
          <Button
            onClick={_.noop}
            className={s.joinBtn}
            size={ButtonSize.s}
            theme={ButtonTheme.white}
          > Присоединиться </Button>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1 className={s.title}>
              Проекты для инвестиций
            </h1>
          </div>
          { cards && cards.map((item, index) => (
            <ProjectPageCard
              key={index}
              image={item.image}
              title={item.title}
              collect={item.collect}
              description={item.description}
              price={item.price}
              logo={item.logo}
              rate={item.rate}
              term={item.term}
              investors={item.investors}
              progress={item.progress}
              offer={item.offer}
            />
          )) }
        </div>
      </div>
    </div>
  </Page>);
