import type {FC} from 'react';
import React from 'react';

import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Input} from 'src/components/ui/Input';

import type {FieldProps} from './fieldsModel';
import {fieldsModel} from './fieldsModel';

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
        onChange={onChange || form.onChange as any}
        disabled={field.disabled}
        regExp={field.regExp}
        mask={field.mask}
        postfix={field.postfix}
        {...inputProps}
      />
    </div>
  );
};

fieldsModel.register({
  type: FieldType.text,
  component: TextField,
});
