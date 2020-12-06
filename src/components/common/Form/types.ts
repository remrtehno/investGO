import {FieldType} from "./Form";

export declare namespace FormFieldModel {
  type BaseFieldModel = {
    name: string,
    type: string,

    isDisabled?: boolean,
    isHidden?: boolean,
    validations?: Array<(value: any, values: any) => string | null>,
  }

  export type Text = BaseFieldModel & {
    type: FieldType.text,
    label: string,
  };

  export type Date = BaseFieldModel & {
    type: FieldType.date,
    label: string,
  };

  export type Number = BaseFieldModel & {
    type: FieldType.number,
    label: string,
    isInteger: boolean,
  };

  export type DocumentArray = BaseFieldModel & {
    type: FieldType.documentArray,
  }
}

export type FormFieldModel =
  FormFieldModel.Text |
  FormFieldModel.Date |
  FormFieldModel.Number |
  FormFieldModel.DocumentArray;

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
  export type DocumentArray = BaseField & FormFieldModel.DocumentArray;
}

export type FormField =
  FormField.Text |
  FormField.Date |
  FormField.Number |
  FormField.DocumentArray;
