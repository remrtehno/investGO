import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {useConfirmPhoneCode} from 'src/api/userApi/useConfirmPhoneCode';
import {useSendPhoneCode} from 'src/api/userApi/useSendPhoneCode';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

import s from './SmsForm.scss';

const fields: Form.FieldModels = {
  code: {
    name: 'code',
    type: FieldType.text,
    mask: '9999',
    validations: [required(), minLength(4)],
    label: 'Введите код из СМС',
  },
};

const initialValues: SmsForm.Values = {
  code: '',
};

export declare namespace SmsForm {
  export type Props = {
    phone: string,
    onConfirm(): void,
    onClose(): void,
  };

  export type Values = {
    code: string,
  };
}

export const SmsForm: FC<SmsForm.Props> = (props) => {
  const [, sendPhoneCodeApi] = useSendPhoneCode();
  const [isConfirmed, confirmPhoneCodeApi, confirmPhoneState] = useConfirmPhoneCode();
  const [values, setValues] = useState<SmsForm.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});
  const formApiRef = useRef<Form.Api | null>(null);

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  useEffect(() => {
    sendPhoneCodeApi({phone: props.phone});
  }, [props.phone]);

  useEffect(() => {
    if (!errors.code && values.code && !errors.code) {
      confirmPhoneCodeApi({
        confirm_code: values.code,
        phone: props.phone,
      });
    }
  }, [errors.code, props.phone, values.code]);

  useEffect(() => {
    if (!isConfirmed) {
      return;
    }

    confirmPhoneState.resetValue();
    props.onConfirm();
    props.onClose();
  }, [isConfirmed]);

  return (
    <Modal
      allowClose={true}
      onClose={() => props.onClose()}
    >
      <Text className={s.title} size={TextSize.subHeadline1}>Код подтверждения</Text>
      <Form
        initialValues={initialValues}
        values={values}
        errors={errors}
        fields={fields}
        onChange={onChange}
        formApiRef={formApiRef}
      >
        <Field className={s.field} name='code' />
      </Form>
      <div className={s.resendContainer}>
        <Button
          className={s.resend}
          theme={ButtonTheme.black}
          size={ButtonSize.m}
          onClick={_.noop}
        >Отправить повторно</Button>
      </div>
    </Modal>
  );
};
