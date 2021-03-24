import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

function getCollectionStartMinDate() {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 10);
}

export const useLoanRequestFields = () => {
  return useMemo((): Form.FieldModels => ({
    company_id: {
      name: 'company_id',
      type: FieldType.hidden,
    },
    amount: {
      name: 'amount',
      type: FieldType.number,
      label: 'Хочу собрать',
      isInteger: true,
      validations: [required()],
    },
    target: {
      name: 'target',
      type: FieldType.textArea,
      label: 'Цель займа',
      validations: [required(), minLength(20)],
    },
    rate: {
      name: 'rate',
      type: FieldType.number,
      isInteger: false,
      label: 'Ставка по займу (% годовых)',
      postfix: '%',
      validations: [required()],
    },
    min_investment_size: {
      name: 'min_investment_size',
      type: FieldType.number,
      isInteger: true,
      label: 'Минимальный объем инвестиций',
      validations: [required()],
    },
    min_amount: {
      name: 'min_amount',
      type: FieldType.number,
      isInteger: true,
      label: 'Минимальная сумма для инвестирования',
      validations: [required()],
    },
    collection_start_at: {
      name: 'collection_start_at',
      type: FieldType.date,
      label: 'Дата начала сбора',
      minDate: getCollectionStartMinDate(),
      validations: [required()],
    },
    term_limit: {
      name: 'term_limit',
      type: FieldType.number,
      isInteger: true,
      label: 'Срок действия предложения',
      validations: [required()],
    },
    repayment_limit_month: {
      name: 'repayment_limit_month',
      type: FieldType.number,
      isInteger: true,
      label: 'Срок погашения займа',
      validations: [required()],
    },
    repayment_type: {
      name: 'repayment_type',
      type: FieldType.select,
      label: 'Тип погашения',
      isSearchable: false,
      validations: [required()],
      options: [
        {
          value: 'classical',
          label: 'Дифференцированный',
        },
        {
          value: 'annuity',
          label: 'Аннуитентный',
        },
      ],
    },
    repayment_schedule: {
      name: 'repayment_schedule',
      type: FieldType.select,
      label: 'График погашения',
      validations: [required()],
      options: [
        {
          value: 'month',
          label: 'Ежемесячно',
        },
        {
          value: 'day',
          label: 'Ежеквартально',
        },
        {
          value: 'year',
          label: 'В конце срока',
        },
      ],
    },
    is_buy_rights: {
      name: 'is_buy_rights',
      type: FieldType.switch,
      label: `Лицо, контролирующее юридическое лицо, привлекающее инвестиции, 
        принимает на себя обязанность приобрести у инвесторов имущественные права, 
        полученные при инвестировании в случае,
        если такое лицо перестает являться лицом, контролирующим юридическое
        лицо, привлекающее инвестиции`,
      isLongLabel: true,
      validations: [required()],
    },
    documents: {
      name: 'documents',
      type: FieldType.fileArray,
      label: 'Загрузите документы',
      validations: [required()],
    },
  }), []);
};
