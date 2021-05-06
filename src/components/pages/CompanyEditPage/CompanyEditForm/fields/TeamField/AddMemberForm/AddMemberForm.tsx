import type {FC} from 'react';
import React, {useCallback, useRef, useState} from 'react';

import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {BgImageField} from 'src/components/pages/CompanyEditPage/CompanyEditForm/fields/BgImageField';
import type {SocialNetwork} from 'src/components/pages/CompanyEditPage/CompanyEditForm/fields/SocialsField/SocialNetwork';
import {SocialsField} from 'src/components/pages/CompanyEditPage/CompanyEditForm/fields/SocialsField/SocialsField';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import type {FilePrimitive} from 'src/types/FilePrimitive';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

import s from './AddMemberForm.scss';

const fields: Form.FieldModels = {
  image_id: {
    name: 'image_id',
    type: FieldType.custom,
    Field: BgImageField,
    size: 'small',
    background: 'white',
  } as any,
  full_name: {
    name: 'full_name',
    type: FieldType.text,
    validations: [required(), minLength(3)],
    label: 'ФИО',
  },
  position: {
    name: 'position',
    type: FieldType.text,
    validations: [required(), minLength(3)],
    label: 'Должность',
  },
  description: {
    name: 'description',
    type: FieldType.textArea,
    label: 'Опыт и достижения представителя ',
  },
  link: {
    name: 'link',
    type: FieldType.custom,
    Field: SocialsField,
    label: 'Ссылки',
  } as any,
};

const initialValues: AddMemberForm.Values = {
  image_id: {} as FilePrimitive,
  full_name: '',
  position: '',
  description: '',
  link: {} as SocialNetwork.Values,
};

export declare namespace AddMemberForm {
  export type Props = {
    onAddMember(point: Values): void
  };

  export type Values = {
    image_id: FilePrimitive,
    full_name: string,
    position: string,
    description: string,
    link: SocialNetwork.Values,
  };
}

export const AddMemberForm: FC<AddMemberForm.Props> = (props) => {
  const [values, setValues] = useState<AddMemberForm.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});
  const formApiRef = useRef<Form.Api | null>(null);

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  function handleSubmit() {
    props.onAddMember(values);
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
      <FormTitle>Добавление представителя команды</FormTitle>
      <FormRow>
        <Field className={s.userpicField} name='image_id' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='full_name' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='position' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='description' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='link' />
      </FormRow>
      <FormActions className='mb-0'>
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
