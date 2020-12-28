import React, {FC, useMemo} from "react";
import {integerRegExp, numberRegExp} from "../../../../contstants/regExp";
import {FieldType} from "../Form";
import {FormField} from "../types";
import {FieldProps, fieldsModel} from "./fieldsModel";
import {TextField} from "./textField";

export declare namespace NumberField {
  export type Props = Omit<TextField.Props, 'regExp'>;
}

export const NumberField: FC<FieldProps<FormField.Number>> = (props) => {
  const field = useMemo((): FormField.Text => {
    return {
      ...props.field,
      type: FieldType.text,
      regExp: props.field.isInteger ? integerRegExp : numberRegExp,
    };
  }, [props.field]);

  return (
    <TextField
      field={field}
    />
  )
};

fieldsModel.register({
  type: FieldType.number,
  component: NumberField,
});
