import type {FC} from 'react';
import React from 'react';

import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {FileArrayInput} from 'src/components/ui/FileArrayInput/FileArrayInput';
import type {Input} from 'src/components/ui/Input';

import type {FieldProps} from './fieldsModel';
import {fieldsModel} from './fieldsModel';

export declare namespace FileArrayField {
  export type Props = FieldProps<FormField.FileArray> & Pick<Input.Props, 'regExp'>;
}

export const FileArrayField: FC<FileArrayField.Props> = (props) => {
  const {field} = props;
  const form = useFormModel();

  return (
    <FileArrayInput
      files={field.value}
      name={field.name}
      onChange={form.onChange}
      disabled={field.disabled}
    />
  );
};

fieldsModel.register({
  type: FieldType.fileArray,
  component: FileArrayField,
});
