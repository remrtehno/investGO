import type {FC} from 'react';
import React, {useCallback} from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import type {FieldType} from 'src/components/common/Form/Form';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Select} from 'src/components/ui/Select';
import {api} from 'src/contstants/api';
import {useApiRequest} from 'src/hooks/useApiRequest';

export declare namespace OkvedField {
  type Field = FormField.BaseField & {
    type: FieldType.custom,
    value: string[],
  }

  export type Props = FieldProps<Field>;
}

export const OkvedField: FC<OkvedField.Props> = (props) => {
  const request = useApiRequest();
  const form = useFormModel();
  const {field} = props;

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
    <Select
      isAsync={true}
      cacheOptions={true}
      placeholder='Введите код ОКВЭД или название деятельности'
      loadOptions={loadOptions}
      isClearable={true}
      value={field.value}
      onChange={(newValue) => form.onChange(newValue, field.name)}
    />
  );
};
