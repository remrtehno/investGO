import moment from 'moment';
import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {parseDate} from 'src/utils/parseDate';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

import {rulesLabel} from './PassportForm';

function validateAge(value: string) {
  if (moment().diff(moment(parseDate(value)), 'years') < 18) {
    return 'Меньше 18 лет';
  }
  return null;
}

export const usePassportFields = () => useMemo((): Form.FieldModels => ({
  fio: {
    name: 'fio',
    type: FieldType.text,
    label: 'ФИО',
    validations: [required()],
  },
  date_of_birth: {
    name: 'date_of_birth',
    type: FieldType.date,
    label: 'Дата рождения',
    validations: [required(), validateAge],
    maxDate: moment().subtract(18, 'years')
      .toDate(),
    minDate: moment().subtract(100, 'years')
      .toDate(),
  },
  serialNumber: {
    name: 'serialNumber',
    type: FieldType.text,
    label: 'Серия / номер паспорта',
    mask: '9999 999999',
    validations: [required(), (value) => {
      if (value.replace(/[\s_]/g, '').length === 10) {
        return null;
      }
      return 'Обязательное поле';
    }],
  },
  subdivision_code: {
    name: 'subdivision_code',
    type: FieldType.text,
    mask: '999999',
    label: 'Код подразделения',
    validations: [required()],
  },
  date_of_issue: {
    name: 'date_of_issue',
    type: FieldType.date,
    label: 'Дата выдачи',
    maxDate: new Date(),
    validations: [required(), (value, values) => {
      if (!values.date_of_birth) {
        return null;
      }
      if (moment(parseDate(value)).diff(parseDate(values.date_of_birth), 'days') < 0) {
        return 'Меньше даты рождения';
      }
      return null;
    }],
  },
  authority: {
    name: 'authority',
    type: FieldType.text,
    label: 'Кем выдан',
    validations: [required(), minLength(6)],
  },
  place_of_register: {
    name: 'place_of_register',
    type: FieldType.text,
    label: 'Адрес регистрации',
    validations: [required()],
  },
  place_of_residence: {
    name: 'place_of_residence',
    type: FieldType.text,
    label: 'Адрес фактического проживания',
    validations: [required()],
  },
  snils: {
    name: 'snils',
    type: FieldType.text,
    mask: '99999999999',
    label: 'СНИЛС',
    validations: [required()],
  },
  inn: {
    name: 'inn',
    type: FieldType.text,
    mask: '999999999999',
    label: 'ИНН (при наличии)',
    validations: [required()],
  },
  personal_data_documents: {
    name: 'personal_data_documents',
    type: FieldType.fileArray,
    validations: [required()],
  },
  data_valid: {
    name: 'data_valid',
    type: FieldType.checkbox,
    label: 'Предоставленные личные данные физического лица верны.',
    defaultValue: true,
    validations: [required()],
  },
  data_agreement: {
    name: 'data_agreement',
    type: FieldType.checkbox,
    label: 'Я даю согласие на передачу и обработку персональных данных.',
    defaultValue: true,
    validations: [required()],
  },
  data_rules: {
    name: 'data_rules',
    type: FieldType.checkbox,
    label: rulesLabel({}),
    defaultValue: true,
    validations: [required()],
  },

}), []);
