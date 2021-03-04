import type {FC} from 'react';
import React, {useMemo} from 'react';

import {FieldType} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {integerRegExp, numberRegExp} from 'src/contstants/regExp';

import type {FieldProps} from './fieldsModel';
import {fieldsModel} from './fieldsModel';
import {TextField} from './textField';

export declare namespace NumberField {
  export type Props = Omit<TextField.Props, 'regExp'>;
}

export const NumberField: FC<FieldProps<FormField.Number>> = (props) => {
  const field = useMemo((): FormField.Text => ({
    ...props.field,
    type: FieldType.text,
    regExp: props.field.isInteger ? integerRegExp : numberRegExp,
  }), [props.field]);

  return (
    <TextField
      field={field}
    />
  );
};

fieldsModel.register({
  type: FieldType.number,
  component: NumberField,
});
