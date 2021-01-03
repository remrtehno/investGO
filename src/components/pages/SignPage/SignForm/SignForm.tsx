import cx from 'classnames';
import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {useUserCheckExists} from '../../../../api/userApi/useUserCheckExists';
import {useSignInApi} from '../../../../api/userApi/useSignInApi';
import {useSignUpApi} from '../../../../api/userApi/useSignUpApi';
import {useLatestRef} from '../../../../hooks/useLatestRef';
import {userAtom} from '../../../../recoil/userAtom';
import {Form} from '../../../common/Form';
import {Field} from '../../../common/Form/Field';
import {FieldType} from '../../../common/Form/Form';
import {email} from '../../../common/Form/validations/email';
import {required} from '../../../common/Form/validations/required';
import {Button, ButtonSize, ButtonTheme} from '../../../ui/Button/Button';
import {Text, TextSize} from '../../../ui/Text';
import {CheckEmailModal} from './CheckEmailModal';
import s from './SignForm.scss';
import {SmsForm} from './SmsForm';
import _ from 'lodash';

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
  const {user} = useRecoilValue(userAtom);
  const history = useHistory();
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
      validations: [required()],
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
    }
  }, [signInState.error, signUpState.error, isUserExists]);

  useEffect(() => {
    if (user && signInState.isSuccess) {
      if (!user.is_approved_passport) {
        history.push('/registration');
      } else {
        history.push('/');
      }
    }
  }, [signInState, user, history]);

  useEffect(() => {
    if (signUpState.isSuccess) {
      setIsCheckEmailModalVisible(true);
      setIsShowSmsForm(false);
    }
  }, [signUpState.isSuccess]);

  useEffect(() => {
    setIsShowSmsForm(false);
  }, [signUpState.error]);

  const signUp = useCallback(() => {
    signUpApi(values);
  }, [values]);

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

    setIsShowSmsForm(true);
  }, [isNeedShowPhone, isUserExists, values]);

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
      { isShowSmsForm
        ? <SmsForm onConfirm={signUp} phone={values.phone} />
        : null }
      { isCheckEmailModalVisible ? (
        <CheckEmailModal
          onClose={() => {
            window.location.pathname = '/';
          }}
        />
      ) : null }
    </Form>
  );
};
