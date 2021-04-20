import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

import {useUploadFileApi} from 'src/api/common/useUploadFileApi';
import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import type {FieldType} from 'src/components/common/Form/Form';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {PhotoIcon} from 'src/icons/PhotoIcon';
import {FacebookIcon} from 'src/icons/socials/FacebookIcon';
import {Instagram} from 'src/icons/socials/InstagramIcon';
import {LinkedIn} from 'src/icons/socials/LinkedIn';
import {TelegramIcon} from 'src/icons/socials/TelegramIcon';
import {TwitterIcon} from 'src/icons/socials/TwitterIcon';
import {VKIcon} from 'src/icons/socials/VKIcon';
import type {FilePrimitive} from 'src/types/FilePrimitive';
import {downloadFile} from 'src/utils/downloadFile';

import s from './SocialsField.scss';

type Value = ({ isNew: false } & FilePrimitive) |
  ({ isNew: true, original_name: string, id: string, url?: string });

export declare namespace SocialsField {
  /*
   * type Field = FormField.BaseField & {
   *   type: FieldType.custom,
   *   onChange(file: FilePrimitive | null, name: string | null): void,
   * }
   */

  export type Props = FieldProps<FormField.Custom>
}

enum socialNetworks {
  'vk',
  'telegram',
  'fb',
  'linkedin',
  'twitter',
  'instagram',
}

const socials = [
  socialNetworks.vk,
  socialNetworks.telegram,
  socialNetworks.fb,
  socialNetworks.linkedin,
  socialNetworks.twitter,
  socialNetworks.instagram,
];

export const SocialsField: FC<SocialsField.Props> = (props) => {
  const form = useFormModel();
  const {field} = props;

  return (
    <div className={cx(s.socialsField, props.className)}>
      { field.label ? (
        <Text
          className={s.label}
          size={TextSize.caption1}
          color={Color.gray4}
        >
          { field.label }
        </Text>
      ) : null }

      <div className={s.icons}>
        { socials.map((network, index) => {
          return (
            <div className={cx(s.network, s.inactive)} key={index}>
              { network === socialNetworks.vk ? (<VKIcon />) : null }
              { network === socialNetworks.telegram ? (<TelegramIcon />) : null }
              { network === socialNetworks.fb ? (<FacebookIcon />) : null }
              { network === socialNetworks.linkedin ? (<LinkedIn />) : null }
              { network === socialNetworks.twitter ? (<TwitterIcon />) : null }
              { network === socialNetworks.instagram ? (<Instagram />) : null }
            </div>
          );
        }) }
      </div>
    </div>
  );
};
