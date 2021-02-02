import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

import {useUploadFileApi} from 'src/api/common/useUploadFileApi';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {CloseIcon} from 'src/icons/CloseIcon';
import {FileImgIcon} from 'src/icons/files/FileImgIcon';
import type {FilePrimitive} from 'src/types/FilePrimitive';
import {downloadFile} from 'src/utils/downloadFile';

import {AddButtonIcon} from './AddButtonIcon';
import s from './FileInput.scss';


type Value = ({ isNew: false } & FilePrimitive) |
  ({ isNew: true, original_name: string, id: string });

export declare namespace FileInput {
  export type Props = {
    file: FilePrimitive | null,
    onChange(file: FilePrimitive | null, name: string | null): void,

    name?: string | null,
    disabled?: boolean,
    readonly?: boolean,
  }
}

export const FileInput: FC<FileInput.Props> = (props) => {
  const [uploadedFile, uploadFileApi, uploadApi] = useUploadFileApi();

  function getFileFromProps(): Value | null {
    if (!props.file) {
      return null;
    }

    return {
      ...props.file,
      isNew: false,
    }
  }

  const [file, setFile] = useState(getFileFromProps());

  useEffect(() => {
    setFile(getFileFromProps());
  }, [props.file]);

  useEffect(() => {
    if (uploadedFile) {
      uploadApi.resetValue();

      if (!file) {
        props.onChange(null, props.name || null);
        return;
      }

      props.onChange(file.isNew ? uploadedFile : _.omit(file, 'isNew'), props.name || null);
    }
  }, [uploadedFile, props.onChange, file, props.name]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 10485760, // 10MB,
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
    <div className={cx('container p-0', s.FileArrayInput)}>
      <div className={cx(s.files, 'row')}>
        { file ? (
          <div
            className={cx(s.file, 'col-6')}
            key={file.id}
            onClick={() => {
              if (file.isNew) {
                return;
              }

              downloadFile(file.url);
            }}
          >
            <FileImgIcon className={s.fileIcon} />
            <div className={s.fileLabel}>{ file.original_name }</div>
            <div className={s.deleteFile}>
              <CloseIcon color='black' onClick={(e) => {
                setFile(null);
                e.preventDefault();
                e.stopPropagation();
              }} />
            </div>
          </div>
        ) : null }
      </div>
      { props.disabled || props.readonly ? null : (
        <div {...getRootProps()} className={s.addButtonContainer} style={{ marginTop: file ? 32 : 0 }}>
          <input {...getInputProps()} />
          <Button
            size={ButtonSize.m}
            theme={ButtonTheme.light}
            onClick={_.noop}
          >
            <AddButtonIcon />
            <Text className={s.addButtonLabel} size={TextSize.body1}>Загрузить файл</Text>
          </Button>
        </div>
      ) }
    </div>
  );
};
