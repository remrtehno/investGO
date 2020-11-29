import {FC} from "react";
import {Form} from "../Form";

export type FieldProps<TField = Form.Field> = {
  field: TField,
}

export type FieldModel = {
  type: string,
  component: FC<any>,
};

export type FieldsModel = {
  register(model: FieldModel): void,
  get(type: string): FieldModel | null,
}

const models: Record<string, FieldModel> = {};

export const fieldsModel: FieldsModel = {
  register(fieldModel) {
    models[fieldModel.type] = fieldModel as any;
  },
  get(type) {
    return models[type] || null;
  }
};