import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {usePasswordResetApi} from 'src/api/userApi/usePasswordResetApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {PasswordResetModal} from 'src/components/pages/RecoverPage/RecoverForm/PasswordResetModal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

import s from './PasswordResetForm.scss';

export declare namespace PasswordResetForm {
  export type RecoverValues = {
    new_password: string,
    password_repeat: string,
  }

  export type Props = {
  }
}

const initialValues: PasswordResetForm.RecoverValues = {
  new_password: '',
  password_repeat: '',
};

export const PasswordResetForm: FC = () => {
  const [values, setValues] = useState<PasswordResetForm.RecoverValues>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});
  const formApiRef = useRef<Form.Api | null>(null);
  const [, passwordResetApi, passwordResetState] = usePasswordResetApi();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const history = useHistory();

  const passwordResetFields = useMemo((): Form.FieldModels => {
    return {
      new_password: {
        type: FieldType.password,
        name: 'new_password',
        validations: [required(), minLength(8)],
        label: 'Новый пароль',
      },
      password_repeat: {
        type: FieldType.password,
        name: 'password_repeat',
        validations: [required()],
        label: 'Пароль еще раз',
      },
    };
  }, []);

  const getToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    return token;
  };

  useEffect(() => {
    const error = passwordResetState.error;
    const errorMessage = _.get(error, '[0].message');
    if (!error || !errorMessage) {
      return;
    }
    if (errorMessage === 'incorrect_password') {
      setErrors({...errors, new_password: 'Неверный пароль'});
    }
    if (errorMessage === 'token_not_found') {
      setErrors({...errors, new_password: 'Неверный токен'});
    }
  }, [passwordResetState.error]);

  useEffect(() => {
    if (passwordResetState.isSuccess) {
      setIsSuccessModalVisible(true);
    }
  }, [passwordResetState.isSuccess]);

  const onChange = useCallback((values: PasswordResetForm.RecoverValues, errors: Form.Errors) => {
    setValues(values);
    const mergedErrors = {...errors};
    if (values.new_password !== values.password_repeat && values.password_repeat) {
      mergedErrors.password_repeat = 'Пароли не совпадают';
    }
    setErrors(mergedErrors);
  }, []);

  const submit = () => {
    const token = getToken();
    if (values.new_password === values.password_repeat && values.new_password && token) {
      passwordResetApi({
        new_password: values.new_password,
        token,
      });
    }
  };

  const onSubmit = useCallback(() => {
    submit();
  }, [values]);

  const handleModalClose = () => {
    history.push('/signin');
  };

  return (
    <Form
      initialValues={initialValues}
      values={values}
      errors={errors}
      fields={passwordResetFields}
      onChange={onChange}
      formApiRef={formApiRef}
      onSubmit={onSubmit}
    >
      <Text className={s.title} size={TextSize.h3}>Новый пароль</Text>
      <Field className={s.field} name='new_password' />
      <Field className={s.field} name='password_repeat' />
      <Button
        className={s.submitButton}
        size={ButtonSize.m}
        theme={ButtonTheme.black}
        disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
      >
        Применить
      </Button>
      { isSuccessModalVisible ? (
        <PasswordResetModal
          onClose={handleModalClose}
          text='Пароль успешно изменен.'
          icon='account'
        />
      ) : null }
    </Form>
  );
};
