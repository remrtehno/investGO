import React, {FC} from "react";
import {Text, TextSize} from "../../../../ui/Text";
import s from './ProfileFormTitle.scss';

export const ProfileFormTitle: FC = (props) => {
  return (
    <Text className={s.ProfileFormTitle} size={TextSize.h2}>{props.children}</Text>
  );
};
