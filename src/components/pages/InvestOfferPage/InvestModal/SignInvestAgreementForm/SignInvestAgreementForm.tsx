import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import type {useCreateInvestAgreementApi} from 'src/api/investorApi/useCreateInvestAgreementApi';
import {useSignInvestAgreementApi} from 'src/api/investorApi/useSignInvestAgreementApi';
import {useSmsSignApi} from 'src/api/smsApi/useSmsSignApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {SmsForm} from 'src/components/common/SmsForm';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {DocumentIcon} from 'src/icons/DocumentIcon';
import type {Borrower} from 'src/types/Borrower';

import s from './SignInvestAgreementForm.scss';
import {useSignInvestAgreementFields} from './useSignInvestAgreementFields';

export declare namespace SignInvestAgreementForm {
  export type Props = {
    loan: Borrower.LoanDetails,
    agreement: useCreateInvestAgreementApi.Response,
    onSignInvestAgreement(): void,
    onBack(): void,
  };
}

export const SignInvestAgreementForm: FC<SignInvestAgreementForm.Props> = (props) => {
  const fields = useSignInvestAgreementFields();
  const [, signInvestAgreement, signInvestAgreementState] = useSignInvestAgreementApi();
  const formApiRef = useRef<Form.Api | null>(null);
  const [, smsSignApi, smsSignApiState] = useSmsSignApi();
  const [isSmsModalOpened, setIsSmsModalOpened] = useState(false);
  const [smsCodeError, setSmsCodeError] = useState('');

  function getInitialValues() {
    return ({
      ...getDefaultFieldValues(fields),
      loan_request_id: props.loan.id,
    });
  }

  const initialValues = useMemo(() => getInitialValues(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  function getCode() {
    setSmsCodeError('');
    setIsSmsModalOpened(true);
    smsSignApi({
      entity_id: props.agreement.uuid as string,
      entity_type: props.agreement.type as string,
    });
  }

  function handleSubmit() {
    getCode();
  }

  function handleSmsCode(code: string) {
    signInvestAgreement({
      code: parseInt(code, 10),
      loan_request_id: props.loan.id,
    });
  }

  useEffect(() => {
    if (!smsSignApiState.error) {
      return;
    }
    setSmsCodeError('Неверный код подтверждения');
  }, [smsSignApiState.error]);

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

  useEffect(() => {
    if (signInvestAgreementState.isSuccess) {
      props.onSignInvestAgreement();
    }
  }, [signInvestAgreementState.isSuccess]);

  function handleBackButton() {
    props.onBack();
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
      id='SignInvestAgreementForm'
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
            onClick={handleBackButton}
          >
            Назад
          </Button>
        </div>
        <div className='col-8'>
          <Button
            theme={ButtonTheme.black}
            size={ButtonSize.m}
            disabled={Boolean(formApiRef?.current?.isValid === false)}
            form='SignInvestAgreementForm'
          >
            Подтвердить
          </Button>
        </div>
      </FormActions>
      { isSmsModalOpened ? (
        <SmsForm
          onCodeEnter={handleSmsCode}
          error={smsCodeError}
          onClose={() => {
            setSmsCodeError('');
            setIsSmsModalOpened(false);
          }}
          onCodeResend={getCode}
        />
      ) : null }
    </Form>
  );
};
