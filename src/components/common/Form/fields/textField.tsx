import React, {FC} from 'react';
import {Input} from '../../../ui/Input';
import {FieldType, useFormModel} from '../Form';
import {FormField} from '../types';
import {FieldProps, fieldsModel} from './fieldsModel';

export declare namespace TextField {
  export type Props = FieldProps<FormField.Text> & Pick<Input.Props, 'regExp' | 'isPassword'> & {
    onChange?(value: string, name: string | null): void,
  };
}

export const TextField: FC<TextField.Props> = (props) => {
  const {field, onChange, ...inputProps} = props;
  const form = useFormModel();

  return (
    <div>
      <Input
        value={field.value}
        label={field.label}
        name={field.name}
        error={field.isDirty ? field.error : null}
        onChange={onChange || form.onChange}
        disabled={field.disabled}
        regExp={field.regExp}
        mask={field.mask}
        {...inputProps}
      />
    </div>
  );
};

fieldsModel.register({
  type: FieldType.text,
  component: TextField,
});
