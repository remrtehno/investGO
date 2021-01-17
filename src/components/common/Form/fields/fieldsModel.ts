import type {FC} from 'react';

import type {FormField} from 'src/components/common/Form/types';

export type FieldProps<TField extends FormField.BaseField> = {
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
  },
};
