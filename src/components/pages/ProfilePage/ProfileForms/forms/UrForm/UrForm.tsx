import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import 'src/components/pages/ProfilePage/fields/PhoneArrayField';
import {useSaveCompanyApi} from 'src/api/companyApi/useSaveCompanyApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import type {ProfileForms} from 'src/components/pages/ProfilePage/ProfileForms/ProfileForms';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {CheckBox} from 'src/components/ui/CheckBox';
import {useLatestRef} from 'src/hooks/useLatestRef';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import s from './UrForm.scss';
import {useUrFields} from './useUrFields';
import {Text, TextSize} from 'src/components/ui/Text';
import {ModerationStatus} from 'src/contstants/ModerationStatus';
import {ModerationInfo} from 'src/components/common/ModerationInfo';
import {AcceptRules} from 'src/components/pages/ProfilePage/AcceptRules';

export declare namespace UrForm {
  export type Props = ProfileForms.FormProps;
}

export const UrForm: FC<UrForm.Props> = (props) => {
  const {user} = useRecoilValue(userAtom);
  const [, saveCompanyApi] = useSaveCompanyApi();
  const [isDirector, setIsDirector] = useState(true);
  const [isSameAddress, setIsSameAddress] = useState(true);
  const fields = useUrFields({isSameAddress, isDirector});
  const [checkBoxes, setCheckBoxes] = useState(user?.company ? [true, true, true] : [false, false, false]);
  const formApiRef = useRef<Form.Api | null>(null);

  const getValuesFromUser = () => ({
    ...getDefaultFieldValues(fields),
    ...user && user.company && user.company ? {
      ...user.company,
      document_registry_file: user.company.document_registry_file,
      email: user.company.emails[0]
    } : {},
  } as Omit<User.Passport, 'serial' | 'number'> & { serialNumber: string });

  const initialValues = useMemo(() => getValuesFromUser(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});
  const valuesRef = useLatestRef(values);

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
      console.error('Validation errors', errors);
      return;
    }

    if (checkBoxes.find((value) => !value)) {
      return;
    }

    const {
      email,
      director_authority,
      director_date_of_birth,
      director_date_of_issue,
      director_fio,
      director_serialNumber,
      director_personal_data_documents,
      director_place_of_register,
      director_place_of_residence,
      director_subdivision_code,
      founders,
      director_passport_id,
      ...saveValues
    } = values;

    const payload: any = {
      ...saveValues,
      emails: [email],
      user_is_director: isDirector,
      founders: founders.map((founder: any) => {
        return {
          ...founder,
          percent: Number(founder.percent)
        }
      }),
      director: isDirector ? null : {
        authority: director_authority,
        date_of_birth: director_date_of_birth,
        date_of_issue: director_date_of_issue,
        fio: director_fio,
        number: director_serialNumber.slice(-6),
        serial: director_serialNumber.slice(0, 4),
        personal_data_documents: director_personal_data_documents,
        place_of_register: director_place_of_register,
        place_of_residence: director_place_of_residence,
        subdivision_code: director_subdivision_code,
      },
    } as any;

    saveCompanyApi(payload);
  }, [values, isDirector, errors]);

  useEffect(() => {
    if (!isSameAddress) {
      return;
    }

    setValues({
      ...valuesRef.current,
      director_place_of_residence: valuesRef.current.director_place_of_register,
    });
  }, [values.director_place_of_register, isSameAddress]);

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div ref={props.formRef} className={cx(s.CompanyForm, 'container')}>
      <FormTitle
        style={{ marginTop: 60 }}
        status={user.company?.status}
      >{ props.form.title }</FormTitle>

      { user.company?.status === ModerationStatus.waiting || user.company?.status === ModerationStatus.filled ? (
        <ModerationInfo/>
      ) : (
        <Form
          initialValues={initialValues}
          fields={fields}
          errors={errors}
          values={values}
          onChange={onChange}
          formApiRef={formApiRef}
        >
          <FormRow>
            <Field className='container col-12' name='name' />
          </FormRow>
          <FormRow>
            <Field className='col-6' name='ogrn' />
            <Field className='col-6' name='date_issue_ogrn' />
          </FormRow>
          <FormRow>
            <Field className='container col-12' name='place' />
          </FormRow>
          <FormRow>
            <Field className='container col-12' name='postal_address' />
          </FormRow>
          <FormRow>
            <Field className='col-12' name='inn' />
          </FormRow>
          <FormRow>
            <Field className='col-12' name='email' />
          </FormRow>
          <FormRow>
            <Field className='container col-12' name='phones' />
          </FormRow>
          <FormRow>
            <div className='col-12'>
              <CheckBox
                value={isDirector}
                onChange={() => setIsDirector(!isDirector)}
                label='Я являюсь руководителем компании'
              />
            </div>
          </FormRow>
          { isDirector ? (
            <FormRow>
              <Field className='col-6' name='date_director_set' />
            </FormRow>
          ) : (
            <Fragment>
              <FormRow>
                <Field className='col-6' name='director_fio' />
                <Field className='col-6' name='director_date_of_birth' />
              </FormRow>
              <FormRow>
                <Field className='col-12' name='director_place_of_register' />
              </FormRow>
              <FormRow>
                <CheckBox
                  className='col-12'
                  label='Совпадает с адресом фактического проживания'
                  onChange={() => setIsSameAddress(!isSameAddress)}
                  value={isSameAddress}
                />
              </FormRow>
              <FormRow>
                <Field className='col-12' name='director_place_of_residence' />
              </FormRow>
              <FormRow>
                <Field className='col-6' name='director_serialNumber' />
                <Field className='col-3' name='director_subdivision_code' />
                <Field className='col-3' name='director_date_of_issue' />
              </FormRow>
              <FormRow>
                <Field className='col-12' name='director_authority' />
              </FormRow>
              <FormRow>
                <Field className='col-6' name='date_director_set' />
              </FormRow>
              <FormRow>
                <div className='col-12'>
                  <div className={s.documentsTitle}>
                    <Text size={TextSize.subHeadline1} style={{ marginTop: 20, marginBottom: 8 }}>
                      Загрузите документы
                    </Text>
                    <div>
                      — Копию документа, удостоверяющего личность физического лица (лицевая сторона, а также страница
                      с адресом регистрации по месту жительства).
                    </div>
                  </div>
                  <Field name='director_personal_data_documents' />
                </div>
              </FormRow>
            </Fragment>
          ) }
          <FormRow>
            <div className='col-12'>
              <Text size={TextSize.subHeadline1} className={s.title}>Выгрузка из ЕГРЮЛ</Text>
              <Text size={TextSize.body0} className={s.fieldDescription}>
                Выписка или копия выписки из единого государственного реестра юридических лиц, выданной не ранее чем за
                  тридцать дней до даты регистрации на сайте Оператора Платформы (Платформе).
              </Text>
              <Field name='document_registry_file' />
            </div>
          </FormRow>
          <FormRow>
            <div className='col-12'>
              <Text size={TextSize.subHeadline1} className={s.title}>Копия устава юридического лица</Text>
              <div className={s.fieldDescription}>
                Загрузите копию устава юридического лица.
              </div>
              <Field name='document_rule_file' />
            </div>
          </FormRow>
          <FormRow>
            <div className='col-12'>
              <Text size={TextSize.subHeadline1} className={s.title}>Документ о полномочиях</Text>
              <Text size={TextSize.body0} className={s.fieldDescription}>
                Копии документов, подтверждающих полномочия руководителя.
              </Text>
              <Field name='document_director_approved_file' />
            </div>
          </FormRow>

          { fields.founders.isHidden ? null : (
            <Fragment>
              <Text size={TextSize.subHeadline1} className={s.title}>Учредители</Text>
              <FormRow>
                <div className='col-12'>
                  <Text size={TextSize.body0} className={s.fieldDescription}>
                    Укажите сведения о лицах, имеющих право распоряжаться не менее чем 10% голосов в высшем органе
                    управления юридического лица, если таким лицом является корпорация.
                  </Text>
                  <Field name='founders' />
                </div>
              </FormRow>
            </Fragment>
          ) }

          { fields.okved.isHidden ? null : (
            <Fragment>
              <Text size={TextSize.subHeadline1} className={s.title}>Деятельность</Text>
              <FormRow>
                <div className='col-12'>
                  <Text size={TextSize.body0} className={s.fieldDescription}>
                    Укажите основные виды деятельности.
                  </Text>
                  <Field name='okved' />
                </div>
              </FormRow>
            </Fragment>
          ) }

          { fields.additional_info.isHidden ? null : (
            <Fragment>
              <Text size={TextSize.subHeadline1} className={s.title}>Дополнительные сведения</Text>
              <FormRow>
                <div className='col-12'>
                  <Text size={TextSize.body0} className={s.fieldDescription}>
                    Укажите сведения о фактах (событиях, действиях), которые могут оказать существенное влияние на исполнение лицом, привлекающим инвестиции, обязательств перед инвесторами.
                  </Text>
                  <Field name='additional_info' />
                </div>
              </FormRow>
            </Fragment>
          ) }

          <FormRow>
            <div className='col-12'>
              <CheckBox
                style={{ marginBottom: 18 }}
                value={checkBoxes[0]}
                onChange={(newValue) => setCheckBoxes([newValue, checkBoxes[1], checkBoxes[2]])}
                label={(
                  <Text size={TextSize.body0}>
                    Предоставленные данные юридического лица верны.
                  </Text>
                )}
              />
              <CheckBox
                style={{ marginBottom: 18 }}
                value={checkBoxes[1]}
                onChange={(newValue) => setCheckBoxes([checkBoxes[0], newValue, checkBoxes[2]])}
                label={(
                  <Text size={TextSize.body0}>
                    Я даю согласие на передачу и обработку введенных данных в рамках <a onClick={(e) => e.stopPropagation()} href='#'>Политики конфиденциальности</a>.
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
          { user.company && user.company.status === ModerationStatus.approved ? (
            <AcceptRules/>
          ) : null }
        </Form>
      ) }
    </div>
  );
};
