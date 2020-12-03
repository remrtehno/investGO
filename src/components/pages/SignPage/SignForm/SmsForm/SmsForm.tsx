import React, {FC, useCallback, useRef, useState} from 'react';
import {Form} from "../../../../common/Form";
import {Field} from "../../../../common/Form/Field";
import {FieldType} from "../../../../common/Form/Form";
import {required} from "../../../../common/Form/validations/required";
import Modal from "../../../../common/Modal/Modal";
import {Text, TextSize} from "../../../../ui/Text";
import s from './SmsForm.scss';

const fields: Form.FieldModels = {
  code: {
    name: 'code',
    type: FieldType.text,
    validations: [required()],
    label: 'Введите код из СМС',
  }
};

const initialValues = {
  code: ''
};

export const SmsForm: FC = () => {
  const [values, setValues] = useState<Form.Values>({});
  const [errors, setErrors] = useState<Form.Errors>({});
  const formApiRef = useRef<Form.Api | null>(null);

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  return (
    <Modal>
      <Text className={s.title} size={TextSize.subHeadline1}>Код подтверждения</Text>
      <Form
        initialValues={initialValues}
        values={values}
        errors={errors}
        fields={fields}
        onChange={onChange}
        formApiRef={formApiRef}
      >
        <Field className={s.field} name='code'/>
      </Form>
      <div className={s.resendContainer}>
        <Text isBold={true} className={s.resend} size={TextSize.body1}>Отправить повторно</Text>
      </div>
    </Modal>
  )
}
