import _ from 'lodash';
import type {FC} from 'react';
import React from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {fieldsModel} from 'src/components/common/Form/fields/fieldsModel';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {PhoneInput} from 'src/components/ui/PhoneInput';
import {phone as validatePhone} from 'src/validations/phone';

export const phoneArrayFieldType = 'phoneArray';

export declare namespace PhoneArrayField {
  type PhoneArrayField = Omit<FormField.Text, 'type' | 'regExp' | 'mask'> & {
    type: typeof phoneArrayFieldType
  };

  export type Props = FieldProps<PhoneArrayField>;
}

const PhoneArrayField: FC<PhoneArrayField.Props> = (props) => {
  const {field} = props;
  const form = useFormModel();
  const value: string[] = field.value || [];

  return (
    <div className='row' style={{marginBottom: -20}}>
      { value.map((phone, index) => {
        return (
          <div key={index} className='col-6' style={{marginBottom: 20}}>
            <PhoneInput
              {..._.omit(props, 'field')}
              value={phone}
              label={field.label}
              error={validatePhone()(phone)}
              disabled={field.disabled}
              onChange={(newPhone) => {
                form.onChange(value.map((p, i) => (i === index ? newPhone : p)), field.name);
              }}
            />
          </div>
        );
      }) }
      <div className='col-6' style={{marginBottom: 20}}>
        <Button
          theme={ButtonTheme.light}
          size={ButtonSize.m}
          onClick={() => {
            form.onChange([...value, ''], field.name);
          }}
        >Добавить номер телефона</Button>
      </div>
    </div>
  );
};

fieldsModel.register({
  type: phoneArrayFieldType,
  component: PhoneArrayField,
});
