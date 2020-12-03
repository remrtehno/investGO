import cx from "classnames";
import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Form} from "../../../common/Form";
import {Field} from "../../../common/Form/Field";
import {FieldType} from "../../../common/Form/Form";
import {email} from "../../../common/Form/validations/email";
import {required} from "../../../common/Form/validations/required";
import {Button, ButtonSize, ButtonTheme} from "../../../ui/Button/Button";
import {Text, TextSize} from "../../../ui/Text";
import s from './SignForm.scss';
import {SmsForm} from "./SmsForm";

export declare namespace SignForm {
  export type SignValues = {
    email: string,
    password: string,
    phone: string,
  }

  export type Props = {
    isEmailExists: boolean,
  };
}

const initialValues: SignForm.SignValues = {
  email: '',
  password: '',
  phone: '',
};

export const SignForm: FC<SignForm.Props> = (props) => {
  const [values, setValues] = useState<SignForm.SignValues>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});
  const formApiRef = useRef<Form.Api | null>(null);
  const [isNeedShowPhone, setIsNeedShowPhone] = useState(false);
  const [isShowSmsForm, setIsShowSmsForm] = useState(false);

  useEffect(() => {
    setIsShowSmsForm(true);
  }, []);

  const signFields = useMemo((): Form.FieldModels => {
    return {
      email: {
        type: FieldType.text,
        name: 'email',
        validations: [required(), email()],
        label: 'Введите свой email'
      },
      password: {
        type: FieldType.text,
        name: 'password',
        validations: [required()],
        label: 'Введите пароль',
      },
      phone: {
        type: FieldType.text,
        isHidden: !isNeedShowPhone,
        name: 'phone',
        validations: [required()],
        label: 'Введите свой номер телефона',
      }
    };
  }, [isNeedShowPhone]);

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

  const onContinue = useCallback(() => {
    if (!isNeedShowPhone) {
      setIsNeedShowPhone(true);
      return;
    }

    setIsShowSmsForm(true);
  }, [isNeedShowPhone]);

  return (
    <Form
      initialValues={initialValues}
      values={values}
      errors={errors}
      fields={signFields}
      onChange={onChange}
      formApiRef={formApiRef}
    >
      {renderTitle()}
      <Field className={s.field} name='email'/>
      <Field className={s.field} name='password'/>
      <Field className={s.field} name='phone'/>
      <Button
        className={s.continueButton}
        size={ButtonSize.m}
        theme={ButtonTheme.black}
        disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
        onClick={onContinue}
      >
        Продолжить
      </Button>
      {isShowSmsForm ? (
        <SmsForm>

        </SmsForm>
      ) : null}
    </Form>
  )
};
