import cx from 'classnames';
import type {FC} from 'react';
import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

import {useUploadFileApi} from 'src/api/common/useUploadFileApi';
import { useUploadImageApi } from 'src/api/common/UseUploadImageApi';
import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {PhotoSlider} from 'src/components/ui/PhotoSlider';
import {Color} from 'src/contstants/Color';
import {CloseIcon} from 'src/icons/CloseIcon';
import {PhotoIcon} from 'src/icons/PhotoIcon';
import type {FilePrimitive} from 'src/types/FilePrimitive';

import s from './GalleryField.scss';

type Item = FilePrimitive;

export declare namespace GalleryField {
  export type Props = FieldProps<FormField.FileArray>
}

const maxFiles = 8;

export const GalleryField: FC<GalleryField.Props> = (props) => {
  const [uploadedFile, uploadFileApi, uploadApi] = useUploadImageApi();
  const form = useFormModel();
  const {field} = props;
  const value = field.value || [
  ];
  const [isSliderOpened, setIsSliderOpened] = useState(false);
  const [sliderStartImage, setSliderStartImage] = useState(0);

  useEffect(() => {
    if (uploadedFile) {
      uploadApi.resetValue();
      value.push(uploadedFile);
      form.onChange(value, field.name);
    }
  }, [uploadedFile]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 10485760,
    onDrop(acceptedFiles: File[]) {
      if (acceptedFiles.length) {
        const [file] = acceptedFiles;
        uploadFileApi({file});
      }
    },
  });

  function handleSliderClose() {
    setIsSliderOpened(false);
  }

  return (
    <div className={s.galleryField}>
      <div className={cx('row', s.items)}>
        { value.map((item: Item, index: number) => {
          function removeItem(event: any) {
            event.preventDefault();
            event.stopPropagation();
            const newValue = [...value];
            newValue.splice(index, 1);
            form.onChange(newValue, field.name);
          }

          function handleItemClick() {
            setIsSliderOpened(true);
            setSliderStartImage(index);
          }

          if (index >= maxFiles) {
            return null;
          }

          return (
            <div className={cx('col-3')} key={index}>
              <div
                className={s.item}
                style={{backgroundImage: `url(${item.url})`}}
                onClick={handleItemClick}
              >
                <i className={s.closeButton} onClick={removeItem}>
                  <CloseIcon color={Color.black} />
                </i>
              </div>
            </div>
          );
        }) }
        { value.length < maxFiles ? (
          <div className={cx('col-3')}>
            <div
              className={cx(s.item, s.itemEmpty)}
              {...getRootProps()}
            >
              <PhotoIcon />
              <input {...getInputProps()} />
            </div>
          </div>
        ) : null }
      </div>
      { isSliderOpened ? (
        <PhotoSlider images={value} startImageIndex={sliderStartImage} onClose={handleSliderClose} />
      ) : null }
    </div>
  );
};
