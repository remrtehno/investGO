import _ from 'lodash';
import moment from 'moment';
import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import type {Form} from 'src/components/common/Form/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {phoneArrayFieldType} from 'src/components/pages/ProfilePage/fields/phoneArrayField/phoneArrayField';
import {Role} from 'src/contstants/Role';
import {userAtom} from 'src/recoil/userAtom';
import {parseDate} from 'src/utils/parseDate';
import {email} from 'src/validations/email';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

export const useUrFields = () => {
  const {user} = useRecoilValue(userAtom);

  return useMemo((): Form.FieldModels => {
    return {
      inn: {
        name: 'inn',
        type: FieldType.text,
        label: 'ИНН',
        mask: _.range(10).map(() => '9')
          .join(''),
        validations: [required()],
      },
      snils: {
        name: 'snils',
        type: FieldType.text,
        label: 'СНИЛС',
        mask: _.range(11).map(() => '9')
          .join(''),
        validations: [required()],
      },
      name: {
        name: 'name',
        type: FieldType.text,
        label: 'Наименование юридического лица',
        validations: [required()],
      },
      place: {
        name: 'place',
        type: FieldType.text,
        label: 'Адрес места нахождения',
        validations: [required()],
      },
      postal_address: {
        name: 'postal_address',
        type: FieldType.text,
        label: 'Почтовый адрес (адрес получения корреспонденции)',
        validations: [required()],
      },
      email: {
        name: 'email',
        type: FieldType.text,
        label: 'Email',
        validations: [required(), email()],
      },
      phone: {
        type: phoneArrayFieldType,
        name: 'phone',
        validations: [required()],
        label: 'Контактный номер телефона',
      } as any,
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
      },
      document_registry_file: {
        name: 'document_registry_file',
        type: FieldType.fileArray,
        isHidden: !user?.roles.includes(Role.ip),
      },
      director_fio: {
        name: 'director_fio',
        type: FieldType.text,
        label: 'ФИО',
        validations: [required()],
      },
      director_date_of_birth: {
        name: 'director_fio',
        type: FieldType.date,
        label: 'Дата рождения',
        validations: [required()],
      },
      director_serial: {
        name: 'director_serial',
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
      director_subdivision_code: {
        name: 'director_subdivision_code',
        type: FieldType.text,
        mask: '999999',
        label: 'Код подразделения',
        validations: [required()],
      },
      director_date_of_issue: {
        name: 'director_date_of_issue',
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
      director_authority: {
        name: 'director_authority',
        type: FieldType.text,
        label: 'Кем выдан',
        validations: [required(), minLength(6)],
      },
      director_place_of_register: {
        name: 'director_place_of_register',
        type: FieldType.text,
        label: 'Адрес регистрации',
        validations: [required()],
      },
      director_place_of_residence: {
        name: 'director_place_of_residence',
        type: FieldType.text,
        label: 'Адрес фактического проживания',
        validations: [required()],
      },
    };
  }, [user]);
};
