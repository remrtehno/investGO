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
import s from './FileArrayInput.scss';


type Value = ({ isNew: false } & FilePrimitive) |
  ({ isNew: true, original_name: string, id: string });

export declare namespace FileArrayInput {
  export type Props = {
    files: FilePrimitive[],
    onChange(files: FilePrimitive[], name: string | null): void,

    name?: string | null,
    disabled?: boolean,
    readonly?: boolean,
  }
}

export const FileArrayInput: FC<FileArrayInput.Props> = (props) => {
  const [uploadedFile, uploadFileApi, uploadApi] = useUploadFileApi();

  function getFilesFromProps() {
    return (props.files || []).map((file): Value => ({
      ...file,
      isNew: false,
    }));
  }

  const [files, setFiles] = useState(getFilesFromProps());

  useEffect(() => {
    setFiles(getFilesFromProps());
  }, [props.files]);

  useEffect(() => {
    if (uploadedFile) {
      uploadApi.resetValue();
      props.onChange(files.map((file) => (file.isNew ? uploadedFile : _.omit(file, 'isNew'))), props.name || null);
    }
  }, [uploadedFile, props.onChange, files, props.name]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 10485760, // 10MB,
    onDrop(acceptedFiles: File[]) {
      if (acceptedFiles.length) {
        const [file] = acceptedFiles;
        setFiles([
          ...files,
          {
            isNew: true,
            id: _.uniqueId('__'),
            original_name: file.name,
          },
        ]);
        uploadFileApi({file});
      }
    },
  });

  return (
    <div className={cx('container', s.FileArrayInput)}>
      <div className={cx(s.files, 'row')}>
        { files.map((file) => (
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
                setFiles(files.filter((f) => file.id !== f.id));
                e.preventDefault();
                e.stopPropagation();
              }} />
            </div>
          </div>
        )) }
      </div>
      <div {...getRootProps()} className={s.addButtonContainer}>
        { props.disabled || props.readonly ? null : <input {...getInputProps()} /> }
        <Button
          size={ButtonSize.m}
          theme={ButtonTheme.light}
          onClick={_.noop}
        >
          <AddButtonIcon />
          <Text className={s.addButtonLabel} size={TextSize.body1}>Загрузить файл</Text>
        </Button>
      </div>
    </div>
  );
};
