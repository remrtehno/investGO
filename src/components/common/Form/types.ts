import type {FC} from 'react';

import type {CalendarInput} from 'src/components/ui/CalendarInput';
import type {Input} from 'src/components/ui/Input';
import type {Select} from 'src/components/ui/Select';
import type {TextArea as TextAreaComponent} from 'src/components/ui/TextArea';

import type {FieldProps} from './fields/fieldsModel';

import type {FieldType} from './Form';

export declare namespace FormFieldModel {
  type BaseFieldModel = {
    name: string,

    disabled?: boolean,
    isHidden?: boolean,
    validations?: Array<(value: any, values: any) => string | null>,
    toValue?(rawValue: any): any,
    fromValue?(value: any): any,
    transform?(field: FormFieldModel): FormFieldModel,
  }

  export type Text = BaseFieldModel & Omit<Input.Props, 'value' | 'onChange'> & {
    type: FieldType.text,
  };

  export type TextArea = BaseFieldModel & Omit<TextAreaComponent.Props, 'value' | 'onChange'> & {
    type: FieldType.textArea
  }

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

    label?: string,
  }

  export type File = BaseFieldModel & {
    type: FieldType.file,

    label?: string,
  }

  export type Password = BaseFieldModel & {
    type: FieldType.password,
    label: string,
  }

  export type Custom = BaseFieldModel & {
    type: FieldType.custom,
    Field: FC<FieldProps<any>>,
    options?: Record<string, any>,
  }

  export type Hidden = BaseFieldModel & {
    type: FieldType.hidden,
  }

  export type Select = BaseFieldModel & Omit<Select.Props, 'value' | 'onChange'> & {
    type: FieldType.select,
  }
}

export type FormFieldModel = (
  FormFieldModel.Text |
  FormFieldModel.TextArea |
  FormFieldModel.Date |
  FormFieldModel.Number |
  FormFieldModel.FileArray |
  FormFieldModel.File |
  FormFieldModel.Password |
  FormFieldModel.Phone |
  FormFieldModel.Custom |
  FormFieldModel.Hidden |
  FormFieldModel.Select
);

export declare namespace FormField {
  export type BaseField = FormFieldModel.BaseFieldModel & {
    value: any,
    error: string | null,
    isValid: boolean,
    isDirty: boolean,
    isChanged: boolean,
  };

  export type Text = BaseField & FormFieldModel.Text;
  export type TextArea = BaseField & FormFieldModel.TextArea;
  export type Date = BaseField & FormFieldModel.Date;
  export type Number = BaseField & FormFieldModel.Number;
  export type Phone = BaseField & FormFieldModel.Phone;
  export type FileArray = BaseField & FormFieldModel.FileArray;
  export type File = BaseField & FormFieldModel.File;
  export type Custom = BaseField & FormFieldModel.Custom;
  export type Hidden = BaseField & FormFieldModel.Hidden;
  export type Select = BaseField & FormFieldModel.Select;
}

export type FormField =
  FormField.Text |
  FormField.TextArea |
  FormField.Date |
  FormField.Number |
  FormField.Phone |
  FormField.FileArray |
  FormField.File |
  FormField.Custom |
  FormField.Hidden |
  FormField.Select;
