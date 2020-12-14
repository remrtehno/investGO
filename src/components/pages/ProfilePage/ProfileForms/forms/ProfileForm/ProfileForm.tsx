import React, {FC, useMemo} from 'react';
import {useRecoilValue} from "recoil";
import {userState} from "../../../../../../recoil/userState";
import {Form} from "../../../../../common/Form";
import {Field} from "../../../../../common/Form/Field";
import {FieldType} from "../../../../../common/Form/Form";
import _ from 'lodash';
import {FormRow} from "../../../../../common/Form/FormRow";
import {getDefaultFieldValues} from "../../../../../common/Form/getDefaultFieldValues";
import {ProfileForms} from "../../ProfileForms";
import {FormTitle} from "../../../../../common/Form/FormTitle";

const errors = {};

export declare namespace ProfileForm {

}

export const ProfileForm: FC<ProfileForms.FormProps> = (props) => {
  const { user } = useRecoilValue(userState);

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

  const initialValues = useMemo(() => {
    return {
      ...getDefaultFieldValues(fields),
      ...(user ? { email: user.email, phone: '89166613613' } : {})
    };
  }, [fields, user]);

  return (
    <div ref={props.formRef} className='container'>
      <div className='row'>
        <div className='col-12'>
          <FormTitle>{props.form.title}</FormTitle>
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
          <Field className='col-6' name='email'/>
          <Field className='col-6' name='phone'/>
        </FormRow>
      </Form>
    </div>
  )
};
