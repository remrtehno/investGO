import React, {FC} from "react";
import {LogoIcon} from "../../../../icons/LogoIcon";
import s from './PageHeader.scss';

export const PageHeader: FC = () => {
  return (
    <div className={s.PageHeader}>
      <LogoIcon/>
    </div>
  )
};