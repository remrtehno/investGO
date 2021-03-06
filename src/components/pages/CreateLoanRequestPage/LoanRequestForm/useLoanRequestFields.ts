import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {maxValue} from 'src/validations/maxValue';
import {minLength} from 'src/validations/minLength';
import {minValue} from 'src/validations/minValue';
import {required} from 'src/validations/required';

function getCollectionStartMinDate() {
  return new Date(Date.now() + (1000 * 60 * 60 * 24 * 1));
}

export const useLoanRequestFields = () => {
  return useMemo((): Form.FieldModels => ({
    company_id: {
      name: 'company_id',
      type: FieldType.hidden,
    },
    amount: {
      name: 'amount',
      type: FieldType.range,
      label: 'Хочу собрать',
      min: 0,
      max: 20 * 1000 * 1000,
      postfix: '₽',
      validations: [required()],
    },
    target: {
      name: 'target',
      type: FieldType.textArea,
      label: 'Цель займа',
      validations: [required()],
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
      postfix: '₽',
      validations: [required()],
    },
    min_amount: {
      name: 'min_amount',
      type: FieldType.number,
      isInteger: true,
      label: 'Минимальная сумма для инвестирования',
      postfix: '₽',
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
      validations: [required(), maxValue(31), minValue(0)],
      postfix: ['день', 'дня', 'дней'],
    },
    repayment_limit_month: {
      name: 'repayment_limit_month',
      type: FieldType.number,
      isInteger: true,
      label: 'Срок погашения займа',
      postfix: ['месяц', 'месяца', 'месяцев'],
      validations: [required(), maxValue(360), minValue(1)],
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
          label: 'Аннуитетный',
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
    is_send_to_investors: {
      name: 'is_send_to_investors',
      type: FieldType.checkbox,
      label: 'Направление инвестиционного предложения всем Инвесторам.',
      defaultValue: true,
      validations: [required()],
    },
    info_valid: {
      name: 'info_valid',
      type: FieldType.checkbox,
      label: 'Верность сведений инвестиционного предложения и документов к нему.',
      defaultValue: true,
      validations: [required()],
    },
    legal_agreement: {
      name: 'legal_agreement',
      type: FieldType.checkbox,
      label: `Даю согласие на размещение на сайте Оператора Платформы информации,
      предусмотренной Законом No 259-ФЗ и Правилами.`,
      defaultValue: true,
      validations: [required()],
    },
  }), []);
};
