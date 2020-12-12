import React, {FC, useState} from "react";
import {FilePrimitive} from "../../../../types/FilePrimitive";
import {Input} from "../../../ui/Input";
import {FieldType} from "../Form";
import {FormField} from "../types";
import {FieldProps, fieldsModel} from "./fieldsModel";
import _ from 'lodash';
import cx from 'classnames';

export declare namespace FileArrayInput {
  export type Props = FieldProps<FormField.FileArray> & Pick<Input.Props, 'regExp'>;
}

export const FileArrayField: FC<FileArrayInput.Props> = (props) => {
  const { field } = props;

  const [files, setFiles] = useState<FilePrimitive[]>(field.value);

  return files.map((file) => {
    return (
      <div />
    )
  });
};

fieldsModel.register({
  type: FieldType.fileArray,
  component: FileArrayField,
});
