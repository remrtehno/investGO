import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useEffect, useMemo} from 'react';

import {useGetProjectsApi} from 'src/api/investorApi/useGetProjectsApi';
import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {TopMenu} from 'src/components/common/TopMenu';
import {ProjectCard} from 'src/components/pages/ProjectsPage/ProjectCard/ProjectCard';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';

import s from './ProjectsPage.scss';

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

export const ProjectsPage: FC = () => {
  const [projectsResult, getProjectsApi, getProjectsState] = useGetProjectsApi();
  const projects = projectsResult?.data;

  const menuItems = useMemo(() => {
    return (
      [
        {
          to: RoutePaths.investorDashboard,
          text: 'Портфель',
        },
        {
          to: RoutePaths.projects,
          text: 'Предложения',
        },
        {
          to: RoutePaths.home,
          text: 'Транзакции',
        },
      ]
    );
  }, []);

  useEffect(() => {
    getProjectsApi(null);
  }, []);

  return (
    <Page>
      <div className={s.ProjectsPage}>
        <TopMenu items={menuItems} />
        <div className={s.alert} style={{display: 'none'}}>
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
                Проекты, доступные для инвестирования
              </h1>
            </div>
            { projects && projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
              />
            )) }
          </div>
        </div>
      </div>
    </Page>
  );
};
