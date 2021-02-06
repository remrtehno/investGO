import type {FC} from 'react';
import React, {useCallback} from 'react';

import {fieldsModel} from './fields/fieldsModel';

import {FieldType, useFormField, useFormModel} from './Form';

export declare namespace Field {
  export type Props = {
    name: string,

    className?: string,
  };
}

export const Field: FC<Field.Props> = (props) => {
  const field = useFormField(props.name);
  const form = useFormModel();

  if (!field) {
    console.error(`Field ${props.name} not found`);
    return null;
  }

  function getComponent() {
    if (!field) {
      return null;
    }

    if (field.type === FieldType.custom) {
      return (field as any).Field;
    }

    const fieldModel = fieldsModel.get(field.type);

    if (!fieldModel) {
      console.error(`Field model for "${field.type}" not found`);
      return null;
    }

    return fieldModel.component;
  }

  const Component = getComponent();

  if (!Component) {
    return null;
  }

  const onChange = useCallback((value: any) => {
    if (!form) {
      return;
    }
    form.onChange(value, field.name);
  }, [field]);

  if (field.name === 'founders') {
    debugger;
  }
  if (field.isHidden) {
    return null;
  }

  return (
    <div className={props.className}>
      <Component
        field={field}
        onChange={onChange}
      />
    </div>
  );
};
