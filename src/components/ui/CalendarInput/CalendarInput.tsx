import React, {FC} from 'react';
import {formatDate} from '../../../utils/formatDate';
import {parseDate} from '../../../utils/parseDate';
import {Input} from '../Input';
import s from './CalendarInput.scss';
import cx from 'classnames';
import DatePicker from 'react-datepicker';

import 'src/libs/react-datepicker/react-datepicker.css';

export declare namespace CalendarInput {
  export type Props = {
    onChange(value: string | null, name: string | null): void
    value: string | null,
    label: string,

    error?: string | null,
    className?: string,
    name?: string | null,
  };
}

const CustomInput = ({value, onChange, name, label, error, ...inputProps}: any) => {
  return (
    <Input
      containerProps={inputProps}
      name={name}
      onChange={(newValue, name, e) => onChange(e)}
      mask='99.99.9999'
      value={value}
      label={label}
      error={error}
    />
  );
};

export const CalendarInput: FC<CalendarInput.Props> = (props) => {
  return (
    <div className={cx(s.CalendarInput, props.className)}>
      <DatePicker
        name={props.name || undefined}
        onChange={(value: Date) => props.onChange(formatDate(value), props.name || null)}
        selected={props.value ? parseDate(props.value) : null}
        customInput={<CustomInput name={props.name} label={props.label} error={props.error} />}
        dateFormat='dd.MM.yyyy'
      />
    </div>
  );
};
