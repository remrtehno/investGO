import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {PhoneArrayField} from 'src/components/pages/ProfilePage/fields/PhoneArrayField';
import {email} from 'src/validations/email';
import {required} from 'src/validations/required';

import {dataAgreementLabel} from './IpForm';

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
        label: 'Дата присвоения ОГРНИП',
        validations: [required()],
      },
      document_registry_file: {
        name: 'document_registry_file',
        type: FieldType.file,
        validations: [(value) => {
          if (value) {
            return null;
          }
          return 'Вы не загрузили документы.';
        }],
      },
      email: {
        name: 'email',
        type: FieldType.text,
        label: 'Адрес электронной почты',
        validations: [required(), email()],
      },
      phones: {
        type: FieldType.custom,
        Field: PhoneArrayField,
        name: 'phones',
        validations: [required()],
        label: 'Контактный номер телефона',
      } as any,
      data_valid: {
        name: 'data_valid',
        type: FieldType.checkbox,
        label: 'Предоставленные данные индивидуального предпринимателя верны.',
        defaultValue: true,
        validations: [required()],
      },
      data_agreement: {
        name: 'data_agreement',
        type: FieldType.checkbox,
        label: dataAgreementLabel(),
        defaultValue: true,
        validations: [required()],
      },
      data_rules: {
        name: 'data_rules',
        type: FieldType.checkbox,
        label: 'Согласен с условиями, направленными на исполнения требований ФЗ No 218-ФЗ «О кредитных историях».',
        defaultValue: true,
        validations: [required()],
      },
    };
  }, []);
};
