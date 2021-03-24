import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router';
import {useRecoilValue} from 'recoil';

import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import { Switch } from 'src/components/ui/Switch';

import s from './LoanRequestForm.scss';
import {useLoanRequestFields} from './useLoanRequestFields';

export declare namespace LoanRequestForm {
  export type Props = {};
}

export const LoanRequestForm: FC<LoanRequestForm.Props> = (props) => {
  const fields = useLoanRequestFields();
  const {companyId} = useParams();

  function getInitialValues() {
    return ({
      ...getDefaultFieldValues(fields),
      ...{company_id: companyId},
    });
  }

  const initialValues = useMemo(() => getInitialValues(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  return (
    <div>
      <Form
        initialValues={initialValues}
        errors={errors}
        values={values}
        onChange={onChange}
        fields={fields}
      >
        <FormRow>
          <Field className='col-12' name='amount' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='target' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='rate' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='min_investment_size' />
          <Field className='col-6' name='min_amount' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='collection_start_at' />
          <Field className='col-6' name='term_limit' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='repayment_limit_month' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='repayment_type' />
          <Field className='col-6' name='repayment_schedule' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='is_buy_rights' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='documents' />
        </FormRow>

        <FormActions>
          <div className='col-3'>
            <Button
              theme={ButtonTheme.black}
              size={ButtonSize.m}
            >Сохранить</Button>
          </div>
        </FormActions>
      </Form>
    </div>
  );
};
