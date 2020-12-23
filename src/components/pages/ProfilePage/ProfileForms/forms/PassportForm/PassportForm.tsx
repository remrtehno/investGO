import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from "recoil";
import {useGetPassport} from "../../../../../../api/passportApi/useGetPassport";
import {useSavePassport} from "../../../../../../api/passportApi/useSavePassport";
import {userAtom} from "../../../../../../recoil/userAtom";
import {User} from "../../../../../../types/User";
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

const useFields = () => {
  return useMemo((): Form.FieldModels => {
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
      serialNumber: {
        name: 'serialNumber',
        type: FieldType.number,
        label: 'Серия / номер паспорта',
        isInteger: true,
        validations: [required(), minLength(10), maxLength(10)],
      },
      subdivision_code: {
        name: 'subdivision_code',
        type: FieldType.number,
        label: 'Код подразделения',
        isInteger: true,
        validations: [required(), minLength(6), maxLength(6)],
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
        validations: [required(), minLength(6)],
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
        validations: [required(), minLength(12), maxLength(12)],
      },
      personal_data_documents: {
        name: 'personal_data_documents',
        type: FieldType.fileArray,
        validations: [required()],
      }
    };
  }, []);
};

export const PassportForm: FC<PassportForm.Props> = (props) => {
  const [, getPassport] = useGetPassport();
  const [, savePassport] = useSavePassport();
  const { user } = useRecoilValue(userAtom);
  const fields = useFields();

  useEffect(() => {
    if (user && !user.passport) {
      getPassport();
    }
  }, [user]);

  const getValuesFromPassport = () => {
    return {
      //...{"fio":"аыаыв","date_of_birth":"20.04.1991","number":"2343434344","serial":"324323","date_of_issue":"20.04.1991","authority":"sfsfsdf","place_of_register":"sdsdfsd","place_of_residence":"dsfsdfs","snils":"42344234233","inn":"2434234333","personal_data_documents":[]},
      ...getDefaultFieldValues(fields),
      ...(user && user.passport ? user.passport : {})
    } as User.Passport;
  };

  const initialValues = useMemo(() => getValuesFromPassport(), [fields]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && user.passport && !_.isEqual(user.passport, values)) {
      setValues(getValuesFromPassport());
    }
  }, [user && user.passport])

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  const onSave = useCallback(() => {
    savePassport(values);
  }, [values, savePassport]);

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
          <Field className='col-6' name='subdivision_code'/>
          <Field className='col-3' name='serialNumber'/>
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
            <Field name='personal_data_documents'/>
          </div>
        </FormRow>
        <FormActions>
          <div className='col-3'>
            <Button
              theme={ButtonTheme.black}
              size={ButtonSize.m}
              disabled={false && _.isEmpty(errors)}
              onClick={onSave}
            >Продолжить</Button>
          </div>
        </FormActions>
      </Form>
    </div>
  );
};
