import type {FC} from 'react';
import React from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {fieldsModel} from 'src/components/common/Form/fields/fieldsModel';
import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {RangeInput} from 'src/components/ui/RangeInput';

export declare namespace RangeField {
  export type Props = FieldProps<FormField.Range> & {
    onChange?(value: boolean, name: string | null): void,
  };
}

export const RangeField: FC<RangeField.Props> = (props) => {
  const {field, onChange, ...rangeProps} = props;
  const form = useFormModel();

  return (
    <div>
      <RangeInput
        value={field.value}
        label={field.label}
        name={field.name}
        min={field.min}
        max={field.max}
        error={field.isDirty ? field.error : null}
        onChange={onChange || form.onChange as any}
        postfix={field.postfix}
        {...rangeProps}
      />
    </div>
  );
};

fieldsModel.register({
  type: FieldType.range,
  component: RangeField,
});
