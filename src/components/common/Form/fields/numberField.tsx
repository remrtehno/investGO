import type {FC} from 'react';
import React, {useMemo} from 'react';

import {FieldType} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {integerRegExp, numberRegExp} from 'src/contstants/regExp';
import type {Plurals} from 'src/utils/plural';
import {plural} from 'src/utils/plural';

import type {FieldProps} from './fieldsModel';
import {fieldsModel} from './fieldsModel';
import {TextField} from './textField';

export declare namespace NumberField {
  export type Props = Omit<TextField.Props, 'regExp'>
}

export const NumberField: FC<FieldProps<FormField.Number>> = (props) => {
  const field = useMemo((): FormField.Text => ({
    ...props.field,
    type: FieldType.text,
    regExp: props.field.isInteger ? integerRegExp : numberRegExp,
    postfix: Array.isArray(props.field.postfix)
      ? plural(props.field.value, props.field.postfix as Plurals)
      : props.field.postfix,
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
