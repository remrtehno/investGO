import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {required} from 'src/validations/required';
import {email} from 'src/validations/email';
import {PhoneArrayField} from 'src/components/pages/ProfilePage/fields/PhoneArrayField';

export const useIpFields = () => {
  return useMemo((): Form.FieldModels => {
    return {
      ogrn: {
        name: 'ogrn',
        type: FieldType.text,
        label: 'ОГРНИП',
        mask: '999999999999999',
        validations: [required()],
      },
      date_issue_ogrn: {
        name: 'date_issue_ogrn',
        type: FieldType.date,
        label: 'Дата приссвоения ОГРНИП',
        validations: [required()],
      },
      document_registry_file: {
        name: 'document_registry_file',
        type: FieldType.file,
        validations: [required()],
      },
      email: {
        name: 'email',
        type: FieldType.text,
        label: 'Email',
        validations: [required(), email()],
      },
      phones: {
        type: FieldType.custom,
        Field: PhoneArrayField,
        name: 'phones',
        validations: [required()],
        label: 'Контактный номер телефона',
      } as any,
    };
  }, []);
};
