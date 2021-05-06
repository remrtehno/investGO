import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import { FormTitle } from 'src/components/common/Form/FormTitle';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
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
  date_start: {
    name: 'date_start',
    type: FieldType.date,
    validations: [required()],
    label: 'Дата начала этапа',
  },
  date_end: {
    name: 'date_end',
    type: FieldType.date,
    validations: [required()],
    label: 'Дата завершения этапа',
  },
};

const initialValues: AddPointForm.Values = {
  name: '',
  description: '',
  date_start: '',
  date_end: '',
};

export declare namespace AddPointForm {
  export type Props = {
    onAddPoint(point: Values): void
  };

  export type Values = {
    name: string,
    description: string,
    date_start: string,
    date_end: string
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
      id='AddPointForm'
    >
      <FormTitle>Новый пункт</FormTitle>
      <FormRow>
        <Field className={s.field} name='name' />
      </FormRow>
      <FormRow>
        <Field className='col-6' name='date_start' />
        <Field className='col-6' name='date_end' />
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
            type='submit'
            form='AddPointForm'
          >Добавить</Button>
        </div>
      </FormActions>
    </Form>
  );
};
