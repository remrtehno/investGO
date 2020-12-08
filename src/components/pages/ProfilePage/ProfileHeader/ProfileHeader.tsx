import React, {FC} from "react";
import {Color} from "../../../../types/Color";
import {Text, TextSize} from "../../../ui/Text";
import s from './ProfileHeader.scss';

export enum ProfileStep {
  profile = 'profile',
  rules = 'rules',
  account = 'account',
  access = 'access'
}

type Step = {
  id: ProfileStep,
  label: string
}

const steps: Step[] = [{
  id: ProfileStep.profile,
  label: 'Заполните профиль'
}, {
  id: ProfileStep.rules,
  label: 'Присоединитесь к правилам'
}, {
  id: ProfileStep.account,
  label: 'Пополните счет'
}, {
  id: ProfileStep.access,
  label: 'Получите полный доступ к возможностям платформы'
}]

export declare namespace ProfileHeader {
  export type Props = {
    activeStep: ProfileStep
  }
}

export const ProfileHeader: FC<ProfileHeader.Props> = (props) => {
  return (
    <div className={s.profileHeader}>
      <div className={s.steps}>
        {steps.map((step, index) => {
          return (
            <Text
              size={TextSize.body1}
              color={props.activeStep === step.id ? Color.white : Color.gray4}
              className={s.step}
              key={step.id}
            >{step.label}</Text>
          )
        })}
      </div>
    </div>
  );
};
