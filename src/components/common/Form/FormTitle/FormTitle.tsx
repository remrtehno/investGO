import React, {FC} from "react";
import {Text, TextSize} from "../../../ui/Text";
import s from './FormTitle.scss';

export const FormTitle: FC = (props) => {
  return (
    <Text className={s.FormTitle} size={TextSize.h2}>{props.children}</Text>
  );
};
