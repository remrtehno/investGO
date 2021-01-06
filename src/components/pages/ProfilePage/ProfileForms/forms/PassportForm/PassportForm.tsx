import cx from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useGetPassport} from 'src/api/passportApi/useGetPassport';
import {useSavePassport} from 'src/api/passportApi/useSavePassport';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {FormStatus} from 'src/components/common/Form/FormTitle/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {minLength} from 'src/components/common/Form/validations/minLength';
import {required} from 'src/components/common/Form/validations/required';
import type {ProfileForms} from 'src/components/pages/ProfilePage/ProfileForms/ProfileForms';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';
import {parseDate} from 'src/utils/parseDate';

import s from './PassportForm.scss';
import {TimeIcon} from './TimeIcon';

export declare namespace PassportForm {
  export type Props = ProfileForms.FormProps;
}

function validateAge(value: string) {
  if (moment().diff(moment(parseDate(value)), 'years') < 18) {
    return 'Меньше 18 лет';
  }
  return null;
}

const useFields = () => useMemo((): Form.FieldModels => ({
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
}), []);

export const PassportForm: FC<PassportForm.Props> = (props) => {
  const [, getPassportApi] = useGetPassport();
  const [, savePassportApi] = useSavePassport();
  const {user} = useRecoilValue(userAtom);
  const fields = useFields();
  const formApiRef = useRef<Form.Api | null>(null);

  const getValuesFromPassport = () => ({
    // ...{"fio":"аыаыв","date_of_birth":"20.04.1991", "serialNumber":"3243232433","date_of_issue":"20.04.1991","authority":"sfsfsdf","place_of_register":"sdsdfsd","place_of_residence":"dsfsdfs","snils":"42344234233","inn":"2434234333","personal_data_documents":[]},
    ...getDefaultFieldValues(fields),
    ...user && user.passport ? {
      ...user.passport,
      serialNumber: `${user.passport.serial} ${user.passport.number}`,
    } : {},
  } as Omit<User.Passport, 'serial' | 'number'> & { serialNumber: string });

  const initialValues = useMemo(() => getValuesFromPassport(), [fields]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && !user.passport) {
      getPassportApi();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.passport && !_.isEqual(user.passport, values)) {
      setValues(getValuesFromPassport());
    }
  }, [user && user.passport]);

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  const onContinue = useCallback(() => {
    if (!user || !formApiRef.current) {
      return;
    }

    formApiRef.current.submit();
    if (!formApiRef.current.isValid) {
      return;
    }

    const serial = values.serialNumber.slice(0, 4);
    const number = values.serialNumber.slice(-6);

    savePassportApi({
      ..._.omit(values, 'serialNumber'),
      serial,
      number,
    });

    if (user.passport && !user.passport.is_approved) {
      const serial = values.serialNumber.slice(0, 4);
      const number = values.serialNumber.slice(-6);

      savePassportApi({
        ..._.omit(values, 'serialNumber'),
        serial,
        number,
      });
    }
  }, [user, values, savePassportApi]);

  function renderForm() {
    return (
      <Form
        initialValues={initialValues}
        fields={fields}
        onChange={onChange}
        errors={errors}
        values={values}
        formApiRef={formApiRef}
      >
        <FormRow>
          <Field className='col-6' name='fio' />
          <Field className='col-6' name='date_of_birth' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='subdivision_code' />
          <Field className='col-3' name='serialNumber' />
          <Field className='col-3' name='date_of_issue' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='authority' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='place_of_register' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='place_of_residence' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='snils' />
          <Field className='col-6' name='inn' />
        </FormRow>
        <FormRow>
          <div className='col-12'>
            <div className={s.documentsTitme}>
              <Text size={TextSize.subHeadline1}>
                Загрузите документы
              </Text>
              <div>
                — Копию документа, удостоверяющего личность физического лица (лицевая сторона, а также страница
                с адресом регистрации по месту жительства).
              </div>
            </div>
            <Field name='personal_data_documents' />
          </div>
        </FormRow>
        <FormActions>
          <div className='col-3'>
            <Button
              theme={ButtonTheme.black}
              size={ButtonSize.m}
              onClick={onContinue}
            >Продолжить</Button>
          </div>
        </FormActions>
      </Form>
    );
  }

  function renderModerationInfo() {
    return (
      <div className={s.moderationInfo}>
        <TimeIcon className={s.moderationIcon} />
        <Text size={TextSize.body2}>
          Ожидайте. Ваши данные в обработке. Это может занять до 15 минут. Вы получите СМС после ее завершения проверки.
        </Text>
      </div>
    );
  }

  function getStatus() {
    if (!user || !user.passport) {
      return null;
    }

    return user.passport.is_approved ? FormStatus.moderated : FormStatus.moderation;
  }

  function renderContent() {
    if (!user) {
      return null;
    }

    if (!user.passport || user.passport.is_approved) {
      return renderForm();
    }

    return renderModerationInfo();
  }

  return (
    <div ref={props.formRef} className={cx(s.PassportForm, 'container')}>
      <FormTitle status={getStatus()}>{ props.form.title }</FormTitle>
      { renderContent() }
    </div>
  );
};
