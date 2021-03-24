import type {FC} from 'react';
import React from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {fieldsModel} from 'src/components/common/Form/fields/fieldsModel';
import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Switch} from 'src/components/ui/Switch';

export declare namespace SwitchField {
  export type Props = FieldProps<FormField.Switch> & {
    onChange?(value: string, name: string | null): void,
  };
}

export const SwitchField: FC<SwitchField.Props> = (props) => {
  const {field, onChange, ...switchProps} = props;
  const form = useFormModel();

  return (
    <div>
      <Switch
        value={field.value}
        label={field.label}
        name={field.name}
        error={field.isDirty ? field.error : null}
        onChange={onChange || form.onChange as any}
        isLongLabel={field.isLongLabel}
        {...switchProps}
      />
    </div>
  );
};

fieldsModel.register({
  type: FieldType.switch,
  component: SwitchField,
});
