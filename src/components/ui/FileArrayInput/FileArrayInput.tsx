import React, {FC, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {useUploadFileApi} from '../../../api/common/useUploadFileApi';
import {FileImgIcon} from '../../../icons/files/FileImgIcon';
import {FilePrimitive} from '../../../types/FilePrimitive';
import {Button, ButtonSize, ButtonTheme} from '../Button/Button';
import {Text, TextSize} from '../Text';
import {AddButtonIcon} from './AddButtonIcon';
import s from './FileArrayInput.scss';
import _ from 'lodash';
import cx from 'classnames';


type Value = ({ isNew: false } & FilePrimitive) |
  ({ isNew: true, original_name: string });

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
        { files.map((file, index) => (
          <div className={cx(s.file, 'col-6')} key={file.isNew ? index : file.id}>
            <FileImgIcon className={s.fileIcon} />
            <div className={s.fileLabel}>{ file.original_name }</div>
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
