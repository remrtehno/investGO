import React, {FC, useCallback, useMemo, useState} from 'react';
import {Form} from "../../../../../common/Form";
import {Field} from "../../../../../common/Form/Field";
import {FieldType} from "../../../../../common/Form/Form";
import {FormActions} from "../../../../../common/Form/FormActions";
import {FormRow} from "../../../../../common/Form/FormRow";
import {FormTitle} from "../../../../../common/Form/FormTitle";
import {getDefaultFieldValues} from "../../../../../common/Form/getDefaultFieldValues";
import {maxLength} from "../../../../../common/Form/validations/maxLength";
import {minLength} from "../../../../../common/Form/validations/minLength";
import {required} from "../../../../../common/Form/validations/required";
import {Button, ButtonSize, ButtonTheme} from "../../../../../ui/Button/Button";
import {Text, TextSize} from "../../../../../ui/Text";
import {ProfileForms} from "../../ProfileForms";
import s from './PassportForm.scss';
import _ from 'lodash';
import cx from 'classnames';

export declare namespace PassportForm {
  export type Props = ProfileForms.FormProps;
}

export const PassportForm: FC<PassportForm.Props> = (props) => {
  const fields = useMemo((): Form.FieldModels => {
    return {
      fio: {
        name: 'fio',
        type: FieldType.text,
        label: 'ФИО',
        validations: [required()],
      },
      date_of_birth: {
        name: 'date_of_birth',
        type: FieldType.date,
        label: 'Дата рождения',
        validations: [required()],
      },
      number: {
        name: 'number',
        type: FieldType.number,
        label: 'Серия / номер паспорта',
        isInteger: true,
        validations: [required(), minLength(10), maxLength(10)],
      },
      serial: {
        name: 'serial',
        type: FieldType.number,
        label: 'Код подразделения',
        isInteger: true,
        validations: [required(), minLength(10), maxLength(6)],
      },
      date_of_issue: {
        name: 'date_of_issue',
        type: FieldType.date,
        label: 'Дата выдачи',
        validations: [required()],
      },
      authority: {
        name: 'authority',
        type: FieldType.text,
        label: 'Кем выдан',
        validations: [required()],
      },
      place_of_register: {
        name: 'place_of_register',
        type: FieldType.text,
        label: 'Адрес регистрации',
        validations: [required()],
      },
      place_of_residence: {
        name: 'place_of_residence',
        type: FieldType.text,
        label: 'Адрес фактического проживания',
        validations: [required()],
      },
      snils: {
        name: 'snils',
        type: FieldType.number,
        label: 'СНИЛС',
        isInteger: true,
        validations: [required(), minLength(11), maxLength(11)],
      },
      inn: {
        name: 'inn',
        type: FieldType.number,
        label: 'ИНН (при наличии)',
        isInteger: true,
        validations: [required(), minLength(10), maxLength(10)],
      },
      documents: {
        name: 'documents',
        type: FieldType.documentArray,
        validations: [required()],
      }
    };
  }, []);

  const initialValues = useMemo(() => {
    return getDefaultFieldValues(fields);
  }, [fields]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  return (
    <div ref={props.formRef} className={cx(s.PassportForm, 'container')}>
      <Form
        initialValues={initialValues}
        fields={fields}
        onChange={onChange}
        errors={errors}
        values={values}
      >
        <FormTitle>{props.form.title}</FormTitle>
        <FormRow>
          <Field className='col-6' name='fio'/>
          <Field className='col-6' name='date_of_birth'/>
        </FormRow>
        <FormRow>
          <Field className='col-6' name='number'/>
          <Field className='col-3' name='serial'/>
          <Field className='col-3' name='date_of_issue'/>
        </FormRow>
        <FormRow>
          <Field className='col-12' name='authority'/>
        </FormRow>
        <FormRow>
          <Field className='col-12' name='place_of_register'/>
        </FormRow>
        <FormRow>
          <Field className='col-12' name='place_of_residence'/>
        </FormRow>
        <FormRow>
          <Field className='col-6' name='snils'/>
          <Field className='col-6' name='inn'/>
        </FormRow>
        <FormRow>
          <div className='col-12'>
            <div className={s.documentsTitme}>
              <Text size={TextSize.subHeadline1}>
                Загрузите документы
              </Text>
              <div>
                — Копию документа, удостоверяющего личность физического лица (лицевая сторона, а также страница с адресом
                регистрации по месту жительства).
              </div>
            </div>
            <Field name='documents'/>
          </div>
        </FormRow>
        <FormActions>
          <div className='col-3'>
            <Button
              theme={ButtonTheme.black}
              size={ButtonSize.m}
              onClick={_.noop}
            >Продолжить</Button>
          </div>
        </FormActions>
      </Form>
    </div>
  );
};
