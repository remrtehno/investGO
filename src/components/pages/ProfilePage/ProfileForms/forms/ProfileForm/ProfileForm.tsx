import _ from 'lodash';
import type {FC} from 'react';
import React, {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {FormRow} from 'src/components/common/Form/FormRow';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import type {ProfileForms} from 'src/components/pages/ProfilePage/ProfileForms/ProfileForms';
import {userAtom} from 'src/recoil/userAtom';

import s from './ProfileForm.scss';

const errors = {};

export declare namespace ProfileForm {

}

export const ProfileForm: FC<ProfileForms.FormProps> = (props) => {
  const {user} = useRecoilValue(userAtom);

  const fields = useMemo((): Form.FieldModels => ({
    email: {
      name: 'email',
      type: FieldType.text,
      label: 'Ваш email',
      disabled: true,
    },
    phone: {
      name: 'phone',
      type: FieldType.text,
      label: 'Номер телефона',
      disabled: true,
    },
  }), []);

  const initialValues = useMemo(() => ({
    ...getDefaultFieldValues(fields),
    ...user ? {email: user.email, phone: user.phone} : {},
  }), [fields, user]);

  return (
    <div ref={props.formRef}>
      <div className='row'>
        <div className='col-12'>
          <div className={s.title}>{ props.form.title }</div>
        </div>
      </div>
      <Form
        values={initialValues}
        errors={errors}
        initialValues={initialValues}
        fields={fields}
        onChange={_.noop}
      >
        <FormRow>
          <Field className='col-sm-12 col-md-6 mb-20px mb-md-0' name='email' />
          <Field className='col-sm-12 col-md-6' name='phone' />
        </FormRow>
      </Form>
    </div>
  );
};
