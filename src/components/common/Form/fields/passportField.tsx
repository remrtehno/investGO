import React, {FC, useMemo} from "react";
import {FieldType} from "../Form";
import {FormField} from "../types";
import {FieldProps, fieldsModel} from "./fieldsModel";
import {TextField} from "./textField";

export declare namespace NumberField {
  export type Props = Omit<TextField.Props, 'regExp'>;
}

export const PassportField: FC<FieldProps<FormField.Number>> = (props) => {
  const field = useMemo((): FormField.Text => {
    return {
      ...props.field,
      type: FieldType.text,
    };
  }, [props.field]);

  return (
    <TextField
      field={field}
      isPassword={true}
    />
  )
};

fieldsModel.register({
  type: FieldType.password,
  component: PassportField,
});
