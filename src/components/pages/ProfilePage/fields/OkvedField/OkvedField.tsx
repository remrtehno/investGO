import cx from 'classnames';
import type {FC} from 'react';
import React, {useCallback} from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import type {FieldType} from 'src/components/common/Form/Form';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Select} from 'src/components/ui/Select';
import {Text, TextSize} from 'src/components/ui/Text';
import {api} from 'src/contstants/api';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {SvgProps} from 'src/types/common';

import s from './OkvedField.scss';

function RemoveIcon(props: SvgProps) {
  return (
    <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M6.11914 12.082H18.8805' stroke='#D1CED2' strokeWidth='2' />
    </svg>
  );
}

export declare namespace OkvedField {
  type Field = FormField.BaseField & {
    type: FieldType.custom,
    value: Array<{ cod: string, name: string }>,
  }

  export type Props = FieldProps<Field>;
}

export const OkvedField: FC<OkvedField.Props> = (props) => {
  const request = useApiRequest();
  const form = useFormModel();
  const {field} = props;
  const value: Array<{ cod: string, name: string }> = field.value || [];

  const loadOptions: Select.LoadOptions = useCallback(async(query) => {
    const response = await request(api.common.okved(), {
      method: 'GET',
      query: {query},
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return response.map((option: { cod: string, name: string }) => {
      return {
        value: option.cod,
        label: option.name,
      };
    });
  }, []);

  return (
    <div className={s.OkvedField}>
      <Select
        isAsync={true}
        cacheOptions={true}
        placeholder='Введите код ОКВЭД или название деятельности'
        loadOptions={loadOptions}
        isClearable={true}
        value={null}
        error={field.error}
        onChange={(newValue, option) => {
          if (!option || value.find(({cod}) => option.value === cod)) {
            return;
          }

          form.onChange([
            ...value,
            {
              cod: option.value,
              name: option.label,
            },
          ], field.name);
        }}
        noOptionsMessage={({inputValue}) => (inputValue ? 'Ничего не найдено' : 'Введите код ОКВЭД или название деятельности')}
      />
      { value.length ? (
        <div className={s.items}>
          { value.map(({cod, name}, index) => {
            return (
              <div className={cx('container', s.item)}>
                <div className={cx('row', s.itemContent)}>
                  <div className='col-2'>
                    <Text size={TextSize.body1} className={s.cod}>{ cod }</Text>
                  </div>
                  <div className='col-9'>
                    <Text size={TextSize.body1} className={s.name}>{ name }</Text>
                  </div>
                  <div className={cx('col-1 p-0', s.removeIconContainer)}>
                    <RemoveIcon
                      className={s.removeIcon}
                      onClick={() => {
                        form.onChange(value.filter((v, i) => i !== index), field.name);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          }) }
        </div>
      ) : null }
    </div>
  );
};
