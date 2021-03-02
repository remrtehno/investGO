import cx from "classnames";
import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Form} from "../../../common/Form";
import {FieldType} from "../../../common/Form/Form";
import {Field} from "../../../common/Form/Field";
import {required} from "../../../common/Form/validations/required";
import {email} from "../../../common/Form/validations/email";
import {Button, ButtonSize, ButtonTheme} from "../../../ui/Button/Button";
import s from "./RecoverForm.scss"

export declare namespace RecoverForm {
  export type RecoverValues = {
    email: string,
  }

  export type Props = {
  }
}

const initialValues: RecoverForm.RecoverValues = {
  email: '',
};

export const RecoverForm: FC = () => {
  const [values, setValues] = useState<RecoverForm.RecoverValues>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});
  const formApiRef = useRef<Form.Api | null>(null);

  const recoverFields = useMemo((): Form.FieldModels => {
    return {
      email: {
        type: FieldType.text,
        name: 'email',
        validations: [required(), email()],
        label: 'Ваш email',
      },
    };
  }, []);

  const onChange = useCallback((values: RecoverForm.RecoverValues, errors: Form.Errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  const onSubmit = useCallback(() => {
    submit()
  }, []);

  const submit = () => {
    
  }

  return (
    <Form
      initialValues={initialValues}
      values={values}
      errors={errors}
      fields={recoverFields}
      onChange={onChange}
      formApiRef={formApiRef}
      onSubmit={onSubmit}
    >
      <Field className={s.field} name='email'/>
      <Button
        className={s.continueButton}
        size={ButtonSize.m}
        theme={ButtonTheme.black}
        disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
      >
        Отправить ссылку на почту
      </Button>
      <div className={s.subLink}>Вернуться назад</div>
    </Form>
  )
};