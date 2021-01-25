import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
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

export declare namespace UrForm {
  export type Props = ProfileForms.FormProps;
}

export const UrForm: FC<UrForm.Props> = (props) => {
  const {user} = useRecoilValue(userAtom);
  const [, saveCompanyApi] = useSaveCompanyApi();
  const [isDirector, setIsDirector] = useState(true);
  const [isSameAddress, setIsSameAddress] = useState(true);
  const fields = useUrFields({isSameAddress});

  const getValuesFromUser = () => ({
    ...getDefaultFieldValues(fields),
    ...user && user.company && user.company ? {
      ...user.company,
      document_registry_file: [user.company.document_registry_file],
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
    saveCompanyApi({
      ogrn: values.ogrn,
      date_issue_ogrn: values.date_issue_ogrn,
      document_registry_file: values.document_registry_file,
    });
  }, [values]);

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

  return (
    <div ref={props.formRef} className={cx(s.CompanyForm, 'container')}>
      <Form
        initialValues={initialValues}
        fields={fields}
        errors={errors}
        values={values}
        onChange={onChange}
      >
        <FormTitle>{ props.form.title }</FormTitle>
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
          <Field className='container col-12' name='phone' />
        </FormRow>
        <CheckBox
          value={isDirector}
          onChange={() => setIsDirector(!isDirector)}
          label='Я являюсь руководителем компании'
        />
        { isDirector ? (
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
          </Fragment>
        ) : null }
        <FormRow>
          <Field className='col-6' name='date_director_set' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='document_registry_file' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='okved' />
        </FormRow>
        <FormTitle className={s.title}>Учредители</FormTitle>
        <FormRow>
          <Field className='col-12' name='founders' />
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
      </Form>
    </div>
  );
};
