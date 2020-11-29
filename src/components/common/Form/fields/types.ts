import {Form} from "../Form";

export enum FieldType {
  text = 'text',
}

export type TextFieldModel = {
  type: FieldType.text,
  label: string,
};

export type Field = Omit<Form.Field, 'type'> & (
  TextFieldModel
);

export type FieldModel = Omit<Form.FieldModel, 'type'> & (
  TextFieldModel
);
