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

import s from './IndividualEntrepreneurForm.scss';

const values = {};
const errors = {};

export declare namespace IndividualEntrepreneurForm {
  export type Props = ProfileForms.FormProps;
}

export const IndividualEntrepreneurForm: FC<IndividualEntrepreneurForm.Props> = (props) => {
  const fields = useMemo((): Form.FieldModels => ({
    ogrnip: {
      name: 'ogrnip',
      type: FieldType.number,
      label: 'ОГРНИП',
      isInteger: true,
    },
    ogrnipDate: {
      name: 'ogrnipDate',
      type: FieldType.text,
      label: 'Дата приссвоения ОГРНИП',
    },
    documents: {
      name: 'documents',
      type: FieldType.fileArray,
    },
  }), []);

  const initialValues = useMemo(() => getDefaultFieldValues(fields), [fields]);

  return (
    <div ref={props.formRef} className={cx(s.IndividualEntrepreneurForm, 'container')}>
      <Form
        initialValues={initialValues}
        fields={fields}
        errors={errors}
        values={values}
        onChange={_.noop}
      >
        <FormTitle>{ props.form.title }</FormTitle>
        <FormRow>
          <Field className='col-6' name='ogrnip' />
          <Field className='col-6' name='ogrnipDate' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='documents' />
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
