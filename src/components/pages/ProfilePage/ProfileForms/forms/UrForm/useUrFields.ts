import _ from 'lodash';
import moment from 'moment';
import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import type {Form} from 'src/components/common/Form/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {FoundersField} from 'src/components/pages/ProfilePage/fields/FoundersField';
import {OkvedField} from 'src/components/pages/ProfilePage/fields/OkvedField';
import {PhoneArrayField} from 'src/components/pages/ProfilePage/fields/PhoneArrayField';
import {userAtom} from 'src/recoil/userAtom';
import {parseDate} from 'src/utils/parseDate';
import {email} from 'src/validations/email';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';
import {Role} from 'src/contstants/Role';

type Options = {
  isSameAddress: boolean,
  isDirector: boolean
}

export const useUrFields = ({isSameAddress, isDirector}: Options) => {
  const {user} = useRecoilValue(userAtom);

  return useMemo((): Form.FieldModels => {
    if (!user) {
      return {};
    }

    return {
      inn: {
        name: 'inn',
        type: FieldType.text,
        label: 'ИНН',
        mask: _.range(10).map(() => '9').join(''),
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
      ogrn: {
        name: 'ogrn',
        type: FieldType.text,
        label: 'ОГРН',
        mask: _.range(13).map(() => '9').join(''),
        validations: [required()],
      },
      date_issue_ogrn: {
        name: 'date_issue_ogrn',
        type: FieldType.date,
        label: 'Дата присвоения ОГРН',
        validations: [required()],
      },
      document_registry_file: {
        name: 'document_registry_file',
        type: FieldType.file,
        validations: [required()],
      },
      document_rule_file: {
        name: 'document_rule_file',
        type: FieldType.file,
        validations: [required()],
      },
      document_director_approved_file: {
        name: 'document_director_approved_file',
        type: FieldType.file,
        isHidden: !user.roles.includes(Role.borrower),
        validations: [required()],
      },
      director_fio: {
        name: 'director_fio',
        type: FieldType.text,
        label: 'ФИО руководителя',
        validations: [required()],
        isHidden: isDirector
      },
      director_date_of_birth: {
        name: 'director_date_of_birth',
        type: FieldType.date,
        label: 'Дата рождения руководителя',
        validations: [required()],
        isHidden: isDirector
      },
      director_serialNumber: {
        name: 'director_serialNumber',
        type: FieldType.text,
        label: 'Серия / номер паспорта',
        mask: '9999 999999',
        validations: [required(), (value) => {
          if (value.replace(/[\s_]/g, '').length === 10) {
            return null;
          }
          return 'Обязательное поле';
        }],
        isHidden: isDirector
      },
      director_personal_data_documents: {
        name: 'director_personal_data_documents',
        type: FieldType.fileArray,
        validations: [required()],
        isHidden: isDirector,
      },
      director_subdivision_code: {
        name: 'director_subdivision_code',
        type: FieldType.text,
        mask: '999999',
        label: 'Код подразделения',
        validations: [required(), (value) => {
          return value.replace(/_/g, '').length === 6 ? null : 'Обязательное поле';
        }],
        isHidden: isDirector
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
        isHidden: isDirector
      },
      director_authority: {
        name: 'director_authority',
        type: FieldType.text,
        isHidden: isDirector,
        label: 'Кем выдан',
        validations: [required(), minLength(6)],
      },
      director_place_of_register: {
        name: 'director_place_of_register',
        type: FieldType.text,
        isHidden: isDirector,
        label: 'Адрес регистрации руководителя',
        validations: [required()],
      },
      director_place_of_residence: {
        name: 'director_place_of_residence',
        type: FieldType.text,
        isHidden: isDirector,
        label: 'Адрес фактического проживания руководителя',
        validations: [required()],
        disabled: isSameAddress,
      },
      okved: {
        name: 'okved',
        type: FieldType.custom,
        Field: OkvedField,
        isHidden: !user.roles.includes(Role.borrower),
        validations: [required()],
      },
      founders: {
        name: 'founders',
        type: FieldType.custom,
        Field: FoundersField,
        isHidden: !user.roles.includes(Role.borrower),
        validations: [required()],
      },
      date_director_set: {
        name: 'date_director_set',
        type: FieldType.date,
        label: 'Дата назначения (избрания) руководителя',
        validations: [required()],
      },
      additional_info: {
        name: 'additional_info',
        type: FieldType.textArea,
        placeholder: 'Дополнительные сведения',
        isHidden: !user.roles.includes(Role.borrower)
      }
    };
  }, [user, isDirector, isSameAddress]);
};
