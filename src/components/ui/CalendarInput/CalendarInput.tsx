import React, {FC} from 'react';
import {formatDate} from '../../../utils/formatDate';
import {parseDate} from '../../../utils/parseDate';
import {Input} from '../Input';
import s from './CalendarInput.scss';
import cx from 'classnames';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

import 'src/libs/react-datepicker/react-datepicker.css';

export declare namespace CalendarInput {
  export type CalendarProps = Omit<ReactDatePickerProps, 'onChange' | 'name'>;

  export type Props = CalendarProps & {
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
  const {
    className,
    name,
    error,
    label,
    value,
    onChange,
    ...calendarProps
  } = props;

  return (
    <div className={cx(s.CalendarInput, className)}>
      <DatePicker
        {...calendarProps}
        name={name || undefined}
        onChange={(value: Date) => onChange(formatDate(value), name || null)}
        selected={value ? parseDate(value) : null}
        customInput={<CustomInput name={name} label={label} error={error} />}
        dateFormat='dd.MM.yyyy'
        showYearDropdown={true}
        yearDropdownItemNumber={30}
        scrollableYearDropdown={true}
      />
    </div>
  );
};
