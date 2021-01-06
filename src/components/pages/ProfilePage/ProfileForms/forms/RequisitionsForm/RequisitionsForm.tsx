import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useMemo} from 'react';

import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import type {ProfileForms} from 'src/components/pages/ProfilePage/ProfileForms/ProfileForms';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';

import s from './RequisitionsForm.scss';

const values = {};
const errors = {};

export declare namespace RequisitionsForm {
  export type Props = ProfileForms.FormProps;
}

export const RequisitionsForm: FC<RequisitionsForm.Props> = (props) => {
  const fields = useMemo((): Form.FieldModels => ({
    name: {
      name: 'name',
      type: FieldType.text,
      label: 'Наименование банка получателя',
    },
    accountNumber: {
      name: 'accountNumber',
      type: FieldType.number,
      label: 'Номер счета',
      isInteger: true,
    },
    ownerFio: {
      name: 'ownerFio',
      type: FieldType.text,
      label: 'Владелец счета (ФИО)',
    },
    bik: {
      name: 'bik',
      type: FieldType.number,
      label: 'БИК',
      isInteger: true,
    },
    corrNumber: {
      name: 'corrNumber',
      type: FieldType.number,
      label: 'Корр. счет',
      isInteger: true,
    },
    inn: {
      name: 'inn',
      type: FieldType.number,
      label: 'ИНН',
      isInteger: true,
    },
    kpp: {
      name: 'kpp',
      type: FieldType.number,
      label: 'КПП',
      isInteger: true,
    },
  }), []);

  const initialValues = useMemo(() => getDefaultFieldValues(fields), [fields]);

  return (
    <div ref={props.formRef} className={cx(s.RequisitionsForm, 'container')}>
      <Form
        initialValues={initialValues}
        errors={errors}
        values={values}
        onChange={_.noop}
        fields={fields}
      >
        <FormTitle>{ props.form.title }</FormTitle>
        <FormRow>
          <Field className='col-12' name='name' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='accountNumber' />
          <Field className='col-6' name='ownerFio' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='bik' />
          <Field className='col-6' name='corrNumber' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='inn' />
          <Field className='col-6' name='kpp' />
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
