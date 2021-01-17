import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

export const useBankDetailsFields = () => {
  return useMemo((): Form.FieldModels => ({
    bank_name: {
      name: 'bank_name',
      type: FieldType.text,
      label: 'Наименование банка получателя',
      validations: [required(), minLength(5)],
    },
    account: {
      name: 'account',
      type: FieldType.text,
      label: 'Номер счета',
      mask: '99999999999999999999',
      validations: [required()],
    },
    owner_name: {
      name: 'owner_name',
      type: FieldType.text,
      label: 'Владелец счета (ФИО)',
      validations: [required(), minLength(3)],
    },
    bic: {
      name: 'bic',
      type: FieldType.text,
      label: 'БИК',
      mask: '999999999',
      validations: [required()],
    },
    correspondent_account: {
      name: 'correspondent_account',
      type: FieldType.text,
      label: 'Корр. счет',
      mask: '99999999999999999999',
      validations: [required()],
    },
    inn: {
      name: 'inn',
      type: FieldType.text,
      label: 'ИНН',
      mask: '9999999999',
      validations: [required()],
    },
    kpp: {
      name: 'kpp',
      type: FieldType.text,
      label: 'КПП',
      mask: '999999999',
      validations: [required()],
    },
  }), []);
};
