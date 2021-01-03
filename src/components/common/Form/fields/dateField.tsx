import React, {FC} from 'react';
import {CalendarInput} from '../../../ui/CalendarInput';
import {FieldType, useFormModel} from '../Form';
import {FormField} from '../types';
import {FieldProps, fieldsModel} from './fieldsModel';

export declare namespace DateField {
  export type Props = FieldProps<FormField.Date> & CalendarInput.Props;
}

export const DateField: FC<DateField.Props> = (props) => {
  const {field} = props;
  const form = useFormModel();

  return (
    <CalendarInput
      value={field.value}
      onChange={form.onChange}
      name={field.name}
      label={field.label}
    />
  );
};

fieldsModel.register({
  type: FieldType.date,
  component: DateField,
});
