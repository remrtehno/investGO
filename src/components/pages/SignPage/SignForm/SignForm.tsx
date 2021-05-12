import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Link} from 'react-router-dom';

import {useSignInApi} from 'src/api/userApi/useSignInApi';
import {useSignUpApi} from 'src/api/userApi/useSignUpApi';
import {useUserCheckExists} from 'src/api/userApi/useUserCheckExists';
import {RoutePaths} from 'src/components/common/App/routes';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {useLatestRef} from 'src/hooks/useLatestRef';
import {email} from 'src/validations/email';
import {required} from 'src/validations/required';

import {CheckEmailModal} from './CheckEmailModal';
import s from './SignForm.scss';
import {SmsForm} from './SigninSmsForm';

export declare namespace SignForm {
  export type SignValues = {
    email: string,
    password: string,
    phone: string,
  }

  export type Props = {
  };
}

const initialValues: SignForm.SignValues = {
  email: '',
  password: '',
  phone: '',
};

export const SignForm: FC<SignForm.Props> = () => {
  const [, signInApi, signInState] = useSignInApi();
  const [, signUpApi, signUpState] = useSignUpApi();
  const [isUserExists, checkUserExistsApi, checkUserExistsState] = useUserCheckExists();
  const [values, setValues] = useState<SignForm.SignValues>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});
  const formApiRef = useRef<Form.Api | null>(null);
  const [isNeedShowPhone, setIsNeedShowPhone] = useState(false);
  const [isShowSmsForm, setIsShowSmsForm] = useState(false);
  const emailRef = useLatestRef(values.email);
  const [isCheckEmailModalVisible, setIsCheckEmailModalVisible] = useState(false);

  const signFields = useMemo((): Form.FieldModels => ({
    email: {
      type: FieldType.text,
      name: 'email',
      validations: [required(), email()],
      label: 'Введите свой email',
      disabled: isNeedShowPhone,
    },
    password: {
      type: FieldType.password,
      name: 'password',
      label: 'Введите пароль',
      disabled: isNeedShowPhone,
    },
    phone: {
      type: FieldType.phone,
      isHidden: !isNeedShowPhone,
      name: 'phone',
      validations: [required()],
      label: 'Введите свой номер телефона',
    },
  }), [isNeedShowPhone]);

  const onChange = useCallback((values: SignForm.SignValues, errors: Form.Errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  function renderTitle() {
    return (
      <Text className={s.title} size={TextSize.h3}>
        <span className={cx(isUserExists ? s.selected : null)}>Вход</span>
        { ' ' }или{ ' ' }
        <span className={cx(isUserExists ? null : s.selected)}>регистрация</span>
      </Text>
    );
  }

  const checkEmail = useMemo(() => _.debounce(() => {
    checkUserExistsApi({email: emailRef.current});
  }, 300), []);

  useEffect(() => {
    if (!errors.email && values.email) {
      checkEmail();
    } else {
      checkUserExistsState.resetValue();
    }
  }, [values.email, errors.email]);

  useEffect(() => {
    const error = isUserExists ? signInState.error : signUpState.error;
    const errorMessage = _.get(error, '[0].message');

    if (!errorMessage) {
      return;
    }

    if (isUserExists) {
      signInState.resetValue();
    } else {
      signUpState.resetValue();
    }

    if (errorMessage === 'incorrect_password') {
      setErrors({...errors, password: 'Неверный пароль'});
    } else if (errorMessage === 'email_not_confirmed') {
      setErrors({...errors, email: 'Email не подтвержден'});
    } else if (errorMessage === 'incorrect_password_format') {
      setErrors({...errors, password: 'Неверный формат пароля'});
    } else if (errorMessage === 'phone_already_taken') {
      setErrors({...errors, phone: 'Пользователь с таким номером уже существует'});
    }
  }, [signInState.error, signUpState.error, isUserExists]);

  const onContinue = useCallback(() => {
    if (isUserExists) {
      signInApi({
        email: values.email,
        password: values.password,
      });
      return;
    }

    if (!isNeedShowPhone) {
      setIsNeedShowPhone(true);
      return;
    }

    signUpApi(values);
  }, [isNeedShowPhone, isUserExists, values]);

  useEffect(() => {
    if (signUpState.isSuccess) {
      setIsShowSmsForm(true);
    }
  }, [signUpState.isSuccess]);

  return (
    <Form
      initialValues={initialValues}
      values={values}
      errors={errors}
      fields={signFields}
      onChange={onChange}
      formApiRef={formApiRef}
    >
      { renderTitle() }
      <Field className={s.field} name='email' />
      <Field className={s.field} name='password' />
      <Field className={s.field} name='phone' />
      <Button
        className={s.continueButton}
        size={ButtonSize.m}
        theme={ButtonTheme.black}
        disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
        onClick={onContinue}
      >
        Продолжить
      </Button>
      <div className={s.subLink}>
        <Link to={RoutePaths.recover}>Восстановить пароль</Link>
      </div>
      { isShowSmsForm
        ? (
          <SmsForm
            onConfirm={() => setIsCheckEmailModalVisible(true)}
            onClose={() => setIsShowSmsForm(false)}
            phone={values.phone}
            isUserExists={isUserExists}
          />
        ) : null }
      { isCheckEmailModalVisible ? (
        <CheckEmailModal
          onClose={() => {
            window.location.reload();
          }}
        />
      ) : null }

    </Form>
  );
};
