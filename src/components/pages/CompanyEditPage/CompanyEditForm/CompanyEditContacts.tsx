import type {FC} from 'react';
import React from 'react';

import {Field} from 'src/components/common/Form/Field';
import {FormRow} from 'src/components/common/Form/FormRow';
import {Text, TextSize} from 'src/components/ui/Text';

import s from './CompanyEditForm.scss';

export declare namespace CompanyEditContacts {
  export type Props = {}
}

export const CompanyEditContacts: FC<CompanyEditContacts.Props> = (props) => {
  return (
    <section id='contacts-section'>
      <Text size={TextSize.h2} className={s.sectionHeader}>Контактные данные</Text>
      <FormRow>
        <Field className='col-6' name='email' />
        <Field className='col-6' name='phone' />
      </FormRow>
      <FormRow>
        <Field className='col-6' name='site' />
        <Field className='col-6' name='link' />
      </FormRow>
    </section>
  );
};
