import _ from 'lodash';
import type {FC} from 'react';
import React, {useMemo} from 'react';

import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {PhoneInput} from 'src/components/ui/PhoneInput';
import {phone} from 'src/validations/phone';

import type {FieldProps} from './fieldsModel';
import {fieldsModel} from './fieldsModel';


export const PhoneField: FC<FieldProps<FormField.Phone>> = (props) => {
  const form = useFormModel();

  const field = useMemo((): FormField.Text => ({
    ...props.field,
    type: FieldType.text,
    validations: [phone(), ...(props.field.validations || [])],
  }), [props.field]);

  return (
    <PhoneInput
      value={field.value}
      label={field.label}
      name={field.name}
      error={field.isDirty ? field.error : null}
      disabled={field.disabled}
      regExp={field.regExp}
      onChange={form.onChange as any}
      {..._.omit(props, 'field')}
    />
  );
};

fieldsModel.register({
  type: FieldType.phone,
  component: PhoneField,
});
