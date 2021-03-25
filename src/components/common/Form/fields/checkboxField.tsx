import type {FC} from 'react';
import React from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {fieldsModel} from 'src/components/common/Form/fields/fieldsModel';
import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import { CheckBox } from 'src/components/ui/CheckBox';

export declare namespace CheckboxField {
  export type Props = FieldProps<FormField.Checkbox> & {
    onChange?(value: string, name: string | null): void,
  };
}

export const CheckboxField: FC<CheckboxField.Props> = (props) => {
  const {field, onChange, ...checkboxProps} = props;
  const form = useFormModel();

  return (
    <div>
      <CheckBox
        value={field.value}
        label={field.label}
        name={field.name}
        error={field.isDirty ? field.error : null}
        onChange={onChange || form.onChange as any}
        {...checkboxProps}
      />
    </div>
  );
};

fieldsModel.register({
  type: FieldType.checkbox,
  component: CheckboxField,
});
