import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';
import {Link} from 'react-router-dom';

// @ts-ignore
import lg1 from 'src/assets/images/logo1.png';
// @ts-ignore
import pr1 from 'src/assets/images/project-1.png';
import {RoutePaths} from 'src/components/common/App/routes';
import {ProgressBar} from 'src/components/pages/ProjectsPage/ProjectCard/ProgressBar';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {Color} from 'src/contstants/Color';
import type {Project} from 'src/types/Project';
import {plural} from 'src/utils/plural';

import s from './ProjectCard.scss';


export declare namespace ProjectCard {
  export type Props = {
    project: Project.InvestorProject
  };
}

function OfferIcon() {
  return (
    <svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='9.77691' cy='10.2222' r='6.22222' fill='#FF3B30' />
      <circle cx='7.99957' cy='10.2222' r='6.22222' fill='white' />
      <circle cx='6.22222' cy='10.2222' r='5.72222' fill='#FF3B30' stroke='#FF3B30' />
    </svg>
  );
}

export const ProjectCard: FC<ProjectCard.Props> = (props) => {
  const {project} = props;

  function getProgress() {
    // return `${project.collected_amount * 100 / project.amount}%`;
    return 0;
  }

  return (
    <div className='col-lg-4 col-md-6 col-sm-10 offset-sm-1 offset-md-0'>
      <div className={s.projectItem}>
        <Link to={RoutePaths.investOffer(project.uuid)}>
          <div
            className={s.projectImageContainer}
            style={{backgroundImage: `url(${project?.preview?.url || pr1})`}}
          >
            { project.logo ? (
              <div
                className={s.projectItemLogo}
                style={{backgroundImage: `url(${project?.logo?.url})`}}
              />
            ) : null }
            <div className={s.projectItemTextBottom}>
              <Text
                color={Color.white}
                size={TextSize.h3}
                weight={TextWeight.bold}
                className={cx(s.title, project.logo && s.titleWithLogo)}
              >
                { project.title }
              </Text>
              <Text color={Color.white} size={TextSize.tabMenu}>
                { project.description }
              </Text>
            </div>
          </div>
        </Link>
        <div className={s.projectItemSteps}>
          <div className={s.projectItemStepsItem}>
            <Text size={TextSize.tabMenu} color={Color.label}>ставка</Text>
            <Text size={TextSize.bodyMini} weight={TextWeight.bold}> { project.rate }% </Text>
          </div>
          <div className={s.projectItemStepsItem}>
            <Text size={TextSize.tabMenu} color={Color.label}>срок</Text>
            <Text size={TextSize.bodyMini} weight={TextWeight.bold}>
              { project.term } { plural(project.term, ['день', 'дня', 'дней']) }
            </Text>
          </div>
          <div className={s.projectItemStepsItem}>
            <Text size={TextSize.tabMenu} color={Color.label}>инвесторов</Text>
            <Text size={TextSize.bodyMini} weight={TextWeight.bold}> { project.users_count } </Text>
          </div>
        </div>
        <ProgressBar progress={getProgress()} />
        <Text className={s.projectItemCollected} size={TextSize.bodyMini}>
          <Text size={TextSize.bodyMini} className={s.projectItemCollectedLabel}>Собрано</Text>
          { project.collected_amount } ₽
          { project.current_user_invest_amount && project.current_user_invest_amount !== '0'
            && <span className={s.projectItemCollectedOffer}>
              <OfferIcon /> &nbsp;
              { project.current_user_invest_amount } ₽
            </span> }
        </Text>
        <Text className={s.projectItemPrice} size={TextSize.h3} weight={TextWeight.semibold}>
          { project.amount } ₽
        </Text>
      </div>
    </div>
  );
};
