import type {FC} from 'react';
import React from 'react';

// @ts-ignore
import lg1 from 'src/assets/images/logo1.png';
// @ts-ignore
import pr1 from 'src/assets/images/project-1.png';
import {ProgressBar} from 'src/components/pages/ProjectsPage/ProgressBar';
import s from 'src/components/pages/ProjectsPage/ProjectsPage.scss';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {Color} from 'src/types/Color';


export declare namespace ProjectCard {
  export type Props = {
    title: string,
    description: string,
    price: string,
    collect: string,
    progress: string
    image: string,
    logo?: string,
    rate: string,
    term: string,
    investors?: string,
    offer?: string,
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

export const ProjectPageCard: FC<ProjectCard.Props> = (props) => (
  <div className='col-lg-4 col-md-6 col-sm-10 offset-sm-1 offset-md-0'>
    <div className={s.projectItem}>
      <div className={s.projectImageContainer}>
        { props.image && <img src={pr1} alt='' className={s.projectImage} /> }
        <img src={lg1} alt='logo' className={s.projectItemLogo} />
        <div className={s.projectItemTextBottom}>
          <Text color={Color.white} size={TextSize.h3}>{ props.title }</Text>
          <Text color={Color.white} size={TextSize.tabMenu}>{ props.description }</Text>
        </div>
      </div>
      <div className={s.projectItemSteps}>
        <div className={s.projectItemStepsItem}>
          <Text size={TextSize.tabMenu} color={Color.label}>ставка</Text>
          <Text size={TextSize.bodyMini} weight={TextWeight.bold}> { props.rate } </Text>
        </div>
        <div className={s.projectItemStepsItem}>
          <Text size={TextSize.tabMenu} color={Color.label}>срок</Text>
          <Text size={TextSize.bodyMini} weight={TextWeight.bold}> { props.term } </Text>
        </div>
        <div className={s.projectItemStepsItem}>
          <Text size={TextSize.tabMenu} color={Color.label}>инвесторов</Text>
          <Text size={TextSize.bodyMini} weight={TextWeight.bold}> { props.investors } </Text>
        </div>
      </div>
      <ProgressBar progress={props.progress} />
      <Text className={s.projectItemCollected} size={TextSize.bodyMini}>
        <Text size={TextSize.bodyMini} className={s.projectItemCollectedLabel}>Собрано</Text> { props.collect } ₽
        { props.offer
          && <span className={s.projectItemCollectedOffer}>
            <OfferIcon /> &nbsp;
            { props.offer } ₽
          </span> }
      </Text>
      <Text className={s.projectItemPrice} size={TextSize.h3} weight={TextWeight.normal}>
        { props.price } ₽
      </Text>
    </div>
  </div>
);
