import type {CalendarInput} from 'src/components/ui/CalendarInput';
import type {Input} from 'src/components/ui/Input';

import type {FieldType} from './Form';

export declare namespace FormFieldModel {
  type BaseFieldModel = {
    name: string,
    type: string,

    disabled?: boolean,
    isHidden?: boolean,
    validations?: Array<(value: any, values: any) => string | null>,
    toValue?(rawValue: any): any,
    fromValue?(value: any): any
  }

  export type Text = BaseFieldModel & Omit<Input.Props, 'value' | 'onChange'> & {
    type: FieldType.text,
  };

  export type Date = BaseFieldModel & CalendarInput.CalendarProps & {
    type: FieldType.date,
    label: string,
  };

  export type Number = Omit<Text, 'regExp' | 'type' | 'mask'> & {
    type: FieldType.number,
    label: string,
    isInteger: boolean,
  };

  export type Phone = Omit<Text, 'regExp' | 'type' | 'mask'> & {
    type: FieldType.phone,
  }

  export type FileArray = BaseFieldModel & {
    type: FieldType.fileArray,
  }

  export type Password = BaseFieldModel & {
    type: FieldType.password,
    label: string,
  }
}

export type FormFieldModel =
  FormFieldModel.Text |
  FormFieldModel.Date |
  FormFieldModel.Number |
  FormFieldModel.FileArray |
  FormFieldModel.Password |
  FormFieldModel.Phone;

export declare namespace FormField {
  type BaseField = {
    value: any,
    error: string | null,
    isValid: boolean,
    isDirty: boolean,
    isChanged: boolean,
  };

  export type Text = BaseField & FormFieldModel.Text;
  export type Date = BaseField & FormFieldModel.Date;
  export type Number = BaseField & FormFieldModel.Number;
  export type Phone = BaseField & FormFieldModel.Phone;
  export type FileArray = BaseField & FormFieldModel.FileArray;
}

export type FormField =
  FormField.Text |
  FormField.Date |
  FormField.Number |
  FormField.Phone |
  FormField.FileArray;
