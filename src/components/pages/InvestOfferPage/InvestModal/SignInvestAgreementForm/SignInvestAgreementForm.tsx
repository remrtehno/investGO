import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useParams} from 'react-router';

import {useCreateLoan} from 'src/api/borrowerApi/useCreateLoanApi';
import type {useCreateInvestAgreementApi} from 'src/api/investorApi/useCreateInvestAgreementApi';
import {useSignInvestAgreementApi} from 'src/api/investorApi/useSignInvestAgreementApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {Modal} from 'src/components/common/Modal/Modal';
import {SmsForm} from 'src/components/common/SmsForm';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {DocumentIcon} from 'src/icons/DocumentIcon';
import type {Borrower} from 'src/types/Borrower';

import s from './SignInvestAgreementForm.scss';
import {useSignInvestAgreementFields} from './useSignInvestAgreementFields';

export declare namespace SignInvestAgreementForm {
  export type Props = {
    loan: Borrower.LoanDetails,
    agreement: useCreateInvestAgreementApi.Response,
    onSuccess(investAgreement: useSignInvestAgreementApi.Response): void,
  };
}

export const SignInvestAgreementForm: FC<SignInvestAgreementForm.Props> = (props) => {
  const fields = useSignInvestAgreementFields();
  const [signInvestAgreementResult, signInvestAgreement, signInvestAgreementState] = useSignInvestAgreementApi();
  const formApiRef = useRef<Form.Api | null>(null);
  const [isSmsFormOpened, setIsSmsFormOpened] = useState(false);

  function getInitialValues() {
    return ({
      ...getDefaultFieldValues(fields),
      loan_request_id: props.loan.id,
      // amount: props.loan.min_investment_size,
    });
  }

  const initialValues = useMemo(() => getInitialValues(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  /*
   * useEffect(() => {
   *   console.log('success form', signInvestAgreementResult)
   *   if (signInvestAgreementState.isSuccess) {
   *     props.onSuccess(signInvestAgreementResult)
   *   }
   * }, [signInvestAgreementResult]);
   */

  useEffect(() => {
    const error = signInvestAgreementState.error;
    const errorMessage = _.get(error, '[0].message');
    if (!error || !errorMessage) {
      return;
    }
    if (errorMessage === 'invest_amount_less_min_amount') {
      setErrors({...errors, offer_agreement: 'Произошла ошибка'});
    }
  }, [signInvestAgreementState.error]);

  function handleSubmit() {
    setIsSmsFormOpened(true);
  }

  function handleSmsCode(code: string) {
    signInvestAgreement({
      code: parseInt(code, 10),
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
      onSubmit={handleSubmit}
      formApiRef={formApiRef}
    >
      <FormTitle>Подписание договора инвестирования</FormTitle>
      <div className={s.subtitle}>Ознакомьтесь с договором и подтвердите / подпишите КЭП.</div>
      <FormRow>
        <div className='col-12'>
          <a target='_blank' href={props.agreement.file.url} className={s.docLink}>
            <DocumentIcon />
            <span className={s.docLabel}>Договор инвестирования</span>
          </a>
        </div>
      </FormRow>
      <FormRow>
        <Field className='col-12' name='offer_agreement' />
      </FormRow>

      <FormActions className={cx('mb-0', s.actions)}>
        <div className='col-4'>
          <Button
            theme={ButtonTheme.light}
            size={ButtonSize.m}
            disabled={Boolean(formApiRef?.current?.isValid === false)}
          >
            Назад
          </Button>
        </div>
        <div className='col-8'>
          <Button
            theme={ButtonTheme.black}
            size={ButtonSize.m}
            disabled={Boolean(formApiRef?.current?.isValid === false)}
          >
            Подтвердить
          </Button>
        </div>
      </FormActions>
      <SmsForm
        onClose={() => setIsSmsFormOpened(false)}
        onCodeEnter={handleSmsCode}
      />
    </Form>
  );
};
