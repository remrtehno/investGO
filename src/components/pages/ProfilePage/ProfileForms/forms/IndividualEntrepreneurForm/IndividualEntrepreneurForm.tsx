import React, {FC, useMemo} from 'react';
import {Form} from "../../../../../common/Form";
import {Field} from "../../../../../common/Form/Field";
import {FieldType} from "../../../../../common/Form/Form";
import {FormActions} from "../../../../../common/Form/FormActions";
import {FormRow} from "../../../../../common/Form/FormRow";
import {FormTitle} from "../../../../../common/Form/FormTitle";
import {getDefaultFieldValues} from "../../../../../common/Form/getDefaultFieldValues";
import {Button, ButtonSize, ButtonTheme} from "../../../../../ui/Button/Button";
import {ProfileForms} from "../../ProfileForms";
import s from './IndividualEntrepreneurForm.scss';
import _ from 'lodash';
import cx from 'classnames';

const values = {};
const errors = {};

export declare namespace IndividualEntrepreneurForm {
  export type Props = ProfileForms.FormProps;
}

export const IndividualEntrepreneurForm: FC<IndividualEntrepreneurForm.Props> = (props) => {
  const fields = useMemo((): Form.FieldModels => {
    return {
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
        type: FieldType.documentArray
      }
    }
  }, []);

  const initialValues = useMemo(() => {
    return getDefaultFieldValues(fields);
  }, [fields]);

  return (
    <div ref={props.formRef} className={cx(s.IndividualEntrepreneurForm, 'container')}>
      <Form
        initialValues={initialValues}
        fields={fields}
        errors={errors}
        values={values}
        onChange={_.noop}
      >
        <FormTitle>{props.form.title}</FormTitle>
        <FormRow>
          <Field className='col-6' name='ogrnip'/>
          <Field className='col-6' name='ogrnipDate'/>
        </FormRow>
        <FormRow>
          <Field className='col-12' name='documents'/>
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
