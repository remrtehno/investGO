import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useSaveBankDetailsApi} from 'src/api/companyApi/useSaveBankDetailsApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import type {ProfileForms} from 'src/components/pages/ProfilePage/ProfileForms/ProfileForms';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import s from './RequisitionsForm.scss';
import {useBankDetailsFields} from './useBankDetailsFields';

export declare namespace BankDetailsForm {
  export type Props = ProfileForms.FormProps;
}

export const BankDetailsForm: FC<BankDetailsForm.Props> = (props) => {
  const fields = useBankDetailsFields();
  const {user} = useRecoilValue(userAtom);
  const [, saveBankDetailsApi] = useSaveBankDetailsApi();

  const getValuesFromUser = () => ({
    ...getDefaultFieldValues(fields),
    ...user && user.bankDetails ? user.bankDetails : {},
  } as Omit<User.Passport, 'serial' | 'number'> & { serialNumber: string });

  const initialValues = useMemo(() => getValuesFromUser(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  useEffect(() => {
    if (user && user.passport && !_.isEqual(user.passport, values)) {
      setValues(getValuesFromUser());
    }
  }, [user && user.bankDetails]);

  const onSave = useCallback(() => {
    saveBankDetailsApi({
      account: values.account,
      bank_name: values.bank_name,
      bic: values.bic,
      correspondent_account: values.correspondent_account,
      inn: values.inn,
      kpp: values.kpp,
      owner_name: values.owner_name,
    });
  }, [values]);

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  return (
    <div ref={props.formRef} className={cx(s.RequisitionsForm, 'container')}>
      <Form
        initialValues={initialValues}
        errors={errors}
        values={values}
        onChange={onChange}
        fields={fields}
      >
        <FormTitle>{ props.form.title }</FormTitle>
        <FormRow>
          <Field className='col-12' name='bank_name' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='account' />
          <Field className='col-6' name='owner_name' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='bic' />
          <Field className='col-6' name='correspondent_account' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='inn' />
          <Field className='col-6' name='kpp' />
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
