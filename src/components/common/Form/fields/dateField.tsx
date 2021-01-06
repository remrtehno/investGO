import type {FC} from 'react';
import React from 'react';

import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {CalendarInput} from 'src/components/ui/CalendarInput';

import type {FieldProps} from './fieldsModel';
import {fieldsModel} from './fieldsModel';

export declare namespace DateField {
  export type Props = FieldProps<FormField.Date>;
}

export const DateField: FC<DateField.Props> = (props) => {
  const {field} = props;
  const form = useFormModel();

  return (
    <CalendarInput
      {...field}
      value={field.value}
      onChange={form.onChange}
      name={field.name}
      label={field.label}
      error={!field.isDirty ? null : field.error}
    />
  );
};

fieldsModel.register({
  type: FieldType.date,
  component: DateField,
});
