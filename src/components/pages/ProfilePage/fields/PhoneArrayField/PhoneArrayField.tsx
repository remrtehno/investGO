import _ from 'lodash';
import type {FC} from 'react';
import React from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import type {FieldType} from 'src/components/common/Form/Form';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {PhoneInput} from 'src/components/ui/PhoneInput';
import {Color} from 'src/contstants/Color';
import {CloseIcon} from 'src/icons/CloseIcon';
import {phone as validatePhone} from 'src/validations/phone';
import {InfoPanel} from 'src/components/common/InfoPanel';
import {InfoPanelTheme} from 'src/components/common/InfoPanel/InfoPanel';

export declare namespace PhoneArrayField {
  type PhoneArrayField = Omit<FormField.Text, 'type' | 'regExp' | 'mask'> & {
    type: FieldType.custom
  };

  export type Props = FieldProps<PhoneArrayField>;
}

export const PhoneArrayField: FC<PhoneArrayField.Props> = (props) => {
  const {field} = props;
  const form = useFormModel();
  const value: string[] = field.value || [];

  return (
    <div>
      { field.error ? (
        <div className='row' style={{ marginBottom: 20 }}>
          <div className='col-12'>
            <InfoPanel style={{ marginTop: 28 }} isBorderless={true} theme={InfoPanelTheme.error}>{field.error}</InfoPanel>
          </div>
        </div>
      ) : null }
      <div className='row' style={{marginBottom: -20}}>
        { value.map((phone, index) => {
          return (
            <div key={index} className='col-sm-12 col-md-6 mb-20px mb-md-20px' style={{marginBottom: 20}}>
              <PhoneInput
                {..._.omit(props, 'field')}
                value={phone}
                label={field.label}
                error={validatePhone()(phone)}
                disabled={field.disabled}
                onChange={(newPhone) => {
                  form.onChange(value.map((p, i) => (i === index ? newPhone : p)), field.name);
                }}
                postfix={
                  <CloseIcon
                    style={{zIndex: 10, cursor: 'pointer'}}
                    color={Color.black}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.onChange(value.filter((p, i) => i !== index), field.name);
                    }}
                  />
                }
              />
            </div>
          );
        }) }
        <div className='col-sm-12 col-md-6' style={{marginBottom: 20}}>
          <Button
            theme={ButtonTheme.light}
            size={ButtonSize.m}
            onClick={() => {
              form.onChange([...value, ''], field.name);
            }}
          >Добавить номер телефона</Button>
        </div>
      </div>
    </div>
  );
};
