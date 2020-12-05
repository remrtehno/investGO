import React, {FC} from "react";
import {Color} from "../../../../types/Color";
import {Text, TextSize} from "../../../ui/Text";
import {ProfileFormType, ProfilePage} from "../ProfilePage";
import s from './ProfileNavigation.scss';
import cx from 'classnames';

export declare namespace ProfileNavigation {
  export type Props = {
    forms: ProfilePage.FormInfo[],
    activeForm: ProfileFormType,
  };
}

export const ProfileNavigation: FC<ProfileNavigation.Props> = (props) => {
  return (
    <div className={s.navigation}>
      {props.forms.map((form) => {
        const isActive = props.activeForm === form.id;
        return (
          <Text
            isBold={isActive}
            size={TextSize.body1}
            color={isActive ? Color.black : Color.label}
            key={form.id}
            className={cx(s.link, { [s.active]: isActive })}
          >
            {form.title}
          </Text>
        )
      })}
    </div>
  )
};
