import React, {FC, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useUploadFileApi} from "../../../api/common/useUploadFileApi";
import {FileImgIcon} from "../../../icons/files/FileImgIcon";
import {FilePrimitive} from "../../../types/FilePrimitive";
import {Button, ButtonSize, ButtonTheme} from "../Button/Button";
import {Text, TextSize} from "../Text";
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

const AddButtonIcon = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.714844 7H13.4762" stroke="black" strokeWidth="2"/>
      <path d="M7.09375 13.3809L7.09375 0.619507" stroke="black" strokeWidth="2"/>
    </svg>
  );
}

export const FileArrayInput: FC<FileArrayInput.Props> = (props) => {
  const [uploadedFile, uploadFileApi, uploadApi] = useUploadFileApi();

  function getFilesFromProps() {
    return props.files.map((file): Value => {
      return {
        ...file,
        isNew: false
      };
    });
  }

  const [files, setFiles] = useState(getFilesFromProps());

  useEffect(() => {
    setFiles(getFilesFromProps());
  }, [props.files]);

  useEffect(() => {
    if (uploadedFile) {
      uploadApi.resetValue();
      props.onChange(files.map((file) => {
        return file.isNew ? uploadedFile : _.omit(file, 'isNew')
      }), props.name || null)
    }
  }, [uploadedFile, props.onChange, files, props.name])

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 10485760, // 10MB,
    onDrop(acceptedFiles: File[]) {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        setFiles([
          ...files,
          {
            isNew: true,
            original_name: file.name,
          }
        ])
        uploadFileApi({file });
      }
    }
  });

  return (
    <div className={cx('container', s.FileArrayInput)}>
      <div className={cx(s.files, 'row')}>
        {files.map((file, index) => {
          return (
            <div className={cx(s.file, 'col-6')} key={file.isNew ? index : file.id}>
              <FileImgIcon className={s.fileIcon}/>
              <div className={s.fileLabel}>{file.original_name}</div>
            </div>
          );
        })}
      </div>
      <div {...getRootProps()} className={s.addButtonContainer}>
        { props.disabled || props.readonly ? null : (<input {...getInputProps()}/>) }
        <Button
          size={ButtonSize.m}
          theme={ButtonTheme.light}
          onClick={() => null}
        >
          <AddButtonIcon/>
          <Text className={s.addButtonLabel} size={TextSize.body1}>Загрузить файл</Text>
        </Button>
      </div>
    </div>
  )
};
