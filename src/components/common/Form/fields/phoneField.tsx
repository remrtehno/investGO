import type {FC} from 'react';
import React, {useCallback, useMemo} from 'react';

import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';

import type {FieldProps} from './fieldsModel';
import {fieldsModel} from './fieldsModel';
import {TextField} from './textField';

function fromValue(value: string) {
  if (!value) {
    return null;
  }
  return value.replace(/-/g, '');
}

function toValue(v: string) {
  if (!v) {
    return null;
  }
  return `${v.slice(0, 2)}-${v.slice(2, 5)}-${v.slice(5, 8)}-${v.slice(8, 10)}-${v.slice(-2)}`;
}

export const PhoneField: FC<FieldProps<FormField.Number>> = (props) => {
  const form = useFormModel();

  const field = useMemo((): FormField.Text => ({
    ...props.field,
    type: FieldType.text,
    mask: '+7-999-999-99-99',
    value: toValue(props.field.value),
    validations: [...props.field.validations || [], (value) => {
      if (!value) {
        return null;
      }

      const rawValue = fromValue(value);
      return rawValue && rawValue.length === 12 ? null : 'Некорректный телефон';
    }],
  }), [props.field]);

  const handleChange = useCallback((value: string, name: string) => {
    form.onChange(fromValue(value), name);
  }, []);

  return (
    <TextField
      field={field}
      onChange={handleChange}
    />
  );
};

fieldsModel.register({
  type: FieldType.phone,
  component: PhoneField,
});
