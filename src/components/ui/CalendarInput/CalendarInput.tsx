import React, {FC} from 'react';
import {Input} from "../Input";
import s from './CalendarInput.scss';
import cx from 'classnames';
import DatePicker from "react-datepicker";

import "src/libs/react-datepicker/react-datepicker.css";

export declare namespace CalendarInput {
  export type Props = {
    onChange(value: Date | null, name: string | null): void
    value: Date | null,
    label: string,

    className?: string,
    name?: string | null,
  };
}

export const CalendarInput: FC<CalendarInput.Props> = (props) => {
  const CustomInput = ({ value, onChange, ...inputProps }: any) => {

    return (
      <Input
        containerProps={inputProps}
        name={props.name}
        onChange={(value, name, e) => onChange(e)}
        value={value}
        label={props.label}
      />
    );
  };

  return (
    <div className={cx(s.CalendarInput, props.className)}>
      <DatePicker
        name={props.name || undefined}
        onChange={(value: Date) => props.onChange(value, props.name || null)}
        selected={props.value}
        customInput={<CustomInput/>}
        dateFormat='dd.MM.yyyy'
      />
    </div>
  );
};
