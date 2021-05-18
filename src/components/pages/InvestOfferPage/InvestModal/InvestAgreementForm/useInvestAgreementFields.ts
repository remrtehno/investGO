import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {maxValue} from 'src/validations/maxValue';
import {minLength} from 'src/validations/minLength';
import {minValue} from 'src/validations/minValue';
import {required} from 'src/validations/required';

export const useInvestAgreementFields = (minAmount: number, maxAmount: number) => {
  return useMemo((): Form.FieldModels => ({
    loan_request_id: {
      name: 'loan_request_id',
      type: FieldType.hidden,
    },
    amount_available: {
      name: 'amount_available',
      type: FieldType.number,
      isInteger: true,
      label: 'На вашем счете',
      postfix: '₽',
      disabled: true,
    },
    amount: {
      name: 'amount',
      type: FieldType.number,
      isInteger: true,
      label: 'Сумма для инвестирования',
      postfix: '₽',
      // validations: [required(), minValue(minAmount), maxValue(maxAmount)],
    },
    legal_agreement: {
      name: 'legal_agreement',
      type: FieldType.checkbox,
      label: `Заверение, выраженное в форме заявления
      Пользователя – физического лица,о соблюдении
      физическим лицом ограничения, указанного в части 1
      статьи 7 Закона No 259-ФЗ, в пункте 4.2.2 Правил.`,
      defaultValue: true,
      validations: [required()],
    },
  }), []);
};
