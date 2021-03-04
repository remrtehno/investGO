import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useSaveCompanyApi} from 'src/api/companyApi/useSaveCompanyApi';
import { useUserDocuments } from 'src/api/userApi/useUserDocuments';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {ModerationInfo} from 'src/components/common/ModerationInfo';
import {AcceptRules} from 'src/components/pages/ProfilePage/AcceptRules';
import type {ProfileForms} from 'src/components/pages/ProfilePage/ProfileForms/ProfileForms';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {CheckBox} from 'src/components/ui/CheckBox';
import {Text, TextSize} from 'src/components/ui/Text';
import {ModerationStatus} from 'src/contstants/ModerationStatus';
import {roleLabels} from 'src/contstants/rolesLabels';
import {DocumentIcon} from 'src/icons/DocumentIcon';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import s from './IpForm.scss';
import {useIpFields} from './useIpFields';

export declare namespace IpForm {
  export type Props = ProfileForms.FormProps;
}

export const IpForm: FC<IpForm.Props> = (props) => {
  const fields = useIpFields();
  const {user} = useRecoilValue(userAtom);
  const [, saveCompanyApi] = useSaveCompanyApi();
  const [,documents,] = useUserDocuments();
  const [checkBoxes, setCheckBoxes] = useState(user?.company ? [true, true, true] : [false, false, false]);
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
      console.log(errors);
      return;
    }

    if (checkBoxes.find((value) => !value)) {
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


  console.log(documents);
  

  
  return (
    <div ref={props.formRef} className={cx(s.CompanyForm, 'container')}>
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
        <FormTitle>{ props.form.title }</FormTitle>
        <FormRow>
          <Field className='col-6' name='ogrn' />
          <Field className='col-6' name='date_issue_ogrn' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='email' />
        </FormRow>
        <FormRow>
          <Field className='container col-12' name='phones' />
        </FormRow>

        <FormRow>
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
          <div className='col-12'>
            <CheckBox
              style={{marginBottom: 18}}
              value={checkBoxes[0]}
              onChange={(newValue) => setCheckBoxes([newValue, checkBoxes[1], checkBoxes[2]])}
              label={(
                <Text size={TextSize.body0}>
                  Предоставленные данные индивидуального предпринимателя верны.
                </Text>
              )}
            />
            <CheckBox
              style={{marginBottom: 18}}
              value={checkBoxes[1]}
              onChange={(newValue) => setCheckBoxes([checkBoxes[0], newValue, checkBoxes[2]])}
              label={(
                <Text size={TextSize.body0}>
                  Я даю согласие на передачу и обработку введенных данных в рамках <a href='#'>Политики конфиденциальности</a>.
                </Text>
              )}
            />
            <CheckBox
              value={checkBoxes[2]}
              onChange={(newValue) => setCheckBoxes([checkBoxes[0], checkBoxes[1], newValue])}
              label={(
                <Text size={TextSize.body0}>
                  Согласен с условиями, направленными на исполнения требований ФЗ No 218-ФЗ «О кредитных историях».
                </Text>
              )}
            />
          </div>
        </FormRow>
        <FormActions>
          <div className='col-3'>
            <Button
              theme={ButtonTheme.black}
              size={ButtonSize.m}
              onClick={onSave}
            >Сохранить</Button>
          </div>
        </FormActions>
        <Text size={TextSize.h2}>Договоры присоединения</Text>
        { user.company && user.company.status === ModerationStatus.approved ? (
          <div className='row'>
            { user.sign_document.length
              ? user.sign_document.map((typeDoc) => {
                if (typeDoc === 'borrower_accession_agreement') {
                  return (<div className={cx(s.joinDocs, 'col-sm-6')}>
                    <DocumentIcon />
                    Договор на оказание Оператором Платформы услуг по содействию
                    в инвестировании
                  </div>);
                }
                if (typeDoc === 'investor_accession_agreement') {
                  return (<div className={cx(s.joinDocs, 'col-sm-6')}>
                    <DocumentIcon />
                    Договор на оказание Оператором Платформы услуг по содействию
                    в инвестировании
                  </div>);
                }
              }) : null }
          </div>
        ) : null }
      </Form>
      ) }
    </div>
  );
};
