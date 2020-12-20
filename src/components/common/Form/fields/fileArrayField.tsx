import React, {FC} from "react";
import {FileArrayInput} from "../../../ui/FileArrayInput/FileArrayInput";
import {Input} from "../../../ui/Input";
import {FieldType, useFormModel} from "../Form";
import {FormField} from "../types";
import {FieldProps, fieldsModel} from "./fieldsModel";

export declare namespace FileArrayField {
  export type Props = FieldProps<FormField.FileArray> & Pick<Input.Props, 'regExp'>;
}

export const FileArrayField: FC<FileArrayField.Props> = (props) => {
  const { field } = props;
  const form = useFormModel();

  return (
    <FileArrayInput
      files={field.value}
      name={field.name}
      onChange={form.onChange}
      disabled={field.disabled}
    />
  )
};

fieldsModel.register({
  type: FieldType.fileArray,
  component: FileArrayField,
});
