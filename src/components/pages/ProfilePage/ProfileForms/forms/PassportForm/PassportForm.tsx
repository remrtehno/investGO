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
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {Tooltip} from 'src/components/ui/Tooltip/Tooltip';
import {ModerationStatus} from 'src/contstants/ModerationStatus';
import {InfoIcon} from 'src/icons/InfoIcon';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import s from './PassportForm.scss';
import {usePassportFields} from './usePassportFields';

export const rulesLabel:FC = () => {
  return (
    <React.Fragment>
      Я ознакомился с условиями <a className={s.link} href='#'>Правил</a> и всех приложений к ним.
    </React.Fragment>
  );
};

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
          <Field className='col-sm-12 col-md-6 mb-20px mb-md-20px' name='fio' />
          <Field
            className='col-sm-12 col-md-6'
            name='date_of_birth'
            extraValue={getAge(values.date_of_birth)}
          />
        </FormRow>
        <FormRow>
          <Field className='col-sm-12 col-md-6 mb-20px mb-md-20px' name='subdivision_code' />
          <Field className='col-sm-12 col-md-3 mb-20px mb-md-20px' name='serialNumber' />
          <Field className='col-sm-12 col-md-3' name='date_of_issue' />
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
          <Field className='col-sm-12 col-md-6 mb-20px mb-md-20px' name='snils' />
          <Field className='col-sm-12 col-md-6' name='inn' />
        </FormRow>
        <FormRow>
          <div className='col-12'>
            <div className={s.documentsTitle}>
              <Text size={TextSize.subHeadline1} style={{marginTop: 20, marginBottom: 8}}>
                Загрузите документы
                <Tooltip componentIcon={InfoIcon}>
                  <Text size={TextSize.bodyMini} weight={TextWeight.normal}>
                    Допускается загрузка файлов в форматах
                    jpg, jpeg, png, gif, pdf, zip, rar, doc, docx, xls,
                    xlsx, ppt, pps, размер которых
                    не превышает 5 Мб.</Text>
                </Tooltip>
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
          <React.Fragment>
            <FormRow>
              <Field className='col-12' name='data_valid' />
            </FormRow>
            <FormRow>
              <Field className='col-12' name='data_agreement' />
            </FormRow>
            <FormRow>
              <Field className='col-12' name='data_rules' />
            </FormRow>
          </React.Fragment>
        ) : null }
        { user && (!user.passport || user.passport.status === ModerationStatus.declined) ? (
          <FormActions>
            <div className='col-sm-12 col-md-5 col-xl-3'>
              <Button
                theme={ButtonTheme.black}
                size={ButtonSize.m}
                onClick={onContinue}
                disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
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
    <div ref={props.formRef} className={cx(s.PassportForm)}>
      <FormTitle status={user?.passport?.status}>{ props.form.title }</FormTitle>
      { renderContent() }
    </div>
  );
};
