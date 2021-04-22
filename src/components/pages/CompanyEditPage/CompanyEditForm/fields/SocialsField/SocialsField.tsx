import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useEffect, useState} from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';

import {SocialNetwork} from './SocialNetwork';
import s from './SocialsField.scss';

export declare namespace SocialsField {
  export type Props = FieldProps<FormField.Custom>
}

export enum socialNetworks {
  vk ='vk',
  telegram ='telegram',
  fb ='fb',
  linkedin ='linkedin',
  twitter ='twitter',
  instagram ='instagram',
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
  const value = field.value || {};

  function handleChange(network: socialNetworks, link: string) {
    const val = {...value};
    val[network] = link;
    form.onChange(val, field.name);
  }

  return (
    <div className={cx(s.socialsField)}>
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
            <SocialNetwork
              network={network}
              link={value[network] || ''}
              key={index}
              onChange={handleChange} />
          );
        }) }
      </div>
    </div>
  );
};
