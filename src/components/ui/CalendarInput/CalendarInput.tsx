import React, {FC} from 'react';
import {Input} from '../Input';
import s from './CalendarInput.scss';
import cx from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'src/libs/react-datepicker/react-datepicker.css';

export declare namespace CalendarInput {
  export type Props = {
    onChange(value: string | null, name: string | null): void
    value: string | null,
    label: string,

    className?: string,
    name?: string | null,
  };
}

export const CalendarInput: FC<CalendarInput.Props> = (props) => {
  const CustomInput = ({value, onChange, ...inputProps}: any) => (
    <Input
      containerProps={inputProps}
      name={props.name}
      onChange={(newValue, name, e) => onChange(e)}
      value={value}
      label={props.label}
    />
  );

  return (
    <div className={cx(s.CalendarInput, props.className)}>
      <DatePicker
        name={props.name || undefined}
        onChange={(value: Date) => props.onChange(moment(value).format('YYYY-MM-DD'), props.name || null)}
        selected={props.value ? moment(props.value, 'YYYY-MM-DD').toDate() : null}
        customInput={<CustomInput />}
        dateFormat='dd.MM.yyyy'
      />
    </div>
  );
};
