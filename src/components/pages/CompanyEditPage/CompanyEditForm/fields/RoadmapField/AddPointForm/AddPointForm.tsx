import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {useConfirmPhoneCode} from 'src/api/userApi/useConfirmPhoneCode';
import {useSendPhoneCode} from 'src/api/userApi/useSendPhoneCode';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {Color} from 'src/contstants/Color';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

import s from './AddPointForm.scss';

const fields: Form.FieldModels = {
  name: {
    name: 'name',
    type: FieldType.text,
    validations: [required(), minLength(3)],
    label: 'Название',
  },
  description: {
    name: 'description',
    type: FieldType.textArea,
    validations: [required(), minLength(3)],
    label: 'Описание',
  },
};

const initialValues: AddPointForm.Values = {
  name: '',
  description: '',
};

export declare namespace AddPointForm {
  export type Props = {
    onAddPoint(point: Values): void
    /*
     * phone: string,
     * isUserExists?: boolean,
     * onConfirm(code?: string): void,
     * onClose(): void,
     */
  };

  export type Values = {
    name: string,
    description: string,
  };
}

export const AddPointForm: FC<AddPointForm.Props> = (props) => {
  const [values, setValues] = useState<AddPointForm.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});
  const formApiRef = useRef<Form.Api | null>(null);

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  function handleSubmit() {
    props.onAddPoint(values);
  }

  return (
    <Form
      initialValues={initialValues}
      values={values}
      errors={errors}
      fields={fields}
      onChange={onChange}
      formApiRef={formApiRef}
      onSubmit={handleSubmit}
    >
      <FormRow>
        <Field className={s.field} name='name' />
      </FormRow>
      <FormRow>
        <Field className={s.field} name='description' />
      </FormRow>
      <FormActions className='m-0'>
        <div className='col-sm-12 col-md-6 col-xl-4'>
          <Button
            theme={ButtonTheme.black}
            size={ButtonSize.m}
            disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
          >Добавить</Button>
        </div>
      </FormActions>
    </Form>
  );
};
