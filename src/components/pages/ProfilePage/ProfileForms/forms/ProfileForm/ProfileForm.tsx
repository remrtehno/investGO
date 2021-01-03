import React, {FC, useMemo} from 'react';
import {useRecoilValue} from 'recoil';
import {userAtom} from '../../../../../../recoil/userAtom';
import {Form} from '../../../../../common/Form';
import {Field} from '../../../../../common/Form/Field';
import {FieldType} from '../../../../../common/Form/Form';
import _ from 'lodash';
import {FormRow} from '../../../../../common/Form/FormRow';
import {getDefaultFieldValues} from '../../../../../common/Form/getDefaultFieldValues';
import {ProfileForms} from '../../ProfileForms';
import {FormTitle} from '../../../../../common/Form/FormTitle';

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
    <div ref={props.formRef} className='container'>
      <div className='row'>
        <div className='col-12'>
          <FormTitle>{ props.form.title }</FormTitle>
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
          <Field className='col-6' name='email' />
          <Field className='col-6' name='phone' />
        </FormRow>
      </Form>
    </div>
  );
};
