import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useSavePassportApi} from 'src/api/passportApi/useSavePassportApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {ModerationInfo} from 'src/components/common/ModerationInfo';
import type {ProfileForms} from 'src/components/pages/ProfilePage/ProfileForms/ProfileForms';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {CheckBox} from 'src/components/ui/CheckBox';
import {Text, TextSize} from 'src/components/ui/Text';
import {ModerationStatus} from 'src/contstants/ModerationStatus';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import s from './PassportForm.scss';
import {usePassportFields} from './usePassportFields';

export declare namespace PassportForm {
  export type Props = ProfileForms.FormProps;
}

export const PassportForm: FC<PassportForm.Props> = (props) => {
  const [, savePassportApi] = useSavePassportApi();
  const {user} = useRecoilValue(userAtom);
  const fields = usePassportFields();
  const formApiRef = useRef<Form.Api | null>(null);
  const [checkBoxes, setCheckBoxes] = useState([false, false, false]);

  const getValuesFromPassport = () => ({
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
    if (user && user.passport && !_.isEqual(user.passport, values)) {
      setValues(getValuesFromPassport());
    }
  }, [user && user.passport]);

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  const onContinue = useCallback(() => {
    if (!formApiRef.current) {
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
  }, [values, savePassportApi]);


  const getAge = (date_of_birth: string): string | null => {
    const birthday = new Date(date_of_birth);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 1 || !date_of_birth) {
      return null;
    }
    if (age === 1) {
      return `${age} год`;
    }
    if (age < 5) {
      return `${age} года`;
    }
    return `${age} лет`;
  };

  function renderForm() {
    return (
      <Form
        initialValues={initialValues}
        fields={fields}
        onChange={onChange}
        errors={errors}
        values={values}
        formApiRef={formApiRef}
        disabled={Boolean(user && user.passport && user.passport.status !== ModerationStatus.declined)}
      >
        <FormRow>
          <Field className='col-6' name='fio' />
          <Field
            className='col-6'
            name='date_of_birth'
            extraValue={getAge(values.date_of_birth)}
          />
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
            <div className={s.documentsTitle}>
              <Text size={TextSize.subHeadline1} style={{marginTop: 20, marginBottom: 8}}>
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
        { user && (!user.passport || user.passport.status !== ModerationStatus.approved) ? (
          <div>
            <CheckBox
              style={{marginBottom: 20}}
              value={checkBoxes[0]}
              onChange={(checked) => setCheckBoxes([checked, checkBoxes[1], checkBoxes[2]])}
              label={
                'Предоставленные личные данные физического лица верны.'
              } />
            <CheckBox
              style={{marginBottom: 20}}
              value={checkBoxes[1]}
              onChange={(checked) => setCheckBoxes([checkBoxes[0], checked, checkBoxes[2]])}
              label={
                'Я даю согласие на передачу и обработку персональных данных.'
              } />
            <CheckBox
              style={{marginBottom: 20}}
              value={checkBoxes[2]}
              onChange={(checked) => setCheckBoxes([checkBoxes[0], checkBoxes[1], checked])}
              label={
                <div>Я ознакомился с условиями <a className={s.link} href='#'>Правил</a> и всех приложений к ним.</div>
              } />
          </div>
        ) : null }
        { user && (!user.passport || user.passport.status === ModerationStatus.declined) ? (
          <FormActions>
            <div className='col-3'>
              <Button
                theme={ButtonTheme.black}
                size={ButtonSize.m}
                onClick={onContinue}
              >Продолжить</Button>
            </div>
          </FormActions>
        ) : null }
      </Form>
    );
  }

  function renderModerationInfo() {
    return (
      <ModerationInfo />
    );
  }

  function renderContent() {
    if (!user) {
      return null;
    }

    if (user.passport?.status !== 'filled') {
      return renderForm();
    }

    return renderModerationInfo();
  }

  return (
    <div ref={props.formRef} className={cx(s.PassportForm, 'container')}>
      <FormTitle status={user?.passport?.status}>{ props.form.title }</FormTitle>
      { renderContent() }
    </div>
  );
};
