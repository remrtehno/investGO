import type {FC} from 'react';
import React from 'react';

import {FieldType, useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import type {Input} from 'src/components/ui/Input';

import type {FieldProps} from './fieldsModel';
import {fieldsModel} from './fieldsModel';
import {FileInput} from 'src/components/ui/FileArray/FileInput';

export declare namespace FileField {
  export type Props = FieldProps<FormField.FileArray> & Pick<Input.Props, 'regExp'>;
}

export const FileField: FC<FileField.Props> = (props) => {
  const {field} = props;
  const form = useFormModel();

  return (
    <FileInput
      file={field.value}
      name={field.name}
      onChange={form.onChange}
      disabled={field.disabled}
      error={field.error}
    />
  );
};

fieldsModel.register({
  type: FieldType.file,
  component: FileField,
});
