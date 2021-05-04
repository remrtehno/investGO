import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

import {useUploadFileApi} from 'src/api/common/useUploadFileApi';
import { useUploadImageApi } from 'src/api/common/UseUploadImageApi';
import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import type {FieldType} from 'src/components/common/Form/Form';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {PhotoIcon} from 'src/icons/PhotoIcon';
import type {FilePrimitive} from 'src/types/FilePrimitive';

import s from './BgImageField.scss';

type Value = ({ isNew: false } & FilePrimitive) |
  ({ isNew: true, original_name: string, id: string, url?: string });

export declare namespace BgImageField {
  type Field = FormField.BaseField & {
    type: FieldType.custom,
    onChange(file: FilePrimitive | null, name: string | null): void,
    background?: 'white' | 'default'
  }

  export type Props = FieldProps<FormField.FileArray>
}

export const BgImageField: FC<BgImageField.Props> = (props) => {
  const [uploadedFile, uploadFileApi, uploadApi] = useUploadImageApi();
  const form = useFormModel();
  const {field} = props;
  const value = field.value;

  function getFileFromValue(): Value | null {
    if (!value) {
      return null;
    }

    return {
      ...value,
      isNew: false,
    };
  }

  const [file, setFile] = useState(getFileFromValue());

  useEffect(() => {
    setFile(getFileFromValue());
  }, [value]);

  useEffect(() => {
    if (uploadedFile) {
      uploadApi.resetValue();

      if (!file) {
        form.onChange(null, field.name);
        return;
      }

      form.onChange(file.isNew ? uploadedFile : _.omit(file, 'isNew'), field.name);
    }
  }, [uploadedFile, props.onChange, file, field, value]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 10485760,
    onDrop(acceptedFiles: File[]) {
      if (acceptedFiles.length) {
        const [file] = acceptedFiles;
        setFile({
          isNew: true,
          id: _.uniqueId('__'),
          original_name: file.name,
        });
        uploadFileApi({file});
      }
    },
  });

  return (
    <div
      className={cx(s.bgImageField, field?.background === 'white' && s.bgWhite)}
      {...getRootProps()}
      style={file && file.url ? {backgroundImage: `url(${file?.url})`} : {}}
    >
      <input {...getInputProps()} />
      <div className={s.label}>
        <PhotoIcon />
        { field.label ? (
          <Text size={TextSize.body1} color={Color.gray2}>
            { field.label }
          </Text>
        ) : null }
      </div>
    </div>
  );
};
