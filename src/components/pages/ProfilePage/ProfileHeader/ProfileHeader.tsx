import type {FC} from 'react';
import React from 'react';

import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {ProfileSteps} from 'src/recoil/uiAtom';

import s from './ProfileHeader.scss';

type Step = {
  id: ProfileSteps,
  label: string
}

const steps: Step[] = [{
  id: ProfileSteps.profile,
  label: 'Заполните профиль',
}, {
  id: ProfileSteps.rules,
  label: 'Присоединитесь к правилам',
}, {
  id: ProfileSteps.account,
  label: 'Пополните счет',
}, {
  id: ProfileSteps.access,
  label: 'Получите полный доступ к возможностям платформы',
}];

export declare namespace ProfileHeader {
  export type Props = {
    activeStep: ProfileSteps
  }
}

export const ProfileHeader: FC<ProfileHeader.Props> = (props) => (
  <div className={s.profileHeader}>
    <div className={s.steps}>
      { steps.map((step) => (
        <Text
          size={TextSize.body1}
          color={props.activeStep === step.id ? Color.white : Color.gray4}
          className={s.step}
          key={step.id}
        >{ step.label }</Text>
      )) }
    </div>
  </div>
);
