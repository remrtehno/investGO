import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useCreateInvestAgreementApi} from 'src/api/investorApi/useCreateInvestAgreementApi';
import {useInvestApi} from 'src/api/investorApi/useInvestApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import { TextWeight } from 'src/components/ui/Text/Text';
import {investorPortfolioAtom} from 'src/recoil/investorPortfolioAtom';
import type {Borrower} from 'src/types/Borrower';
import {required} from 'src/validations/required';

import s from './BalanceForm.scss';

export declare namespace BalanceForm {
  export type Props = {
  };
}

export const useBalanceFields = () => {
  return useMemo((): Form.FieldModels => ({
    amount: {
      name: 'amount',
      type: FieldType.number,
      isInteger: true,
      label: 'Сумма для инвестирования',
      postfix: '₽',
      validations: [required()],
    },
  }), []);
};

export const BalanceForm: FC<BalanceForm.Props> = (props) => {
  const formApiRef = useRef<Form.Api | null>(null);
  const fields = useBalanceFields();

  function getInitialValues() {
    return ({
      ...getDefaultFieldValues(fields),
    });
  }

  const initialValues = useMemo(() => getInitialValues(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  function handleSubmit() {
    console.log('balance form submit');
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
      <FormTitle>Пополнение счета</FormTitle>
      <Text size={TextSize.body1} weight={TextWeight.semibold} className={s.subtitle}>
        Укажите сумму пополнения для выставления счета.
      </Text>
      <FormRow>
        <Field className='col-12' name='amount' />
      </FormRow>

      <FormActions className='mb-0'>
        <div className='col-7'>
          <Button
            theme={ButtonTheme.black}
            size={ButtonSize.m}
            disabled={Boolean(formApiRef?.current?.isValid === false)}
            onClick={handleSubmit}
          >
            Отправить счет на email
          </Button>
        </div>
      </FormActions>
    </Form>
  );
};
