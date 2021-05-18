import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {useCreateInvestAgreementApi} from 'src/api/investorApi/useCreateInvestAgreementApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import type {Borrower} from 'src/types/Borrower';

import s from './InvestAgreementForm.scss';
import {useInvestAgreementFields} from './useInvestAgreementFields';

export declare namespace InvestAgreementForm {
  export type Props = {
    loan: Borrower.LoanDetails,
    onSuccess(investAgreement: useCreateInvestAgreementApi.Response): void,
  };
}

export const InvestAgreementForm: FC<InvestAgreementForm.Props> = (props) => {
  const fields = useInvestAgreementFields(props.loan.min_investment_size, props.loan.amount);
  const [
    createInvestAgreementResult,
    createInvestAgreement,
    createInvestAgreementState,
  ] = useCreateInvestAgreementApi();
  const formApiRef = useRef<Form.Api | null>(null);

  function getInitialValues() {
    return ({
      ...getDefaultFieldValues(fields),
      loan_request_id: props.loan.id,
      amount: props.loan.min_investment_size,
    });
  }

  const initialValues = useMemo(() => getInitialValues(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  useEffect(() => {
    if (createInvestAgreementState.isSuccess) {
      props.onSuccess(createInvestAgreementResult);
    }
  }, [createInvestAgreementResult]);

  useEffect(() => {
    const error = createInvestAgreementState.error;
    const errorMessage = _.get(error, '[0].message');
    if (!error || !errorMessage) {
      return;
    }
    if (errorMessage === 'invest_amount_less_min_amount') {
      setErrors({...errors, amount: 'Сумма'});
    }
  }, [createInvestAgreementState.error]);

  function handleSubmit() {
    createInvestAgreement({
      amount: values.amount,
      loan_request_id: values.loan_request_id,
    });
  }

  return (
    <Form
      initialValues={initialValues}
      errors={errors}
      values={values}
      onChange={onChange}
      fields={fields}
      formApiRef={formApiRef}
    >
      <FormTitle>Заключить договор инвестирования</FormTitle>
      <FormRow>
        <Field className='col-12' name='amount_available' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='amount' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='legal_agreement' />
      </FormRow>

      <FormActions className='mb-0'>
        <div className='col-5'>
          <Button
            theme={ButtonTheme.black}
            size={ButtonSize.m}
            disabled={Boolean(formApiRef?.current?.isValid === false)}
            onClick={handleSubmit}
          >
            Отправить заявку
          </Button>
        </div>
      </FormActions>
    </Form>
  );
};
