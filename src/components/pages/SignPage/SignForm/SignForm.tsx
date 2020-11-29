import cx from "classnames";
import React, {FC, useCallback, useState} from "react";
import {Form} from "../../../common/Form";
import {Field} from "../../../common/Form/Field";
import {required} from "../../../common/Form/validations/required";
import {FieldModel, FieldType} from "../../../common/Form/fields/types";
import {Button, ButtonSize, ButtonTheme} from "../../../ui/Button/Button";
import {Text, TextSize} from "../../../ui/Text";
import s from './SignForm.scss';

export declare namespace SignForm {
  export type SignValues = {
    login: string,
    password: string,
  }

  export type Props = {
    isEmailExists: boolean,
  };
}

const signFields: Record<string, FieldModel> = {
  login: {
    type: FieldType.text,
    name: 'login',
    validations: [required()],
    label: 'Введите свой email'
  },
  password: {
    type: FieldType.text,
    name: 'password',
    validations: [required()],
    label: 'Введите пароль',
  }
};

export const initialValues: SignForm.SignValues = {
  login: '',
  password: '',
};

export const SignForm: FC<SignForm.Props> = (props) => {
  const [values, setValues] = useState<SignForm.SignValues>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  const onChange = useCallback((values: SignForm.SignValues, errors: Form.Errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  function renderTitle() {
    return (
      <Text className={s.title} size={TextSize.h3}>
        <span className={cx(props.isEmailExists ? s.selected : null)}>Вход</span>
        {' '}или{' '}
        <span className={cx(props.isEmailExists ? null : s.selected)}>регистрация</span>
      </Text>
    )
  }

  return (
    <Form
      initialValues={initialValues}
      values={values}
      errors={errors}
      fields={signFields}
      onChange={onChange}
    >
      {renderTitle()}
      <Field className={s.field} name='login'/>
      <Field className={s.field} name='password'/>
      <Button size={ButtonSize.m} theme={ButtonTheme.black}>
        Продолжить
      </Button>
    </Form>
  )
};
