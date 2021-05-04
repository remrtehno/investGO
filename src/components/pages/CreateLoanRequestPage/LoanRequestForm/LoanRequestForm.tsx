import cx from 'classnames';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useParams} from 'react-router';

import {useCreateLoan} from 'src/api/borrowerApi/useCreateLoanApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';

import s from './LoanRequestForm.scss';
import {useLoanRequestFields} from './useLoanRequestFields';

export declare namespace LoanRequestForm {
  export type Props = {};
}

export const LoanRequestForm: FC<LoanRequestForm.Props> = () => {
  const fields = useLoanRequestFields();
  const {companyId} = useParams() as {companyId: string};
  const [, createLoanApi, createLoanState] = useCreateLoan();
  const formApiRef = useRef<Form.Api | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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

  useEffect(() => {
    if (createLoanState.isSuccess) {
      setIsSuccessModalOpen(true);
    }
  }, [createLoanState.isSuccess]);

  function handleSubmit() {
    createLoanApi({
      ...values,
      ...{
        term_limit: parseInt(values.term_limit, 10),
        amount: parseInt(values.amount, 10),
        rate: parseInt(values.rate, 10),
        min_investment_size: parseInt(values.min_investment_size, 10),
        min_amount: parseInt(values.min_amount, 10),
        repayment_limit_month: parseInt(values.repayment_limit_month, 10),
      },
    });
  }

  function handleModalClose() {
    setIsSuccessModalOpen(false);
  }

  return (
    <div className={s.loanRequestForm}>
      <Form
        initialValues={initialValues}
        errors={errors}
        values={values}
        onChange={onChange}
        fields={fields}
        onSubmit={handleSubmit}
        formApiRef={formApiRef}
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
          <Field className='col-6' name='min_amount' />
          <Field className='col-6' name='min_investment_size' />
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
          <div className='col-12'>
            <Field className={cx(s.switchField)} name='is_buy_rights' />
          </div>
        </FormRow>
        <FormRow className={s.separator}>
          <div className='col-12'>
            <Text size={TextSize.subHeadline1} className={s.subHead}>
              Загрузите документы
            </Text>
            <Text size={TextSize.body0}>Годовую бухгалтерскую отчетность.</Text>
          </div>
        </FormRow>
        <FormRow>
          <Field className='col-12' name='documents' />
        </FormRow>
        <FormRow className={s.separator}>
          <Field className='col-12' name='info_valid' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='is_send_to_investors' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='legal_agreement' />
        </FormRow>

        <FormActions>
          <div className='col-3'>
            <Button
              theme={ButtonTheme.black}
              size={ButtonSize.m}
              disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
            >
              Отправить заявку
            </Button>
          </div>
        </FormActions>
      </Form>
      { isSuccessModalOpen ? (
        <Modal className={s.successModal} allowClose={true} onClose={handleModalClose}>
          <div className={s.modalInner}>
            <Text size={TextSize.body2}>
              Ваши данные отправлены на проверку.
              Информация о статусе заявки будет отправлена на ваш электронный адрес.
            </Text>
            <div className={s.modalButtons}>
              <Button
                size={ButtonSize.s}
                theme={ButtonTheme.black}
                onClick={handleModalClose}
              >
                Понятно
              </Button>
            </div>
          </div>
        </Modal>
      ) : null }
    </div>
  );
};
