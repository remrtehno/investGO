import React, {FC, useMemo} from 'react';
import {Form} from "../../../../../common/Form";
import {Field} from "../../../../../common/Form/Field";
import {FieldType} from "../../../../../common/Form/Form";
import _ from 'lodash';
import {ProfileForms} from "../../ProfileForms";
import {ProfileFormTitle} from "../../ProfileFormTitle";

const initialValues = {
  email: '',
  phone: '',
};

const values = {
  email: 'EgorKluch@gmail.com',
  phone: '89166666666',
};

const errors = {};


export const ProfileForm: FC<ProfileForms.FormProps> = (props) => {
  const fields = useMemo((): Form.FieldModels => {
    return {
      email: {
        name: 'email',
        type: FieldType.text,
        label: 'Ваш email',
        isDisabled: true
      },
      phone: {
        name: 'phone',
        type: FieldType.text,
        label: 'Номер телефона',
        isDisabled: true
      }
    };
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <ProfileFormTitle>{props.form.title}</ProfileFormTitle>
        </div>
      </div>
      <div className='row'>
        <Form
          values={values}
          errors={errors}
          initialValues={initialValues}
          fields={fields}
          onChange={_.noop}
        >
          <Field className='col-6' name='email'/>
          <Field className='col-6' name='phone'/>
        </Form>
      </div>
    </div>
  )
};
