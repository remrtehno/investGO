import _ from 'lodash';
import type {FC} from 'react';

import type {FieldType} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import type {FormFieldModel} from 'src/components/common/Form/types';

export type FieldProps<TField extends FormField.BaseField> = {
  field: TField,
  onChange(value: any): void,
}

export type FieldModel = {
  type: FieldType,
  transform?(field: FormFieldModel): FormFieldModel,
  component: FC<any>,
};

export type FieldsModel = {
  register(model: FieldModel): void,
  get(type: string): FieldModel | null,
}

const models: Record<string, FieldModel> = {};

export const fieldsModel: FieldsModel = {
  register(fieldModel) {
    models[fieldModel.type] = {
      ...fieldModel,
      transform: fieldModel.transform || _.identity,
    };
  },
  get(type) {
    return models[type] || null;
  },
};
