import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useSaveCompanyApi} from 'src/api/companyApi/useSaveCompanyApi';
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
import {ModerationStatus} from 'src/contstants/ModerationStatus';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import s from './IpForm.scss';
import {useIpFields} from './useIpFields';

export const dataAgreementLabel:FC = () => {
  return (
    <React.Fragment>
      Я даю согласие на передачу и обработку введенных данных в рамках <a href='#'>Политики конфиденциальности</a>.
    </React.Fragment>
  );
};

export declare namespace IpForm {
  export type Props = ProfileForms.FormProps;
}

export const IpForm: FC<IpForm.Props> = (props) => {
  const fields = useIpFields();
  const {user} = useRecoilValue(userAtom);
  const [, saveCompanyApi] = useSaveCompanyApi();
  const formApiRef = useRef<Form.Api | null>(null);

  const getValuesFromUser = () => ({
    ...getDefaultFieldValues(fields),
    ...user && user.company && user.company ? {
      ...user.company,
      email: user.company.emails && user.company.emails[0],
    } : {},
  } as Omit<User.Passport, 'serial' | 'number'> & { serialNumber: string });

  const initialValues = useMemo(() => getValuesFromUser(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  useEffect(() => {
    if (user && user.passport && !_.isEqual(user.passport, values)) {
      setValues(getValuesFromUser());
    }
  }, [user && user.company]);

  const onSave = useCallback(() => {
    if (!formApiRef.current) {
      return;
    }

    formApiRef.current.submit();
    if (!formApiRef.current.isValid) {
      return;
    }

    saveCompanyApi({
      id: values.id,
      ogrn: values.ogrn,
      date_issue_ogrn: values.date_issue_ogrn,
      document_registry_file: values.document_registry_file,
      phones: values.phones,
      emails: [values.email],

    } as any);
  }, [values, errors]);

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div ref={props.formRef} className={cx(s.CompanyForm)}>
      { user.company?.status === ModerationStatus.waiting || user.company?.status === ModerationStatus.filled ? (
        <ModerationInfo />
      ) : (<Form
        formApiRef={formApiRef}
        initialValues={initialValues}
        fields={fields}
        errors={errors}
        values={values}
        onChange={onChange}
      >
        <FormTitle status={user.company?.status}>
          { props.form.longTitle }
        </FormTitle>
        <FormRow>
          <Field className='col-sm-12 col-md-6' name='ogrn' />
          <Field className='col-sm-12 col-md-6' name='date_issue_ogrn' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='email' />
        </FormRow>
        <FormRow>
          <Field className='container col-12' name='phones' />
        </FormRow>

        <FormRow className={s.uploadFileSection}>
          <div className='col-12'>
            <Text size={TextSize.subHeadline1} className={s.title}>Выгрузка из ЕГРИП</Text>
            <Text size={TextSize.body0} className={s.fieldDescription}>
              Выписка или копия выписки из единого государственного реестра индивидуальных предпринимателей,
              выданной не ранее чем за тридцать дней до даты регистрации на сайте Оператора Платформы (Платформе).
            </Text>
            <Field name='document_registry_file' />
          </div>
        </FormRow>
        <FormRow>
          <Field className='col-12' name='data_valid' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='data_agreement' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='data_rules' />
        </FormRow>
        <FormActions>
          <div className='col-sm-12 col-md-5 col-xl-3'>
            <Button
              theme={ButtonTheme.black}
              size={ButtonSize.m}
              onClick={onSave}
            >Сохранить</Button>
          </div>
        </FormActions>
      </Form>
      ) }
    </div>
  );
};
