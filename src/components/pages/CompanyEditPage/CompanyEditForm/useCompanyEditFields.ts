import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {EmailArrayField} from 'src/components/pages/ProfilePage/fields/EmailArrayField';
import {PhoneArrayField} from 'src/components/pages/ProfilePage/fields/PhoneArrayField';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

export const useCompanyEditFields = () => {
  return useMemo((): Form.FieldModels => ({
    id: {
      name: 'id',
      type: FieldType.hidden,
    },
    emails: {
      name: 'emails',
      type: FieldType.custom,
      Field: EmailArrayField,
      label: 'Ваш email',
      validations: [required()],
    } as any,
    phones: {
      name: 'phones',
      type: FieldType.custom,
      Field: PhoneArrayField,
      label: 'Номер телефона',
      validations: [required()],
    } as any,
    site: {
      name: 'site',
      type: FieldType.text,
      label: 'Адрес сайта',
      validations: [required()],
    },
    data_valid: {
      name: 'data_valid',
      type: FieldType.checkbox,
      label: 'Верность сведений о проекте и документов к нему.',
      defaultValue: true,
      validations: [required()],
    },
  }), []);
};
