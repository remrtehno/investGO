import type {FC} from 'react';
import React from 'react';

import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';

import type {FieldProps} from './fieldsModel';
import {fieldsModel} from './fieldsModel';
import {TextArea} from 'src/components/ui/TextArea';

export declare namespace TextAreaField {
  export type Props = FieldProps<FormField.TextArea> & {
    onChange?(value: string, name: string | null): void,
  };
}

export const TextAreaField: FC<TextAreaField.Props> = (props) => {
  const {field, onChange, ...inputProps} = props;
  const form = useFormModel();

  return (
    <div>
      <TextArea
        value={field.value}
        label={field.label}
        name={field.name}
        error={field.isDirty ? field.error : null}
        onChange={onChange || form.onChange as any}
        disabled={field.disabled}
        placeholder={field.placeholder}
        {...inputProps}
      />
    </div>
  );
};

fieldsModel.register({
  type: FieldType.textArea,
  component: TextAreaField,
});
