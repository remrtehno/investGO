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
  userpic: {
    name: 'userpic',
    type: FieldType.custom,
    Field: BgImageField,
    validations: [required()],
    size: 'small',
    background: 'white',
  } as any,
  name: {
    name: 'name',
    type: FieldType.text,
    validations: [required(), minLength(3)],
    label: 'ФИО',
  },
  post: {
    name: 'post',
    type: FieldType.text,
    validations: [required(), minLength(3)],
    label: 'Должность',
  },
  expirience: {
    name: 'expirience',
    type: FieldType.textArea,
    label: 'Опыт и достижения представителя ',
  },
  socials: {
    name: 'socials',
    type: FieldType.custom,
    Field: SocialsField,
    label: 'Ссылки',
  } as any,
};

const initialValues: AddMemberForm.Values = {
  userpic: {} as FilePrimitive,
  name: '',
  post: '',
  expirience: '',
  socials: {} as SocialNetwork.Values,
};

export declare namespace AddMemberForm {
  export type Props = {
    onAddMember(point: Values): void
  };

  export type Values = {
    userpic: FilePrimitive,
    name: string,
    post: string,
    expirience: string,
    socials: SocialNetwork.Values,
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
        <Field className={s.userpicField} name='userpic' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='name' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='post' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='expirience' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='socials' />
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
